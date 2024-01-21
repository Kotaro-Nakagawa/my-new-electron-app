import KeyValueRecord from "@ElementBase/foldableKeyValueParts/keyValueRecord";
import InfoRecordInterface from "./infoRecordInterface";
import InfoKeyLabel from "./infoRecordParts/infoKeyLabel";
import InfoValueBox from "./infoRecordParts/infoValueBox";
import InfoKeyValueList from "./infoRecordParts/infoKeyValueList";

const contentOfValue = (value: string | InfoRecordInterface[]): InfoValueBox | InfoKeyValueList => {
  if (typeof value === 'string') {
    return new InfoValueBox(value)
  }
  return new InfoKeyValueList(value)
}

class InfoRecord extends KeyValueRecord {
  constructor(keyValue: InfoRecordInterface) {
    super(new InfoKeyLabel(keyValue.key), contentOfValue(keyValue.value))
  }
}

export default InfoRecord
