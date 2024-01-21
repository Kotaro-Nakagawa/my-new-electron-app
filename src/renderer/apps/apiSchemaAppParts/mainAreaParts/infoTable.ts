import FoldableKeyValue from "@ElementBase/foldableKeyValues";
import InfoRecord from "./infoTableParts/infoRecord";
import InfoTableInterface from "./infoTableInterface";

class InfoTable extends FoldableKeyValue {
  constructor() {
    super('info')
  }

  loadData(records: InfoTableInterface) {
    this.content = records.map(r => new InfoRecord(r))
    this.updateElement()
  }
}

export default InfoTable
