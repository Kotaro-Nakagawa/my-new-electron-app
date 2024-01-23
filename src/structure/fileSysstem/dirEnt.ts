interface AppDirEnt {
  name: string
  path: string
  type: ("file" | "directory")
  children?: AppDirEnt[]
}

export default AppDirEnt