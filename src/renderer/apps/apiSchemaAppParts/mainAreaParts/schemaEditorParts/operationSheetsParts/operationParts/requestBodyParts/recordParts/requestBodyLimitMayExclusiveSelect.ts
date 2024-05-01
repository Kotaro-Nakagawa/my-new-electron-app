import AppTextBox from "@ElementBase/textbox";

const valueToInequalityStr = (value: boolean): string => {
  if (value === true) {
    return '<'
  }
  if (value === false) {
    return '≦'
  }
  return '?'
}

class RequestBodyLimitMayExclusiveSelect extends AppTextBox {
  constructor(value: boolean) {
    super(valueToInequalityStr(value))
  }
  get isExclusive(): boolean {
    return this.value === '<'
  }
}

export default RequestBodyLimitMayExclusiveSelect
