import { Button, Image, majorScale, Pane, Text, TextInput } from "evergreen-ui";
import React from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Logo from "../resources/logo";
import FormInput from "../components/form/FormInput";
import FormButton from "../components/form/FormButton";

const LoginPage: NextPage = () => {
  return (
    <div className="flex flex-col justify-center items-center mx-auto px-4">
      <Head>
        <title>login</title>
      </Head>
      <Pane
        display="flex"
        justifyContent="center"
        alignItems="center"
        className="mt-28 flex-col sm:p-1 md:p-0"
        {...undefined}
      >
        <Logo />
        <p className="mt-5 mb-5 text-base font-semibold text-N-900">
          Login to Mailstand
        </p>
        <Pane
          display="flex"
          border="default"
          //   width={365}
          className="flex-col px-10 py-10 sm:w-full md:w-96 bg-white"
          {...undefined}
        >
          <FormInput label="Email" labelSecondary={""} />
          <FormInput label="Password" labelSecondary="Forgot Password?" />
          <FormButton text={"Sign in"} />
        </Pane>
      </Pane>
      <Pane
        display="flex"
        border="default"
        className="flex-row justify-center px-5 py-5 sm:w-full md:w-96 mt-6 bg-white border-black"
        {...undefined}
      >
        <p className="text-sm font-normal min-w-full text-center text-N-800">
          Don’t have an account yet?
          <span className="ml-1 text-B-500 cursor-pointer">Sign up free.</span>
        </p>
      </Pane>
    </div>
  );
};

export default LoginPage;
