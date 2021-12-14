import React from "react";
import { Pane, Image } from "evergreen-ui";
import type { NextPage } from "next";
import Head from "next/head";
import FormInput from "../components/form/FormInput";
import FormButton from "../components/form/FormButton";
import Container from "../components/layout/Container";
import AppHeading from "../components/Typography/AppHeading";
import { Headline } from "../utils/types";
import pallete from "../config/pallete";

const VerifyPage: NextPage = () => {
  return (
    <Container>
      <Head>
        <title>verify</title>
      </Head>
      <Pane
        display="flex"
        justifyContent="center"
        alignItems="center"
        className="mt-28 flex-col sm:p-1 md:p-0"
        {...undefined}
      >
        <Image src="/images/logo_mailstand.svg" alt="Mailstand Logo" />

        <Pane
          display="flex"
          border="default"
          className="flex-col  mt-5 px-10 py-10 sm:w-full md:w-96 bg-white"
          {...undefined}
        >
          <AppHeading
            text="Please verify your email"
            headingType={Headline.H500}
            rest="text-center text-N-900"
          />

          <p
            className="text-sm font-normal text-center mt-2"
            color={pallete.textGrey}
          >
            We just sent a verification code to joe.smith@gmail.com. Please
            enter the code below to verify your account.
          </p>
        </Pane>
      </Pane>
    </Container>
  );
};

export default VerifyPage;
