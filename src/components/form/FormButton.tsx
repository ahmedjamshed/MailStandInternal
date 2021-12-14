import { Button, TextInput, ThemeProvider, defaultTheme } from "evergreen-ui";
import React from "react";
import pallete from "../../config/pallete";

interface FormInputProps {
  text: string;
  iconBefore: any;
  onClick: () => void;
}

const FormButton: React.FC<FormInputProps> = ({
  text,
  iconBefore,
  onClick,
  ...rest
}) => {
  return (
    <Button
      iconBefore={iconBefore}
      backgroundColor={pallete.neutral}
      appearance="superdanger"
      color={"white"}
      fontWeight="600"
      className="h-8 mt-2 text-center font-bold text-sm"
      onClick={onClick}
      {...rest}
    >
      {text}
    </Button>
  );
};

export default FormButton;
