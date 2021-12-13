import React from "react";
import { TextInput } from "evergreen-ui";
import Link from "next/link";
interface FormInputProps {
  label: string;
  labelSecondary: string | null;
}

const FormInput: React.FC<FormInputProps> = ({ label, labelSecondary }) => {
  return (
    <div className="my-1">
      {label && (
        <div className="flex flex-row flex-wrap justify-between items-center align-middle">
          <div className="text-H_400 font-medium text-N-800">{label}</div>
          {labelSecondary && (
            <Link href="/forgot">
              <a className="ml-0 sm:ml-1  text-xs text-B-500 cursor-pointer">
                Forgot password
              </a>
            </Link>
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
