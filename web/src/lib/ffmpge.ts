import { FFmpeg } from "@ffmpeg/ffmpeg"

// ?url -> carrega somente quando precisamos
import coreURL from "../ffmpeg/ffmpeg-core.js?url"
import wasmURL from "../ffmpeg/ffmpeg-core.wasm?url"
import workerURL from "../ffmpeg/ffmpeg-worker.js?url"

let ffmpge: FFmpeg | null

export async function getFFmpeg(){
  if(ffmpge){
    return ffmpge
  }

  ffmpge = new FFmpeg()

  if(!ffmpge.loaded){
    await ffmpge.load({
      coreURL,
      wasmURL,
      workerURL
    })
  }

  return ffmpge
}