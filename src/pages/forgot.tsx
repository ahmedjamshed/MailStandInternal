import { Pane } from "evergreen-ui";
import React from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Logo from "../resources/logo";
import FormInput from "../components/form/FormInput";
import FormButton from "../components/form/FormButton";
import Container from "../components/layout/Container";

const ForgotPasswordPage: NextPage = () => {
  return (
    <Container>
      <Head>
        <title>forgot password</title>
      </Head>
      <Pane
        display="flex"
        justifyContent="center"
        alignItems="center"
        className="mt-28 flex-col sm:p-1 md:p-0"
        {...undefined}
      >
        <Logo />
        <p className="mt-5 mb-5 text-H_500 font-semibold text-N-900">
          Forgot Your Password?
        </p>
        <Pane
          display="flex"
          border="default"
          //   width={365}
          className="flex-col px-10 py-10 sm:w-full md:w-96 bg-white"
          {...undefined}
        >
          <FormInput label="Email" labelSecondary={""} />
          <FormButton text={"Send Reset Passcode"} />
        </Pane>
      </Pane>
    </Container>
  );
};

export default ForgotPasswordPage;
