import { Button, TextInput, ThemeProvider, defaultTheme } from "evergreen-ui";
import React from "react";
import pallete from "../../config/pallete";

interface FormInputProps {
  text: string;
  iconBefore: any;
  onClick: () => void;
  appereance: string;
  [x: string]: any;
}

const FormButton: React.FC<FormInputProps> = ({
  text,
  iconBefore,
  appereance,
  onClick,
  ...rest
}) => {
  return (
    <Button
      iconBefore={iconBefore}
      appearance={appereance}
      fontWeight="600"
      className="h-8 mt-2 text-center font-bold text-sm"
      onClick={onClick}
      {...rest}
    >
      {text}
    </Button>
  );
};

FormButton.defaultProps = {
  appereance: "primary",
};

export default FormButton;
