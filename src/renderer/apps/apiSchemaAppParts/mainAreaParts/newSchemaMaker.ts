import AppSlideSet from "@ElementBase/slideSet"
import InfoMethodPath from "./newSchemaMakerParts/infoMethodPath"
import OperationsMaker from "./newSchemaMakerParts/operations"
import OpenAPI from "@Structure/openAPI/openAPI"
import Paths from "@Structure/openAPI/openAPIParts/paths"
import PathItem from "@Structure/openAPI/openAPIParts/pathItem"
import infoFileName from "./newSchemaMakerParts/infoFileName"


class NewSchemaMaker extends AppSlideSet<[infoFileName, InfoMethodPath, OperationsMaker]> {
  #saveDirPath: string
  #saveFilePath: string
  constructor(filepath: string, onCreateFile: (dirPath: string, fileName: string, data: OpenAPI) => Promise<string>, onComplete: (path: string, data: OpenAPI) => void) {
    super([
      new infoFileName(async () => {
        const newOpenAPI: OpenAPI = {
          openapi: '3.1.0',
          info: {
            title: 'title',
            version: '1'
          }
        }
        this.#saveFilePath = await onCreateFile(this.#saveDirPath, this.infoFileName.fileName, newOpenAPI)
        this.toInfoMethodPath()
      }),
      new InfoMethodPath(() => { this.toOperationMaker() }),
      new OperationsMaker(() => { this.toInfoMethodPath }, () => {
        const pathItemOfPath = (pm: { path: string, methods: method[] }) => {
          console.log('start to make pathItem')
          console.log(pm)
          const pathItem: PathItem = {}
          if (pm.methods.includes('get')) pathItem.get = this.operationsMaker.valueOf(pm.path, 'get')
          if (pm.methods.includes('put')) pathItem.put = this.operationsMaker.valueOf(pm.path, 'put')
          if (pm.methods.includes('patch')) pathItem.patch = this.operationsMaker.valueOf(pm.path, 'patch')
          if (pm.methods.includes('post')) pathItem.post = this.operationsMaker.valueOf(pm.path, 'post')
          if (pm.methods.includes('delete')) pathItem.delete = this.operationsMaker.valueOf(pm.path, 'delete')
          console.log(`made pathItem of path ${pm.path}`)
          console.log(pathItem)
          return pathItem
        }
        const paths = (): Paths => {
          const pathMethodList = this.infoMethodPath.value
          let ret: Paths = {}
          console.log(`make pathMethod of`)
          console.log(pathMethodList)
          pathMethodList.forEach(pm => {
            ret[pm.path] = pathItemOfPath(pm)
          })
          return ret
        }
        const newOpenAPI: OpenAPI = {
          openapi: '3.1.0',
          info: {
            title: 'title',
            version: '1'
          },
          paths: paths()
        }
        onComplete(this.#saveFilePath, newOpenAPI)
      })
    ])
    console.log(`save directory path is ${filepath}`)
    this.#saveDirPath = filepath
  }
  get infoFileName() {
    return this.contents[0] as infoFileName
  }
  get infoMethodPath() {
    return this.contents[1] as InfoMethodPath
  }
  get operationsMaker() {
    return this.contents[2] as OperationsMaker
  }
  toOperationMaker() {
    const flattenPathMethod = this.infoMethodPath.value.flatMap((pm) => {
      const path = pm.path
      return pm.methods.map((method) => {
        return {
          path: path,
          method: method
        }
      })
    })
    console.log(flattenPathMethod)
    this.operationsMaker.putNewSlidesFromPathMethodList(flattenPathMethod)
    this.switchTo(2)
  }
  toInfoMethodPath() {
    this.switchTo(1)
  }
}

export default NewSchemaMaker