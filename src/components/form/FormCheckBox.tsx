import React from "react";
import { Checkbox } from "evergreen-ui";
import pallete from "../../config/pallete";

interface FormCheckBoxProps {
  checked: boolean;
  label: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormCheckBox: React.FC<FormCheckBoxProps> = ({
  checked = false,
  label,
  onChange,
}: FormCheckBoxProps) => {
  return (
    <Checkbox
      checked={checked}
      label={label}
      fontSize=".875rem"
      lineHeight="1rem"
      color={pallete.neutral}
      onChange={onChange}
    />
  );
};

export default FormCheckBox;
