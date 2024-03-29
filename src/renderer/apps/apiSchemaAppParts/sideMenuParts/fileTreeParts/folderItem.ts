import FolderbleElement from "@ElementBase/foldableElement";
import AppDirEnt from "@Structure/fileSysstem/dirEnt";
import DirEntList from "./direntList";

class FolderItem extends FolderbleElement {
  constructor(data: AppDirEnt, onFileSelect: (path: string) => void, onNewSchemaButton: (filePath: string) => void) {
    super(data.name, new DirEntList(data, onFileSelect, onNewSchemaButton))
  }
}

export default FolderItem