import { Image, Pane } from "evergreen-ui";
import React from "react";
import type { NextPage } from "next";
import Head from "next/head";
import FormInput from "../components/form/FormInput";
import FormButton from "../components/form/FormButton";
import Container from "../components/layout/Container";
import FormCheckBox from "../components/form/FormCheckBox";
import { BsInfoCircleFill } from "react-icons/bs";
import AppHeading from "../components/Typography/AppHeading";
import { Headline, Paragraph } from "../utils/types";
import AppParagraph from "../components/Typography/AppParagraph";
import Link from "next/link";

const SignupPage: NextPage = () => {
  return (
    <Container>
      <Head>
        <title>signup</title>
      </Head>
      <div className="mt-28  flex flex-col justify-center items-center  sm:p-1 md:p-0  sm:w-full md:w-128 lg:w-128">
        <Image src="/images/logo_mailstand.svg" alt="Mailstand Logo" />

        <Pane
          display="flex"
          border="default"
          //   width={365}
          className="flex-col mt-5 mb-5 px-10 py-5 w-full bg-white"
          {...undefined}
        >
          <div className="mt-2 mb-2">
            <p className="text-H_700  font-semibold text-N-900">Signup</p>
            <div className="flex flex-row flex-wrap">
              <AppParagraph
                paragraphType={Paragraph.P200}
                text="Already have an account?"
                rest={["text-N-800"]}
              />
              <Link href="/login">
                <a className="ml-0 md:ml-1  text-sm text-B-500 cursor-pointer">
                  Sign in.
                </a>
              </Link>
            </div>
          </div>
          <div className="sm:grid sm:grid-cols-2 sm:gap-4">
            <FormInput label="First Name" labelSecondary={null} />
            <FormInput label="Last Name" labelSecondary={null} />
          </div>
          <FormInput label="Company Name" labelSecondary={null} />
          <FormInput label="Email" labelSecondary={null} />
          <FormInput label="Create Passowrd" labelSecondary={null} />
          <div className="flex flex-row flex-wrap">
            <AppHeading
              headingType={Headline.H400}
              text="Are you an agency and want to turn on agency mode?"
              rest={["text-N-800"]}
            />
            <BsInfoCircleFill size={20} className="ml-1 text-N-900" />
          </div>
          <Pane className="flex flex-row space-x-5">
            <FormCheckBox label="No" checked={false} />
            <FormCheckBox label="Yes" checked={true} />
          </Pane>

          <FormButton text={"Sign in"} iconBefore={undefined} />
          <div className="flex flex-row flex-wrap justify-center align-middle items-center">
            <AppParagraph
              paragraphType={Paragraph.P100}
              text="By clicking sign up, you agree to our"
              rest={["text-center my-4"]}
            />
            <Link href="">
              <a className="ml-1  text-xs text-B-500 cursor-pointer">
                terms of service
              </a>
            </Link>
            <AppParagraph
              paragraphType={Paragraph.P100}
              text="and"
              rest={["ml-1"]}
            />
            <Link href="">
              <a className="ml-1  text-xs text-B-500 cursor-pointer">
                privacy policy.
              </a>
            </Link>
          </div>
        </Pane>
      </div>
    </Container>
  );
};

export default SignupPage;
