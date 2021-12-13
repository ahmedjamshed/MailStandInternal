import React from "react";
import { Headline } from "../../utils/types";
import classnames from "classnames";
interface AppHeadingProps {
  headingType: Headline;
  text: string;
  rest: any | null | undefined;
}
const classes = [
  "font-medium text-tiny", //H_100
  "", //H_200
  "", //H_300
  "text-H_400 font-medium", //H_400
  "text-H_500 font-semibold", //H_500
];
const AppHeading: React.FC<AppHeadingProps> = ({
  headingType,
  text,
  rest,
}: AppHeadingProps) => {
  return (
    <div className={classnames(classes[headingType], [rest ? rest : ""])}>
      {text}
    </div>
  );
};

export default AppHeading;
