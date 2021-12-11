import { Button, TextInput } from "evergreen-ui";
import React from "react";
import pallete from "../../config/pallete";

interface FormInputProps {
  text: string;
}

const FormButton: React.FC<FormInputProps> = ({ text, ...rest }) => {
  return (
    <Button
      backgroundColor={pallete.neutral}
      appearance="primary"
      color={"white"}
      className="h-8 mt-2 text-center font-bold text-sm hover:bg-B-500"
      {...rest}
    >
      {text}
    </Button>
  );
};

export default FormButton;
