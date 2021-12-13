import {
  AddIcon,
  Button,
  Heading,
  Image,
  majorScale,
  Pane,
  useTheme,
} from "evergreen-ui";
import React from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Container from "../components/layout/Container";
import pallete from "../config/pallete";
import AppHeading from "../components/Typography/AppHeading";
import { Headline, Paragraph } from "../utils/types";
import AppParagraph from "../components/Typography/AppParagraph";
import FormButton from "../components/form/FormButton";
import Counter from "../components/counter/Counter";

const IndexPage: NextPage = () => {
  return (
    <div>
      <Head>
        <title>MailStand</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <Head>
          <title>Workspaces</title>
          <meta name="description" content="" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="mt-28  flex flex-col justify-center items-center  sm:p-1 md:p-0  sm:w-full md:w-128 lg:w-128">
          <Image src="/images/logo_mailstand.svg" alt="Mailstand Logo" />
          <Pane
            display="flex"
            className="flex-col justify-center items-center mt-8 mb-5 px-10 py-5 w-full"
            {...undefined}
          >
            <Image src="/images/workspace_banner.svg" alt="Workspaces Banner" />
            <AppHeading
              text="Create your first client workspace"
              rest={["text-center  mt-8"]}
              headingType={Headline.H500}
            />
            <Pane display={"flex"} justifyContent={"center"}>
              <AppParagraph
                text="Workspaces are areas that separate your clients. All cold email
              campaigns, contacts and campaign settings are separated and never
              overlap between clients."
                rest={["text-center font-normal text-N-800 mt-4"]}
                paragraphType={Paragraph.P200}
              />
            </Pane>
            <Pane textAlign={"center"} marginTop={majorScale(3)}>
              <FormButton text="Add workspace" iconBefore={AddIcon} />
            </Pane>
          </Pane>
        </div>
      </Container>
    </div>
  );
};

export default IndexPage;
