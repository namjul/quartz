import { QuartzTransformerPlugin } from "../types"
import { FullSlug } from "../../util/path"
import path from "path"

const extentions = [
  ".md",
  ".png",
  ".jpg",
  ".jpeg",
  ".gif",
  ".bmp",
  ".svg",
  ".mp4",
  ".webm",
  ".ogv",
  ".mov",
  ".mkv",
  ".mp3",
  ".webm",
  ".wav",
  ".m4a",
  ".ogg",
  ".3gp",
  ".flac",
  ".pdf",
]

export function convertFilePathToDotnotation(filePath: string) {
  const { dir, base, name, ext } = path.parse(filePath)
  if (extentions.includes(ext)) {
    return `${dir}/${name.replaceAll(".", "/")}${ext}`
  }
  return `${dir}/${base.replaceAll(".", "/")}`
}

export const DotFolder: QuartzTransformerPlugin = () => ({
  name: "DotFolder",
  markdownPlugins() {
    return [
      () => {
        return (_, file) => {
          const slug = file.data.slug?.replaceAll(".", "/") as FullSlug
          const vfilePath = convertFilePathToDotnotation(file.data.filePath ?? "")
          const [fileStem] = file.stem?.split(".").reverse() ?? []
          file.data.slug = slug
          file.data.vfilePath = vfilePath
          file.stem = fileStem
        }
      },
    ]
  },
})

declare module "vfile" {
  interface DataMap {
    vfilePath: string
  }
}
