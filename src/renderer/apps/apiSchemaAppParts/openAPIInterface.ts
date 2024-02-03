import InfoTableInterface from "./mainAreaParts/schemaEditorParts/infoTableInterface"
import OperationSheetsData from "./mainAreaParts/schemaEditorParts/operationSheetsInterface"
import PathTableInterface from "./mainAreaParts/schemaEditorParts/pathTableInterface"

interface SchemaViewJson {
  info: InfoTableInterface
  operations: OperationSheetsData
  path: PathTableInterface
}

export default SchemaViewJson