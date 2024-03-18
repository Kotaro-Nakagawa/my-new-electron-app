class FoldableTableManager {
  #maxDepth
  constructor() {
    this.#maxDepth = 0
  }
  reportNewDepth(depth: number) {
    if (depth > this.#maxDepth) {
      this.#maxDepth = depth
      return
    }
  }
  getMaxDepth() {
    return this.#maxDepth
  }
}

export default FoldableTableManager
