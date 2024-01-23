import AppDirEnt from "@Structure/fileSysstem/dirEnt"
import OpenAPI from "../../structure/openAPI/openAPI"
import FileDialogue from "../ioUtil/fileDialogue"
import FileManager from "../ioUtil/fileManager"
import yaml from 'js-yaml'
import DirTree from "../ioUtil/dirTree"

class APISchemaService {
  static async openAPISchema(): Promise<(OpenAPI | "")> {
    const openResult = await FileDialogue.openFile(['yaml'])
    if (openResult.filePaths.length === 0) return ''
    const openApi = yaml.load(FileManager.readFile(openResult.filePaths[0]))
    const model: OpenAPI = openApi as OpenAPI
    return model
  }
  static async openSchemaDirectory(): Promise<AppDirEnt | ""> {
    const openResult = await FileDialogue.openDirectory()
    if (openResult.filePaths.length === 0) return ''
    return DirTree.from(openResult.filePaths[0])
  }

  static async openAPISchemaOfPath(path: string): Promise<(OpenAPI | "")> {
    const openApi = yaml.load(FileManager.readFile(path))
    const model: OpenAPI = openApi as OpenAPI
    return model
  }
}

export default APISchemaService