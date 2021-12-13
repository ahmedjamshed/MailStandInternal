import { Button, Image, majorScale, Pane, Text, TextInput } from "evergreen-ui";
import React from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Logo from "../resources/logo";
import FormInput from "../components/form/FormInput";
import FormButton from "../components/form/FormButton";
import Container from "../components/layout/Container";
import FormCheckBox from "../components/form/FormCheckBox";
import { BsInfoCircleFill } from "react-icons/bs";

import pallete from "../config/pallete";
import AppHeading from "../components/Typography/AppHeading";
import { Headline } from "../styles/types";

const SignupPage: NextPage = () => {
  return (
    <Container>
      <Head>
        <title>signup</title>
      </Head>
      <div className="mt-28  flex flex-col justify-center items-center sm:p-1 md:p-0 sm:w-full md:w-128">
        <Logo />
        <Pane
          display="flex"
          border="default"
          //   width={365}
          className="flex-col mt-5 mb-5 px-10 py-5 w-full bg-white"
          {...undefined}
        >
          <div className="mt-2 mb-2">
            <p className="text-base font-semibold text-N-900">Signup</p>
            <p className="text-sm text-left font-normal min-w-full  text-N-800">
              Don’t have an account yet?
              <span className="ml-1 text-B-500 cursor-pointer">
                Sign up free.
              </span>
            </p>
          </div>
          <div className="sm:grid sm:grid-cols-2 sm:gap-4">
            <FormInput label="First Name" labelSecondary={null} />
            <FormInput label="Last Name" labelSecondary={null} />
          </div>
          <FormInput label="Company Name" labelSecondary={null} />
          <FormInput label="Email" labelSecondary={null} />
          <FormInput label="Create Passowrd" labelSecondary={null} />
          <p className="text-sm font-normal text-N-800 flex flex-row">
            Are you an agency and want to turn on agency mode?
            {<BsInfoCircleFill size={20} className="ml-1" />}
          </p>
          <Pane className="flex flex-row space-x-5">
            <FormCheckBox label="No" checked={false} />
            <FormCheckBox label="Yes" checked={true} />
          </Pane>

          <FormButton text={"Sign in"} />
          <p className="text-xs text-center font-normal my-4 " color="#5A5F68">
            By clicking sign up, you agree to our{" "}
            <span className="text-B-500 mx-1 cursor-pointer">
              terms of service
            </span>
            and{" "}
            <span className="text-B-500 mx-1 cursor-pointer">
              privacy policy.
            </span>
          </p>
        </Pane>
      </div>
    </Container>
  );
};

export default SignupPage;
