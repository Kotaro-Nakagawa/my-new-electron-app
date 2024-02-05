import AppVStack from "@ElementBase/vStack";
import PathSampleBox from "./operationMakerParts/pathSampleBox";
import ExtractedPathParams from "./operationMakerParts/extractedPathParams";
import ExtractedQueryParams from "./operationMakerParts/extractedQueryParams";
import BodySampleBox from "./operationMakerParts/bodySampleBox";

class OperationMaker extends AppVStack<[PathSampleBox, ExtractedPathParams, ExtractedQueryParams, BodySampleBox]> {
  #path: string
  #method: method
  constructor(path: string, method: method) {
    super([
      new PathSampleBox(''), new ExtractedPathParams(), new ExtractedQueryParams(), new BodySampleBox('')
    ])
    this.#path = path
    this.#method = method
  }

  updateQueries() {

  }

  updastePathParams() {

  }
}

export default OperationMaker