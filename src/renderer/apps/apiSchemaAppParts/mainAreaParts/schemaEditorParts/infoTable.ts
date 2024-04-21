import FoldableKeyValue from "@ElementBase/foldableKeyValues";
import InfoRecord from "./infoTableParts/infoRecord";
import InfoTableInterface from "./infoTableInterface";

class InfoTable extends FoldableKeyValue {
  constructor(records: InfoTableInterface) {
    super('info')
    this.content = records.map(r => new InfoRecord(r))
    this.updateElement()
  }
  get value(): InfoTableInterface {
    return this.content.map(c => {
      return {
        key: c.value.key,
        value: c.value.value
      }
    })
  }
}

export default InfoTable
