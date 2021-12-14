import React from "react";
import { Pane, majorScale } from "evergreen-ui";
import type { NextPage } from "next";
import Head from "next/head";
import FormInput from "../components/form/FormInput";
import FormButton from "../components/form/FormButton";
import Container from "../components/layout/Container";
import { Paragraph } from "../utils/types";
import AppParagraph from "../components/Typography/AppParagraph";
import Link from "next/link";
import Image from "next/image";

const LoginPage: NextPage = () => {
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
        marginTop={majorScale(8)}
        className="sm:p-1 md:p-0"
        {...undefined}
      >
        <Image
          src="/images/logo_mailstand.svg"
          alt="Mailstand Logo"
          width={30}
          height={24.4}
        />

        <p className="mt-5 mb-5 text-H_500 font-semibold text-N-900">
          Login to Mailstand
        </p>
        <Pane
          display="flex"
          border="default"
          //   width={365}
          className="flex-col px-10 py-10 sm:w-full md:w-96 bg-white"
          {...undefined}
        >
          <FormInput
            name="email"
            onChange={() => {}}
            label="Email"
            labelSecondary={""}
          />
          <FormInput
            name="password"
            onChange={() => {}}
            label="Password"
            labelSecondary="Forgot Password?"
          />
          <FormButton
            text={"Sign in"}
            onClick={() => {}}
            iconBefore={undefined}
          />
        </Pane>
      </Pane>
      <Pane
        display="flex"
        border="default"
        className="flex-row justify-center px-5 py-5 sm:w-full md:w-96 mt-6 bg-white border-black"
        {...undefined}
      >
        <div className="flex flex-row flex-wrap justify-center">
          <AppParagraph
            paragraphType={Paragraph.P200}
            text="Already have an account?"
            rest={["text-N-800 text-center"]}
          />
          <Link href="/signup">
            <a className="ml-0 md:ml-1  text-sm text-B-500 cursor-pointer">
              Sign in.
            </a>
          </Link>
        </div>
      </Pane>
    </Container>
  );
};

export default LoginPage;
