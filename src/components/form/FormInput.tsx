import PropTypes, { InferProps } from "prop-types";
import { TextInput } from "evergreen-ui";
import React from "react";
interface FormInputProps {
  label: string;
  labelSecondary: string | null;
}

const FormInput: React.FC<FormInputProps> = ({ label, labelSecondary }) => {
  return (
    <div className="my-1">
      {label && (
        <div className="flex flex-row justify-between items-center align-middle">
          <div className="text-sm font-medium text-N-800">{label}</div>
          {labelSecondary && (
            <div className="text-xs font-normal align-middle cursor-pointer text-B-500">
              {labelSecondary}
            </div>
          )}
        </div>
      )}
      <TextInput
        backgroundColor="#FAFBFC"
        className="my-2 h-8"
        style={{ width: "100%" }}
        {...undefined}
      />
    </div>
  );
};

export default FormInput;
