import React from "react";
import { Headline } from "../../styles/types";
import classnames from "classnames";
interface AppHeadingProps {
  headingType: Headline;
  text: string;
  rest: any | null | undefined;
}
const classes = ["font-medium text-tiny"];
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
