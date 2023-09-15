import { FilePlusIcon, UploadIcon } from "@radix-ui/react-icons"
import { Separator } from "./ui/separator"
import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"
import { Button } from "./ui/button"
import { ChangeEvent, FormEvent, useMemo, useRef, useState } from "react"
import { getFFmpeg } from "@/lib/ffmpge"
import { fetchFile } from "@ffmpeg/util"
import { api } from "@/lib/axios"

type Status = "waiting" | "converting" | "uploading" | "generating" | "success"

const statusMessages = {
  converting: "Convertendo...",
  generating: "Transcrevendo...",
  uploading: "Carregando...",
  success: "Sucesso!"
}

interface VideoInputFormProps {
  onVideoUpload: (videoId: string) => void
}

export function VideoInputForm({ onVideoUpload }:VideoInputFormProps) {
  const [videoFile, setVideoFile] = useState<File | null>(null)
  const promptInputRef = useRef<HTMLTextAreaElement>(null)
  const [status, setStatus] = useState<Status>("waiting")

  function handleFileSelected(event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.currentTarget

    if (!files) {
      return
    }

    const selectedFile = files[0]
    setVideoFile(selectedFile)
  }

  // com o useMemo, só criaremos o previewURL quando o videoFile for alterado
  const previewURL = useMemo(() => {
    if (!videoFile) {
      return null
    }

    // cria uma url de pre-visualizaçao de arquivo
    return URL.createObjectURL(videoFile)
  }, [videoFile])

  async function convertVideoToAudio(video: File) {
    console.log("Convert Started.")

    const ffmpeg = await getFFmpeg()
    await ffmpeg.writeFile("input.mp4", await fetchFile(video))


    ffmpeg.on("progress", progress => {
      console.log("Convert progress: " + Math.round(progress.progress * 100))
    })

    await ffmpeg.exec([
      "-i",
      "input.mp4",
      "-map",
      "0:a",
      "-b:a",
      "20k",
      "-acodec",
      "libmp3lame",
      "output.mp3"
    ])

    const data = await ffmpeg.readFile("output.mp3")
    const audioFileBlob = new Blob([data], { type: "audio/mpge" })
    const audioFile = new File([audioFileBlob], "audio.mp3", {
      type: "audio/mpge"
    })

    console.log("Convert Finished")
    return audioFile
  }

  async function handleUploadVideo(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    // texto que o usuário digitou na textarea
    const prompt = promptInputRef.current?.value

    if (!videoFile) {
      return
    }

    // converter o video em audio
    setStatus("converting")
    const audioFile = await convertVideoToAudio(videoFile)

    setStatus("uploading")
    const data = new FormData()
    data.append("file", audioFile)
    const response = await api.post("/videos", data)

    setStatus("generating")
    const videoId = response.data.video.id
    await api.post(`/videos/${videoId}/transcription`, {
      prompt
    })

    setStatus("success")
    onVideoUpload(videoId)
  }

  return (
    <form onSubmit={handleUploadVideo} className="space-y-6">
      <label
        htmlFor="video"
        className="relative border flex rounded-md aspect-video cursor-pointer border-dashed text-sm flex-col gap-2 items-center justify-center text-muted-foreground hover:bg-primary/5"
      >
        {previewURL ? (
          <video
            src={previewURL}
            controls={false}
            className="pointer-events-none absolute inset-0"
          />
        ) : (
          <>
            <FilePlusIcon className="w-4 h-4" />
            Selecione um vídeo
          </>
        )}
      </label>

      <Separator />

      <input
        type="file"
        id="video"
        accept="video/mp4"
        className="sr-only"
        onChange={handleFileSelected}
      />

      <div className="space-y-2">
        <Label htmlFor="transcription_prompt">Prompt de transcrição</Label>
        <Textarea
          ref={promptInputRef}
          disabled={status != "waiting"}
          id="transcription_prompt"
          className="h-20 leading-relaxed resize-none"
          placeholder="Inclua palavras-chave mencionadas no vídeo separadas por virgula (,)"
        />
        <Button
          data-success={status === "success"}
          disabled={status != "waiting"}
          type="submit"
          className="w-full data-[success=true]:bg-purple-500 data-[success=true]:text-white"
        >
          {status === "waiting" ? (
            <>
              Carregar vídeo
              <UploadIcon className="w-4 h-4 ml-2" />
            </>
          ) : (
            statusMessages[status]
          )}
        </Button>
      </div>
    </form>
  )
}
