import React, { useState } from "react";
import { Heading, minorScale, Pane, TextInput, useTheme } from "evergreen-ui";
import Link from "next/link";
import pallete from "../../config/pallete";
interface FormInputProps {
  label: string;
  labelSecondary: string | null;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement> | undefined) => void;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  labelSecondary,
  name,
  onChange,
}) => {
  return (
    <Pane display="flex" flexDirection="column" marginTop={minorScale(3)}>
      {label && (
        <div className="flex flex-row flex-wrap justify-between items-center align-middle">
          <Heading
            size={400}
            fontWeight="500"
            fontSize={".875rem"}
            lineHeight={"1.5rem"}
            color={pallete.N_800}
          >
            {label}
          </Heading>
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
        backgroundColor={pallete.inputBackgound}
        width={"100%"}
        className="my-2 h-8"
        {...undefined}
        onChange={onChange}
        name={name}
      />
    </Pane>
  );
};

export default FormInput;
