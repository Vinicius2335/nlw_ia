import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

export function Header() {
  return (
    <div className="px-6 py-3 flex items-center justify-between border-b">
      <h1 className="text-xl font-bold">Upload IA</h1>
      <div className="flex items-center gap-3">
        <span className="text-sm text-muted-foreground">
          Desenvolvido por 👽 Vinicius Vieira 👽
        </span>

        <Separator orientation="vertical" className="h-6" />

        <Button variant={"outline"}>
          <GitHubLogoIcon className="w-4 h-4 mr-2" />
          Github
        </Button>
      </div>
    </div>
  )
}
