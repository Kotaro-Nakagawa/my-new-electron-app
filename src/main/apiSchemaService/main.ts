import OpenAPI from "../../structure/openAPI/openAPI"
import FileDialogue from "../ioUtil/fileDialogue"
import FileManager from "../ioUtil/fileManager"
import yaml from 'js-yaml'

class APISchemaService {
  static async openAPISchema(): Promise<(OpenAPI | "")> {
    const openResult = await FileDialogue.openFile(['yaml'])
    if (openResult.filePaths.length === 0) return ''
    const openApi = yaml.load(FileManager.readFile(openResult.filePaths[0]))
    const model: OpenAPI = openApi as OpenAPI
    return model
  }
}

export default APISchemaService