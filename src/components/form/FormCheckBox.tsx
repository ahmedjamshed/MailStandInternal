import React from "react";
import { Checkbox } from "evergreen-ui";

interface FormCheckBoxProps {
  checked: boolean;
  label: string;
}

const FormCheckBox: React.FC<FormCheckBoxProps> = ({
  checked = false,
  label,
}: FormCheckBoxProps) => {
  return (
    <Checkbox checked={checked} label={label} className="text-sm font-normal" />
  );
};

export default FormCheckBox;
