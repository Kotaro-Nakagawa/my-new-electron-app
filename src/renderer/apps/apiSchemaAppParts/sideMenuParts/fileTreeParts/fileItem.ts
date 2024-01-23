import AppButton from "@ElementBase/button";
import AppDirEnt from "@Structure/fileSysstem/dirEnt";

class FileItem extends AppButton {
  constructor(data: AppDirEnt, onclick: (path: string) => void) {
    super(data.name, () => { onclick(data.path) })
  }
}

export default FileItem