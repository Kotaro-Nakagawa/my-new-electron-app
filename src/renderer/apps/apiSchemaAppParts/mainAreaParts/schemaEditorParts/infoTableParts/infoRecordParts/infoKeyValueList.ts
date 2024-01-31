import InfoValueBox from "./infoValueBox"
import KeyValueList from "@ElementBase/foldableKeyValueParts/keyValueList"
import InfoRecordInterface from "../infoRecordInterface"
import InfoRecord from "../infoRecord"

class InfoKeyValueList extends KeyValueList {
  constructor(values: InfoRecordInterface[]) {
    super()
    this.pushMany(values.map(v => new InfoRecord(v)))
  }
}

export default InfoKeyValueList