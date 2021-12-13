import React from "react";
import { Paragraph } from "../../utils/types";
import classnames from "classnames";
interface AppHeadingProps {
  paragraphType: Paragraph;
  text: string;
  rest: any | null | undefined;
}
const classes = [
  "text-xs font-normal", //P_100
  "text-sm text-left font-normal", //P_200
  "", //P_300
];
const AppParagraph: React.FC<AppHeadingProps> = ({
  paragraphType,
  text,
  rest,
}: AppHeadingProps) => {
  return (
    <div className={classnames(classes[paragraphType], [rest ? rest : ""])}>
      {text}
    </div>
  );
};

export default AppParagraph;
