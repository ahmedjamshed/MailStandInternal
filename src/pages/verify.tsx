import React, { useState } from "react";
import {
  Pane,
  Image,
  majorScale,
  Heading,
  Paragraph,
  Text,
  minorScale,
  toaster,
  Overlay,
  Spinner,
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
  resetApiKey,
  resetEmail,
  resetEmailVerification,
  resetResponseError,
  selectAuth,
  setStatus,
  User,
  verifyEmail,
  VerifyUser,
} from "../redux/signup/authSlice";
import AuthService from "../services/auth.service";
import { Router, useRouter } from "next/router";
import * as yup from "yup";

const VerifyPage: NextPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { email, status, verifiedEmail } = useAppSelector(selectAuth);

  const [code, setCode] = useState("");
  const [errors, setErrors] = useState<any>({});
  // validation schema
  let schema = yup.object().shape({
    code: yup.string().required().max(7).min(7),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | any) => {
    const value = e?.target?.value;
    console.log(value);
    setCode(value);

    setErrors({
      ...errors,
      ["code"]: "",
    });
  };
  const handleConfirmation = async () => {
    const error = await validationErrors();
    if (code && !error) {
      const verificationCode = {
        code: code,
      } as VerificationCode;
      try {
        await dispatch(VerifyUser(verificationCode)).unwrap();
        // await dispatch(User(accessToken)).unwrap();
      } catch (error) {}
    }
  };
  const handleResend = () => {
    dispatch(ResendVerification());
  };

  const validationErrors = async () => {
    setErrors({});
    let validationError = false;
    await schema
      .validate({ code }, { abortEarly: false, strict: false })
      .catch(function (err) {
        validationError = true;
        let errV: any = {};
        err.errors.forEach((err: any, index: number) => {
          errV[err.toString().split(" ")[0]] = err.replaceAll("_", " ");
        });
        setErrors(errV);
      });

    return validationError;
  };
  const isEnabled = yup
    .object()
    .shape({
      code: yup.string().trim().required(),
    })
    .isValidSync({ code });

  if (!email && !verifiedEmail) {
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
            <Text fontWeight="700">{email}.</Text> Please enter the code below
            to verify your account.
          </Paragraph>
          <Pane width="50%">
            <FormInput
              label={null}
              labelSecondary={null}
              name="code"
              onChange={handleChange}
              // color={pallete.blackDisable}
              textAlign="center"
              placeholder="XXX-XXX"
              maxLength="7"
            />
          </Pane>
          {errors?.code && (
            <span className="flex items-center text-justify font-medium tracking-wide text-red-500 text-xs  ml-1">
              *{" " + errors?.code}!
            </span>
          )}
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
            onClick={handleConfirmation}
            type="submit"
            text={"Confirm Code"}
            iconBefore={undefined}
            appereance="greenButton"
            disabled={!isEnabled}
          />
        </Pane>

        <FormButton
          onClick={async () => {
            try {
              await Promise.all([
                dispatch(resetEmail()),
                dispatch(resetEmailVerification()),
                dispatch(setStatus("idle")),
                dispatch(resetResponseError()),
                dispatch(resetApiKey()),
              ]);
              AuthService.logout();
              router.push("/login");
            } catch (error) {}
          }}
          text={"Sign out"}
          iconBefore={undefined}
          appereance="minimal"
          color={pallete.textGrey}
        />
      </Pane>
      <Overlay
        isShown={status === "loading" ? true : false}
        shouldCloseOnClick={false}
      >
        <Pane
          display="flex"
          alignItems="center"
          justifyContent="center"
          height="100vh"
        >
          <Spinner size={50} color={pallete.white} zIndex="1" opacity="1" />
        </Pane>
      </Overlay>
    </Container>
  );
};

export default VerifyPage;
