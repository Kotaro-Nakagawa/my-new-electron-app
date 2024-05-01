import AppElement from "@ElementBase/element"
import OperationSheetsData from "./operationSheetsInterface"
import OperationSheetMain from "./operationSheetsParts/operationSheetMain"
import OperationSheetTabs from "./operationSheetsParts/operationSheetTabs"

const elementId = 'operation-sheets'

const element = () => {
  const ret = document.createElement('div')
  ret.id = elementId
  return ret
}

class OperationSheets extends AppElement {
  #tabs
  #currentPathIndex
  #currentMethod: string
  #operation
  #data: OperationSheetsData

  constructor() {
    super(element())
    this.#currentPathIndex = 0
    this.#currentMethod = undefined
    this.#tabs = new OperationSheetTabs((method) => {
      this.changeCurrentMethod(method)
    })
    this.#operation = new OperationSheetMain()
    this.element.appendChild(this.#tabs.element)
    this.element.appendChild(this.#operation.element)
  }
  saveCurrent() {
    console.log('↓ savecurrent')
    const currentPath = this.#data.reduce((agg: string[], cur) => {
      if (!agg.includes(cur.path)) agg.push(cur.path)
      return agg
    }, [])[this.#currentPathIndex]
    // const operationsWithCurrentPath = this.#data.filter(d => d.path === currentPath)
    const currentMethodIndex = this.#data.findIndex(o => o.path === currentPath && o.method === this.#currentMethod)
    console.log(this.#data[currentMethodIndex])
    console.log('  update current')
    this.#data[currentMethodIndex] = this.#operation.value
    console.log(this.#data[currentMethodIndex])
    console.log('↑ savecurrent')
  }
  loadData(data: OperationSheetsData) {
    this.#data = data
    const paths: string[] = data.reduce((agg: string[], cur) => {
      if (!agg.includes(cur.path)) agg.push(cur.path)
      return agg
    }, [])
    const methods = data.filter(d => d.path === paths[0]).map(d => d.method)
    this.#tabs.loadData(methods)
    this.changeCurrentMethod(methods[0])
  }
  changeCurrentPath(path: string, method?: string) {
    const operationsWithThePath = this.#data.filter(d => d.path === path)
    this.#tabs.loadData(operationsWithThePath.map(o => o.method))
    if (method === undefined) {
      this.#operation.loadData(operationsWithThePath[0])
    } else {
      this.#operation.loadData(operationsWithThePath.find(o => o.method === method))
    }
  }
  changeCurrentMethod(method: string) {
    console.log(`currentMethod is ${this.#currentMethod}`)
    if (this.#currentMethod !== undefined) this.saveCurrent()
    const currentPath = this.#data.reduce((agg: string[], cur) => {
      if (!agg.includes(cur.path)) agg.push(cur.path)
      return agg
    }, [])[this.#currentPathIndex]
    const operationsWithCurrentPath = this.#data.filter(d => d.path === currentPath)
    this.#operation.loadData(operationsWithCurrentPath.find(o => o.method === method))
    this.#currentMethod = method
  }
  updatePathValue(newPath: string, index: number) {
    const paths: string[] = this.#data.reduce((agg: string[], cur) => {
      if (!agg.includes(cur.path)) agg.push(cur.path)
      return agg
    }, [])
    const changeTarget = paths[index]
    const targetOperations = this.#data.filter(d => d.path === changeTarget)
    targetOperations.forEach(d => d.path = newPath)
    if (this.#currentPathIndex === index) {
      this.#operation.loadData(targetOperations.find(o => o.method === this.#currentMethod))
    }
  }
  get data(): OperationSheetsData {
    this.saveCurrent()
    console.log('↓ save this data')
    console.log(this.#data)
    console.log('↑ save this data')
    return this.#data
  }
}

export default OperationSheets