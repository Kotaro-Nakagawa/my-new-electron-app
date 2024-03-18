const foldAreaPercentage = 2
const indentPercentage = 1

class FoldableTableLineNames {
  static FOLD_START_LINE = 'fold-start' as const
  static FOLD_END_LINE = 'fold-end' as const
  static INDENT_X_LINE = (x: number) => { return `indent-${x}` }
  static CONTENT_X_LINE = (x: number) => { return `content-${x}` }
  static FOLD_AREA_WIDTH = `${foldAreaPercentage}%` as const
  static INDENT_WIDTH = `${indentPercentage}%` as const
  static TABLE_END = 'table-end' as const
  static getTemplate(maxDepth: number, columnWeights: number[]) {
    const columnPercentages = columnPercentageFromWeights()
    const foldbuttonAreaTemplaete = `[${FoldableTableLineNames.FOLD_START_LINE}] ${FoldableTableLineNames.FOLD_AREA_WIDTH} [${FoldableTableLineNames.FOLD_END_LINE} ${FoldableTableLineNames.INDENT_X_LINE(0)}] ${FoldableTableLineNames.INDENT_WIDTH} `
    const indentAreaTemplate = [...Array(maxDepth)].map((_, i) => `[${FoldableTableLineNames.INDENT_X_LINE(i + 1)}]`).join(` ${FoldableTableLineNames.INDENT_WIDTH} `) + ' 0px '
    const mainAreaTemplate = [...Array(columnWeights.length)].map((_, i) => `[${FoldableTableLineNames.CONTENT_X_LINE(i)}] ${columnPercentages[i]}% `).join('')
    return foldbuttonAreaTemplaete + indentAreaTemplate + mainAreaTemplate + ` [${FoldableTableLineNames.TABLE_END}]`
    function columnPercentageFromWeights() {
      const totalWeight = columnWeights.reduce((ttl, val) => ttl + val, 0)
      const sideAreaPercentage = foldAreaPercentage + maxDepth * indentPercentage
      const mainAreaPercentage = 100 - sideAreaPercentage
      const columnPercentages = columnWeights.map(c => Math.round(c * mainAreaPercentage / totalWeight))
      const roundingError = mainAreaPercentage - columnPercentages.reduce((sum, val) => sum + val, 0)
      columnPercentages[0] += roundingError
      return columnPercentages
    }
  }
  static getFullRange() {
    return {
      start: FoldableTableLineNames.FOLD_START_LINE,
      end: FoldableTableLineNames.TABLE_END
    }
  }
  static getFoldButtonRange() {
    return {
      start: FoldableTableLineNames.FOLD_START_LINE,
      end: FoldableTableLineNames.FOLD_END_LINE
    }
  }
  static getRangeOfColumn(depth: number, index: number) {
    return {
      start: index === 0 ? FoldableTableLineNames.INDENT_X_LINE(depth) : FoldableTableLineNames.CONTENT_X_LINE(index),
      end: FoldableTableLineNames.CONTENT_X_LINE(index + 1)
    }
  }
}

export default FoldableTableLineNames