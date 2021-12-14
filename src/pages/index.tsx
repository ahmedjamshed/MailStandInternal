import {
  AddIcon,
  Button,
  Heading,
  Image,
  majorScale,
  minorScale,
  Pane,
  useTheme,
  Paragraph,
} from "evergreen-ui";
import React from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Container from "../components/layout/Container";
import pallete from "../config/pallete";
import AppHeading from "../components/Typography/AppHeading";
// import { Headline, Paragraph } from "../utils/types";
// import AppParagraph as p from "../components/Typography/AppParagraph";
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
        <Pane className="mt-11  flex flex-col justify-center items-center  sm:p-1 md:p-0  sm:w-full md:w-146 lg:w-146">
          <Image src="/images/logo_mailstand.svg" alt="Mailstand Logo" />
          <Pane
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            marginTop={majorScale(8)}
            width="100%"
            {...undefined}
          >
            <Image src="/images/workspace_banner.svg" alt="Workspaces Banner" />
            <Heading
              size={400}
              fontSize="1rem"
              fontWeight="600"
              lineHeight="1.5rem"
              marginTop={minorScale(8)}
              marginBottom={minorScale(4)}
            >
              Create your first client workspace
            </Heading>
            <Pane display={"flex"} justifyContent={"center"}>
              <Paragraph
                textAlign="center"
                fontSize="0.875rem"
                lineHeight="1.25rem"
                fontWeight="400"
                color={pallete.textGrey}
              >
                Workspaces are areas that separate your clients. All cold email
                campaigns, contacts and campaign settings are separated and
                never overlap between clients.
              </Paragraph>
              {/* <AppParagraph
                text="Workspaces are areas that separate your clients. All cold email
              campaigns, contacts and campaign settings are separated and never
              overlap between clients."
                rest={["text-center font-normal text-textGrey mt-4"]}
                paragraphType={Paragraph.P200}
              /> */}
            </Pane>
            <Pane textAlign={"center"} marginTop={majorScale(3)}>
              <FormButton
                onClick={() => {}}
                text="Add workspace"
                iconBefore={AddIcon}
              />
            </Pane>
          </Pane>
        </Pane>
      </Container>
    </div>
  );
};

export default IndexPage;
