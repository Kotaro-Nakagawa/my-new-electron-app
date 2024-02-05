import ListElement from "@ElementBase/listElement";
import FolderItem from "./folderItem";
import FileItem from "./fileItem";
import AppDirEnt from "@Structure/fileSysstem/dirEnt";
import AddFileButton from "./addFileButton";

class DirEntList extends ListElement<FolderItem | FileItem>{
  constructor(data: AppDirEnt, onFileSelect: (path: string) => void, onNewSchemaButton: (filePath: string) => void) {
    super(data.children.map(d => {
      return d.type === "file" ? new FileItem(d, onFileSelect) : new FolderItem(d, onFileSelect, onNewSchemaButton)
    }).concat([new AddFileButton(data.path, onNewSchemaButton)]))
  }
}

export default DirEntList