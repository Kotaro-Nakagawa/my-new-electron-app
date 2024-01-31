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
  constructor(apiSchema: OpenAPI) {
    const { info, path, operations } = ApiSchemaConverter.schemaToViewJson(apiSchema)
    super(createParts(info, path, operations))
  }
}

export default SchemaEditor