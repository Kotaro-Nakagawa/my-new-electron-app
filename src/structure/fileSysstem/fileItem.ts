interface FileItem {
  name: string
  type: ("file" | "directory")
  children?: FileItem[]
}

export default FileItem