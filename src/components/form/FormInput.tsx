// @ts-nocheck
import React, { useRef, useState } from "react";
import {
  Heading,
  minorScale,
  Pane,
  TextInput,
  TextInputField,
  useTheme,
} from "evergreen-ui";
import Link from "next/link";
import pallete from "../../config/pallete";
interface FormInputProps {
  label: string | null;
  labelSecondary: string | null;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement> | undefined) => void;
  [x: string]: any;
  [error]: string | null | any;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  labelSecondary,
  name,
  onChange,
  error,
  ...rest
}) => {
  const ref = React.useRef<HTMLInputElement | null>(null);
  return (
    <Pane display="flex" flexDirection="column" marginTop={minorScale(2)}>
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
                {labelSecondary}
              </a>
            </Link>
          )}
        </div>
      )}
      <TextInput
        label={null}
        ref={ref}
        backgroundColor={pallete.inputBackgound}
        width={"100%"}
        className="my-2 h-8"
        onChange={onChange}
        name={name}
        fontWeight="400"
        fontSize="0.875rem"
        lineHeight="1.25rem"
        onBlur={() => {
          ref.current?.style.backgroundColor = pallete.inputBackgound;
        }}
        onFocus={() => {
          ref.current?.style.backgroundColor = pallete.white;
        }}
        {...rest}
      />
      {error && (
        <span class="flex items-center text-justify font-medium tracking-wide text-red-500 text-xs  ml-1">
          *{" " + error}!
        </span>
      )}
    </Pane>
  );
};

export default FormInput;
