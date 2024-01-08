import OpenAPI from "../../structure/openAPI/openAPI";

declare global {
  interface Window {
    app: IMainProcess;
  }
}

export interface IMainProcess {
  sendMessage: (msg: string) => void;
  openFile: () => Promise<string>;
  openYaml: () => Promise<OpenAPI | "">;
}