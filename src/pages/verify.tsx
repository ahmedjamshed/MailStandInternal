import React, { useState } from "react";
import {
  Pane,
  Image,
  majorScale,
  Heading,
  Paragraph,
  Text,
  minorScale,
} from "evergreen-ui";
import type { NextPage } from "next";
import Head from "next/head";
import FormInput from "../components/form/FormInput";
import FormButton from "../components/form/FormButton";
import Container from "../components/layout/Container";
import AppHeading from "../components/Typography/AppHeading";
import { Headline, VerificationCode } from "../utils/types";
import pallete from "../config/pallete";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  ResendVerification,
  selectAuth,
  verifyEmail,
  VerifyUser,
} from "../redux/signup/authSlice";
import AuthService from "../services/auth.service";
import { Router, useRouter } from "next/router";

const VerifyPage: NextPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { email } = useAppSelector(selectAuth);

  const [code, setCode] = useState();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | any) => {
    const value = e?.target?.value;
    setCode(value);
  };
  const handleConfirmation = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("in confirmation");
    if (code) {
      const verificationCode = {
        code: code,
      } as VerificationCode;
      dispatch(VerifyUser(verificationCode));
    }
  };
  const handleResend = () => {
    dispatch(ResendVerification());
  };
  if (!email) {
    return <></>;
  }

  return (
    <Container>
      <Head>
        <title>Mailstand | Verify</title>
      </Head>
      <Pane
        display="flex"
        justifyContent="center"
        flexDirection="column"
        alignItems="center"
        marginTop={majorScale(8)}
        className="sm:p-1 md:p-0  sm:w-full md:w-106 lg:w-106"
        {...undefined}
      >
        <Image src="/images/logo_mailstand.svg" alt="Mailstand Logo" />
        <form onSubmit={handleConfirmation}>
          <Pane
            display="flex"
            justifyContent="center"
            alignItems="center"
            border="default"
            flexDirection="column"
            paddingTop={35}
            paddingLeft={35}
            paddingRight={35}
            paddingBottom={20}
            marginTop={35}
            background={pallete.white}
            className="w-full min-h-min"
            {...undefined}
            {...undefined}
          >
            <Heading
              size={500}
              fontSize="1rem"
              lineHeight="1.5rem"
              fontWeight="600"
              textAlign="center"
              color={pallete.neutral}
            >
              Please verify your email
            </Heading>
            <Paragraph
              size={300}
              fontWeight="400"
              fontSize="0.875rem"
              lineHeight="1.25rem"
              color={pallete.textGrey}
              marginTop={minorScale(4)}
              textAlign="center"
            >
              We just sent a verification code to{" "}
              <Text fontWeight="700">{email}</Text> Please enter the code below
              to verify your account.
            </Paragraph>
            <Pane width="50%">
              <FormInput
                label={null}
                labelSecondary={null}
                name="code"
                onChange={handleChange}
                color={pallete.blackDisable}
                textAlign="center"
                placeholder="XXX-XXX"
              />
            </Pane>
          </Pane>
          <Pane
            borderLeft="default"
            borderRight="default"
            borderBottom="default"
            background={pallete.white}
            paddingTop={minorScale(4)}
            paddingBottom={minorScale(4)}
            paddingX={minorScale(10)}
            className="w-full flex flex-col sm:flex sm:flex-row sm:justify-evenly"
          >
            <FormButton
              onClick={handleResend}
              text={"Resend email"}
              iconBefore={undefined}
              appereance="default"
              color={pallete.secondaryButton}
              intent="none"
              fontWeight="600"
            />
            <FormButton
              onClick={() => {}}
              type="submit"
              text={"Confirm Code"}
              iconBefore={undefined}
              appereance="greenButton"
            />
          </Pane>
        </form>
        <FormButton
          onClick={() => {
            AuthService.logout();
            router.push("/signup");
          }}
          text={"Sign out"}
          iconBefore={undefined}
          appereance="minimal"
          color={pallete.textGrey}
        />
      </Pane>
    </Container>
  );
};

export default VerifyPage;
