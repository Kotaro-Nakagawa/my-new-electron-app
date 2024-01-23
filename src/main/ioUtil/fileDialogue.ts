import { BrowserWindow, dialog } from 'electron'

class FileDialogue {
  static async openFile(extensions: string[]) {
    const win = BrowserWindow.getFocusedWindow();

    const result = await dialog.showOpenDialog(
      win,
      {
        properties: ["openFile"],
        filters: [
          {
            name: "Documents",
            extensions: extensions,
          },
        ],
      }
    );
    return result
  }

  static async openDirectory() {
    const win = BrowserWindow.getFocusedWindow();

    const result = await dialog.showOpenDialog(
      win,
      {
        properties: ["openDirectory"]
      }
    );
    return result
  }
}

export default FileDialogue
