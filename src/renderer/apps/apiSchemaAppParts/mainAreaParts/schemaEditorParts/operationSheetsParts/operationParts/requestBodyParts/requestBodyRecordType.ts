import RequestBodyMaxItem from "./recordParts/requestBodyMaxItem";
import RequestBodyLimitMayExclusiveSelect from "./recordParts/requestBodyLimitMayExclusiveSelect";
import RequestBodyMinItem from "./recordParts/requestBodyMinItem";
import RequestBodyPatternText from "./recordParts/requestBodyPatternText";
import RequestBodyEnumText from "./recordParts/requestBodyEnumText";
import RequestBodyFormatText from "./recordParts/requestBodyFormatText";
import RequestBodyTypeText from "./recordParts/requestBodyTypeText";
import RequestBodyRequiredText from "./recordParts/requestBodyRequiredText";
import RequestBodyNameText from "./recordParts/requestBodyNameText";
import RequestBodyDescriptionText from "./recordParts/requestBodyDescriptionText";
import RequestBodyExampleText from "./recordParts/requestBodyExampleText";

export type RequestBodyRecordType = {
  name: RequestBodyNameText;
  description: RequestBodyDescriptionText;
  required: RequestBodyRequiredText;
  type: RequestBodyTypeText;
  format: RequestBodyFormatText;
  enum: RequestBodyEnumText;
  pattern: RequestBodyPatternText;
  min: RequestBodyMinItem;
  max: RequestBodyMaxItem;
  isMinExclusive: RequestBodyLimitMayExclusiveSelect;
  isMaxExclusive: RequestBodyLimitMayExclusiveSelect;
  example: RequestBodyExampleText;
}