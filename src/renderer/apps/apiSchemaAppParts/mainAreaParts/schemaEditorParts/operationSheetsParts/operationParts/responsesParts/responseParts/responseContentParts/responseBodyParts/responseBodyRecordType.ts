import responseBodyDescriptionText from "./responseBodyRecordParts/responseBodyDescriptionText";
import responseBodyEnumText from "./responseBodyRecordParts/responseBodyEnumText";
import responseBodyExampleText from "./responseBodyRecordParts/responseBodyExampleText";
import responseBodyFormatText from "./responseBodyRecordParts/responseBodyFormatText";
import ResponseBodyLimitMayExclusiveSelect from "./responseBodyRecordParts/responseBodyLimitMayExclusiveSelect";
import responseBodyMaxText from "./responseBodyRecordParts/responseBodyMaxText";
import responseBodyMinText from "./responseBodyRecordParts/responseBodyMinText";
import responseBodyNameText from "./responseBodyRecordParts/responseBodyNameText"
import responseBodyPatternText from "./responseBodyRecordParts/responseBodyPatternText";
import responseBodyRequiredText from "./responseBodyRecordParts/responseBodyRequiredText";
import responseBodyTypeText from "./responseBodyRecordParts/responseBodyTypeText";

export type ResponseBodyRecordType = {
  name: responseBodyNameText;
  description: responseBodyDescriptionText;
  required: responseBodyRequiredText;
  type: responseBodyTypeText;
  format: responseBodyFormatText;
  enum: responseBodyEnumText;
  pattern: responseBodyPatternText;
  min: responseBodyMinText;
  max: responseBodyMaxText;
  isMinExclusive: ResponseBodyLimitMayExclusiveSelect;
  isMaxExclusive: ResponseBodyLimitMayExclusiveSelect;
  example: responseBodyExampleText;
}