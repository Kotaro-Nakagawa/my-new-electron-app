import OpenAPI from "@Structure/openAPI/openAPI"
import ApiSchemaConverter from "./apiSchemaConverter"
import AppVStack from "@ElementBase/vStack";
import InfoTable from "./schemaEditorParts/infoTable"
import OperationSheets from "./schemaEditorParts/operationSheets"
import PathTable from "./schemaEditorParts/pathTable"
import InfoTableInterface from "./schemaEditorParts/infoTableInterface";
import PathTableInterface from "./schemaEditorParts/pathTableInterface";
import OperationSheetsData from "./schemaEditorParts/operationSheetsInterface";

const createParts = (info: InfoTableInterface, path: PathTableInterface, operations: OperationSheetsData): [InfoTable, PathTable, OperationSheets] => {
  const infoTable = new InfoTable(info)
  const pathLists = new PathTable()
  const operationSheets = new OperationSheets()

  pathLists.loadData(path, (v: string) => { operationSheets.updatePathValue(v, undefined) })
  operationSheets.loadData(operations)
  return [infoTable, pathLists, operationSheets]
}

class SchemaEditor extends AppVStack<[InfoTable, PathTable, OperationSheets]> {
  #filePath
  #onSaveCommand
  #schema
  constructor(apiSchema: OpenAPI, filePath: string, onSaveCommand: (path: string, data: OpenAPI) => void) {
    const { info, path, operations } = ApiSchemaConverter.schemaToViewJson(apiSchema)
    super(createParts(info, path, operations))
    this.#filePath = filePath
    this.#onSaveCommand = onSaveCommand
    this.#schema = apiSchema
  }
  save() {
    const info = this.contents[0].value
    const pathLists = this.contents[1]
    const operationSheets = this.contents[2].data
    const values = ApiSchemaConverter.viewJsonToSchema(info, operationSheets)
    values.components = this.#schema.components
    values.externalDocs = this.#schema.externalDocs
    values.jsonSchemaDialect = this.#schema.jsonSchemaDialect
    values.servers = this.#schema.servers
    values.webhooks = this.#schema.webhooks
    values.components = this.#schema.components
    values.security = this.#schema.security
    values.tags = this.#schema.tags
    values.externalDocs = this.#schema.externalDocs
    console.log('save This ↓')
    console.log(values)
    console.log('↑ save This')
    this.#onSaveCommand(this.#filePath, values)
  }
}

export default SchemaEditor