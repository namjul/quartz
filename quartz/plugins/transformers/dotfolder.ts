import { QuartzTransformerPlugin } from "../types"
import { FullSlug } from "../../util/path"
import path from "path"

export const DotFolder: QuartzTransformerPlugin = () => ({
  name: "DotFolder",
  markdownPlugins() {
    return [
      () => {
        return (_, file) => {
          const slug = file.data.slug?.replaceAll(".", "/") as FullSlug
          const { dir, name, ext } = path.parse(file.data.filePath ?? "")
          const filePath = `${dir}/${name.replaceAll(".", "/")}${ext}`
          const [fileStem] = file.stem?.split(".").reverse() ?? []

          file.data.slug = slug
          file.data.vfilePath = filePath
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
