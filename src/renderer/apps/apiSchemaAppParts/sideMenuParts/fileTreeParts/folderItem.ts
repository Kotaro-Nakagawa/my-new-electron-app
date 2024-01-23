import FolderbleElement from "@ElementBase/foldableElement";
import AppDirEnt from "@Structure/fileSysstem/dirEnt";
import DirEntList from "./direntList";

class FolderItem extends FolderbleElement {
  constructor(data: AppDirEnt, onFileSelect: (path: string) => void) {
    super(data.name, new DirEntList(data, onFileSelect))
  }
}

export default FolderItem