import React from "react";
import { Pane, Image, majorScale, minorScale, Heading } from "evergreen-ui";
import type { NextPage } from "next";
import Head from "next/head";
import FormInput from "../components/form/FormInput";
import FormButton from "../components/form/FormButton";
import Container from "../components/layout/Container";
import { fontsizes } from "../config/typography";
import pallete from "../config/pallete";

const ForgotPasswordPage: NextPage = () => {
  return (
    <Container>
      <Head>
        <title>reset password</title>
      </Head>
      <Pane
        display="flex"
        justifyContent="center"
        flexDirection="column"
        alignItems="center"
        marginTop={majorScale(4)}
        className="w-full sm:w-106 md:w-106 lg:w-106"
      >
        <Image src="/images/logo_mailstand.svg" alt="Mailstand Logo" />

        <Heading
          size={500}
          fontSize={fontsizes.md[0]}
          fontWeight="600"
          lineHeight={fontsizes.md[1]}
          textAlign="center"
          marginTop={minorScale(4)}
          marginBottom={minorScale(4)}
          width="100%"
        >
          Forgot Your Password?
        </Heading>
        <Pane
          display="flex"
          border="default"
          flexDirection="column"
          paddingX={minorScale(8)}
          paddingY={minorScale(4)}
          className="w-full min-h-min"
          background={pallete.white}
        >
          <FormInput
            name="new_password"
            onChange={() => {}}
            label="New Password"
            labelSecondary={""}
          />
          <FormInput
            name="confirm_password"
            onChange={() => {}}
            label="Confirm Password"
            labelSecondary={""}
          />

          <FormButton
            onClick={() => {}}
            iconBefore={undefined}
            text={"Reset Password"}
            appereance="primary"
            marginBottom={minorScale(2)}
          />
        </Pane>
      </Pane>
    </Container>
  );
};

export default ForgotPasswordPage;
