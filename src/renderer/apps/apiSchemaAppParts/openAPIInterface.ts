import InfoTableInterface from "./mainAreaParts/infoTableInterface"
import OperationSheetsData from "./mainAreaParts/operationSheetsInterface"
import PathTableInterface from "./mainAreaParts/pathTableInterface"

interface SchemaViewJson {
  info: InfoTableInterface
  operations: OperationSheetsData
  path: PathTableInterface
}

export default SchemaViewJson