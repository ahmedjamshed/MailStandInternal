import {
  Pane,
  Image,
  minorScale,
  majorScale,
  Heading,
  toaster,
  Spinner,
  Overlay,
} from "evergreen-ui";
import React, { useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import FormInput from "../components/form/FormInput";
import FormButton from "../components/form/FormButton";
import Container from "../components/layout/Container";
import { fontsizes } from "../config/typography";
import pallete from "../config/pallete";
import * as yup from "yup";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { Forgot, selectAuth } from "../redux/signup/authSlice";
import ProcessingOverlay from "../components/layout/processingOverlay";
import { useRouter } from "next/router";

const ForgotPasswordPage: NextPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { status } = useAppSelector(selectAuth);
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<any>({});
  // validation schema
  let schema = yup.object().shape({
    email: yup.string().required().email(),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | any) => {
    const value = e?.target?.value;
    setEmail(value);
    setErrors({
      ...errors,
      ["email"]: "",
    });
  };

  const validationErrors = async () => {
    setErrors({});
    let validationError = false;
    await schema
      .validate({ email }, { abortEarly: false, strict: false })
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const error = await validationErrors();
    if (!error) {
      try {
        const message = await dispatch(Forgot(email)).unwrap();
        toaster.success(message);
        router.push("/reset");
      } catch (error) {}
    }
  };
  const isEnabled = yup
    .object()
    .shape({
      email: yup.string().trim().required(),
    })
    .isValidSync({ email });
  return (
    <Container>
      <Head>
        <title>Mailstand | Forgot Password</title>
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
          <form onSubmit={handleSubmit}>
            <FormInput
              name="email"
              onChange={handleChange}
              label="Email"
              labelSecondary={""}
              error={errors?.email}
            />
            <FormButton
              onClick={() => {}}
              text={"Send Reset Passcode"}
              iconBefore={undefined}
              appereance="primary"
              marginBottom={minorScale(2)}
              type="submit"
              width="100%"
              disabled={!isEnabled}
            />
          </form>
        </Pane>
      </Pane>
      <ProcessingOverlay status={status === "loading" ? true : false} />
    </Container>
  );
};

export default ForgotPasswordPage;
