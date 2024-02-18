import OpenAPI from "../../structure/openAPI/openAPI";
import AppDirEnt from "@Structure/fileSysstem/dirEnt";

declare global {
  interface Window {
    app: IMainProcess;
    APISchemaService: IAPISchemaService
  }
}

export interface IMainProcess {
  sendMessage: (msg: string) => void;
  openFile: () => Promise<string>;
  openYaml: () => Promise<OpenAPI | "">;
  openYamlDir: () => Promise<AppDirEnt | "">
}

export interface IAPISchemaService {
  loadYaml: (path: string) => Promise<OpenAPI | "">;
  openYamlDir: () => Promise<AppDirEnt | "">;
  saveYaml: (path: string, data: OpenAPI) => Promise<>;
  createYaml: (path: string, fileName: string, data: OpenAPI) => Promise<string>;
  reloadFolder: () => Promise<AppDirEnt | "">;
}