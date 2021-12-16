import React, { useEffect, useState } from "react";
import {
  Pane,
  majorScale,
  Heading,
  Paragraph,
  minorScale,
  Text,
  toaster,
  Link as ELink,
  Overlay,
  Spinner,
} from "evergreen-ui";
import type { NextPage } from "next";
import Head from "next/head";
import FormInput from "../components/form/FormInput";
import FormButton from "../components/form/FormButton";
import Container from "../components/layout/Container";
import { BasicAuthHeader, LoginInputs } from "../utils/types";

import Link from "next/link";
import Image from "next/image";
import pallete from "../config/pallete";

import * as yup from "yup";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { loginUser, selectAuth, User } from "../redux/signup/authSlice";
import { useRouter } from "next/router";
import authToken from "../services/token";

const LoginPage: NextPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { api_key, status, verifiedEmail, email, responseError } =
    useAppSelector(selectAuth);
  const [inputs, setInputs] = useState<LoginInputs>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<any>({});
  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | any) => {
    const name = e?.target?.name;
    const value = e?.target?.value;
    setErrors({
      ...errors,
      [name]: "",
    });
    setInputs({ ...inputs, [name]: value });
  };
  let schema = yup.object().shape({
    email: yup.string().required().email(),
    password: yup.string().required().min(7),
  });
  const validationErrors = async () => {
    setErrors({});
    let validationError = false;
    await schema
      .validate(inputs, { abortEarly: false, strict: false })
      .catch(function (err) {
        validationError = true;
        let errV: any = {};
        err.errors.forEach((err: any, index: number) => {
          errV[err.toString().split(" ")[0]] = err;
        });
        setErrors(errV);
      });

    return validationError;
  };
  const loadUserIfSaved = async () => {
    if (authToken()?.api_key) {
      const accessToken = {
        username: authToken()?.api_key,
        password: "",
      } as BasicAuthHeader;
      try {
        const user = await dispatch(User(accessToken)).unwrap();
        if (!user.views?.verified_email) {
          router.push("/verify");
        } else {
          router.push("/");
        }
      } catch (error) {
        // toaster.danger("something went wrong");
      }
    }
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const error = await validationErrors();

    if (!error) {
      try {
        const response = await dispatch(loginUser(inputs)).unwrap();
        if (response) {
          const accessToken = {
            username: response,
            password: "",
          } as BasicAuthHeader;
          const user = await dispatch(User(accessToken)).unwrap();
          if (!user.views?.verified_email) {
            router.push("/verify");
          } else {
            router.push("/");
          }
        }
      } catch (err: Error | any) {
        toaster.danger(err?.message);
      }
    }
  };
  const isEnabled = yup
    .object()
    .shape({
      email: yup.string().trim().required(),
      password: yup.string().required(),
    })
    .isValidSync(inputs);

  useEffect(() => {
    loadUserIfSaved();
  }, []);
  return (
    <Container>
      <Head>
        <title>login</title>
      </Head>
      <Pane
        display="flex"
        justifyContent="center"
        flexDirection="column"
        alignItems="center"
        marginTop={majorScale(4)}
        className="w-full sm:w-106 md:w-106 lg:w-106"
      >
        <Image
          src="/images/logo_mailstand.svg"
          alt="Mailstand Logo"
          width={30}
          height={24.4}
        />

        <Heading
          size={500}
          fontSize="1rem"
          fontWeight="600"
          lineHeight="1.5rem"
          textAlign="center"
          marginTop={minorScale(4)}
          marginBottom={minorScale(4)}
          width="100%"
        >
          Login to Mailstand
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
            <FormInput
              name="password"
              onChange={handleChange}
              label="Password"
              labelSecondary="Forgot password?"
              type="password"
              error={errors?.password}
            />
            <FormButton
              appereance="primary"
              text={"Sign in"}
              onClick={() => {}}
              iconBefore={undefined}
              marginBottom={minorScale(4)}
              type="submit"
              width="100%"
              disabled={!isEnabled}
            />
          </form>
        </Pane>
        <Pane
          display="flex"
          border="default"
          flexDirection="column"
          marginTop={minorScale(4)}
          paddingX={minorScale(8)}
          paddingY={minorScale(6)}
          className="w-full"
          background={pallete.white}
        >
          <Paragraph
            fontSize={"0.875rem"}
            lineHeight="1.25rem"
            fontWeight="400"
            color={pallete.N_800}
            textAlign="center"
          >
            Don’t have an account yet?{" "}
            <Link href="/signup">
              <ELink cursor="pointer" color={pallete.hoverBlue}>
                Sign up free.
              </ELink>
            </Link>
          </Paragraph>
        </Pane>
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

export default LoginPage;
