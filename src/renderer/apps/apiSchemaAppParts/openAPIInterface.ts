import OperationSheetsData from "./mainAreaParts/operationSheetsInterface"
import PathTableInterface from "./mainAreaParts/pathTableInterface"

interface SchemaViewJson {
  operations: OperationSheetsData
  path: PathTableInterface
}

export default SchemaViewJson