import PropTypes, { InferProps } from "prop-types";
import { TextInput } from "evergreen-ui";
import React from "react";
interface FormInputProps {
  label: string;
  labelSecondary: string;
}

const FormInput: React.FC<FormInputProps> = ({ label, labelSecondary }) => {
  return (
    <div className="my-2">
      {label && (
        <div className="flex flex-row justify-between items-center align-middle">
          <div className="text-lg font-medium text-N-800">{label}</div>
          {labelSecondary && (
            <div className="text-xs font-normal align-middle cursor-pointer text-B-500">
              {labelSecondary}
            </div>
          )}
        </div>
      )}
      <TextInput
        className="min-w-full my-2 h-8"
        {...undefined}
        backgroundColor="#FAFBFC"
      />
    </div>
  );
};

export default FormInput;