// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld(
  'app', {
  sendMessage: (msg: string): void => {
    ipcRenderer.invoke('send:message', msg);
  },
  openFile: async (): Promise<string> => {
    return await ipcRenderer.invoke('openfile');
  },
  openYaml: async (): Promise<string> => {
    return await ipcRenderer.invoke('openYaml');
  }
})