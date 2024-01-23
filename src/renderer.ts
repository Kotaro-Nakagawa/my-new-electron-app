/**
 * This file will automatically be loaded by webpack and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/latest/tutorial/process-model
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 *
 * To enable Node.js integration in this file, open up `main.js` and enable the `nodeIntegration`
 * flag:
 *
 * ```
 *  // Create the browser window.
 *  mainWindow = new BrowserWindow({
 *    width: 800,
 *    height: 600,
 *    webPreferences: {
 *      nodeIntegration: true
 *    }
 *  });
 * ```
 */

import './index.css';
import ApiSchemaApp from './renderer/apps/apiSchemaApp';
import Dock from './renderer/main';

console.log('👋 This message is being logged by "renderer.js", included via webpack');

window.onload = () => {
  // const mainApp = new ApiSchemaApp()
  const mainApp = new Dock(window.APISchemaService)
  const mainElement = document.getElementById('main')
  mainElement.appendChild(mainApp.element)
  const devElement = document.getElementById('develop')
  const buttonElement = document.createElement('div')
  devElement.appendChild(buttonElement)
  buttonElement.onclick = () => {
    window.app.sendMessage('Send message from renderer.');
  }
  buttonElement.innerText = 'I want to send something to backend'
  const customLog = document.createElement('div')
  devElement.appendChild(customLog)
  customLog.id = 'myconsole'
  const openButton = document.createElement('div')
  devElement.appendChild(openButton)
  openButton.onclick = async () => {
    const fileText = await window.app.openYaml()
    if (fileText === "") return
    customLog.innerText = JSON.stringify(fileText, undefined, 4)
    mainApp.loadAPISchema(fileText)
  }
  openButton.innerText = 'ファイルを開く'
  const dirOpenButton = document.createElement('div')
  devElement.appendChild(dirOpenButton)
  dirOpenButton.innerText = 'フォルダを開く'
  dirOpenButton.onclick = async () => {
    const fileTree = await window.app.openYamlDir()
    if (fileTree === "") return
    customLog.innerText = JSON.stringify(fileTree, undefined, 4)
    mainApp.loadDirectoryTree(fileTree)
  }
}
