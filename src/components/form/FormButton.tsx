import { Button, TextInput, ThemeProvider, defaultTheme } from "evergreen-ui";
import React from "react";
import pallete from "../../config/pallete";

interface FormInputProps {
  text: string;
}

const FormButton: React.FC<FormInputProps> = ({ text, ...rest }) => {

  return (
    
    <Button
      backgroundColor={pallete.neutral}
      appearance="superdanger"
      color={"white"}
      className="h-8 mt-2 text-center font-bold text-sm"
      {...rest}
    >
      {text}
    </Button>
  );
};

export default FormButton;
