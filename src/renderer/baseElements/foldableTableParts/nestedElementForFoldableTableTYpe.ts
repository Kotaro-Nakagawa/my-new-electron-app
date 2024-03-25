export type nestedElementForFoldableTable<T> = {
  record: T,
} | {
  subroot: T,
  children: nestedElementForFoldableTable<T>[]
}

