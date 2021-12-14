import {
  Image,
  Pane,
  useTheme,
  Text,
  Heading,
  Paragraph,
  Link as ELink,
  majorScale,
  minorScale,
} from "evergreen-ui";
import React, { useEffect, useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import FormInput from "../../components/form/FormInput";
import FormButton from "../../components/form/FormButton";
import Container from "../../components/layout/Container";
import FormCheckBox from "../../components/form/FormCheckBox";
import Link from "next/link";
import pallete from "../../config/pallete";
import { agency_mode, TeammateUser } from "../../utils/types";
import { signupUser, selectUser } from "../../redux/signup/userSlice";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { InfoSignIcon } from "evergreen-ui";
import { useRouter } from "next/router";

const SignupPage: NextPage = (props) => {
  const router = useRouter();
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const dispatch = useAppDispatch();
  const { api_key, status } = useAppSelector(selectUser);
  const [checked, setChecked] = useState<agency_mode>({
    yes: true,
    No: false,
  });
  const [inputs, setInputs] = useState<TeammateUser | any>({
    first_name: null,
    last_name: null,
    company_name: null,
    email: null,
    password: null,
    timezone: timezone,
    agency_mode: checked.yes,
    team_invite: router.query.slug?.[0],
    referred_by: router.query["code"],
  });

  useEffect(() => {
    setInputs({
      team_invite: router.query.slug?.[0],
      referred_by: router.query["code"],
    });
  }, [router]);

  const handleSubmit = () => {
    dispatch(signupUser(inputs));
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | any) => {
    const name = e?.target?.name;
    const value = e?.target?.value;
    setInputs({ ...inputs, [name]: value });
  };
  return (
    <Container>
      <Head>
        <title>signup</title>
      </Head>
      <Pane
        display="flex"
        justifyContent="center"
        flexDirection="column"
        alignItems="center"
        marginTop={majorScale(8)}
        className="sm:p-1 md:p-0  sm:w-full md:w-128 lg:w-128;"
      >
        <Image
          src="/images/logo_mailstand.svg"
          alt="Mailstand Logo"
          width={30}
          height={24.4}
        />
        <Pane
          display="flex"
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
        >
          <Pane>
            <Heading size={700} fontSize="1.25rem" fontWeight="bold">
              Signup
            </Heading>
            <Pane
              display="flex"
              flexDirection={"row"}
              flexWrap="wrap"
              paddingTop={minorScale(2)}
              alignItems="center"
            >
              <Paragraph
                size={400}
                fontWeight={400}
                fontSize={".876rem"}
                lineHeight={"1.25rem"}
                color={pallete.textGrey}
              >
                Already have an account?
              </Paragraph>
              <Link href="/login">
                <ELink
                  size={400}
                  fontSize={".876rem"}
                  color={pallete.hoverBlue}
                  marginLeft={minorScale(1)}
                  cursor="pointer"
                >
                  {"Sign in."}
                </ELink>
              </Link>
            </Pane>
          </Pane>
          <Pane className="sm:grid sm:grid-cols-2 sm:gap-4">
            <FormInput
              name={"first_name"}
              onChange={handleChange}
              label="First Name"
              labelSecondary={null}
            />
            <FormInput
              name="last_name"
              onChange={handleChange}
              label="Last Name"
              labelSecondary={null}
            />
          </Pane>
          <FormInput
            name="company_name"
            onChange={handleChange}
            label="Company Name"
            labelSecondary={null}
          />
          <FormInput
            name="email"
            onChange={handleChange}
            label="Email"
            labelSecondary={null}
          />
          <FormInput
            name="password"
            onChange={handleChange}
            label="Create Passowrd"
            labelSecondary={null}
          />

          <Pane
            display="flex"
            flexDirection="row"
            alignItems="center"
            flexWrap="wrap"
            justifyContent="center"
          >
            <Text
              size={400}
              fontWeight="500"
              fontSize={".875rem"}
              lineHeight={"1.5rem"}
              color={pallete.N_800}
              textAlign="justify"
            >
              Are you an agency and want to turn on agency mode?
            </Text>
            <InfoSignIcon color="secondaryButton" marginLeft={minorScale(2)} />
          </Pane>
          <Pane display="flex" flexDirection="row" className="space-x-5">
            <FormCheckBox
              onChange={(e) => {
                setChecked({ ["yes"]: false, ["No"]: true });
                setInputs({
                  ...inputs,
                  ["agency_mode"]: false,
                });
              }}
              label="No"
              checked={checked.No}
            />
            <FormCheckBox
              onChange={(e) => {
                setChecked({ ["yes"]: true, ["No"]: false });

                setInputs({
                  ...inputs,
                  ["agency_mode"]: true,
                });
              }}
              label="Yes"
              checked={checked.yes}
            />
          </Pane>

          <FormButton
            onClick={handleSubmit}
            text={"Sign up"}
            iconBefore={undefined}
          />
          <Pane
            display="flex"
            flexDirection="row"
            flexWrap="wrap"
            justifyContent="center"
            alignItems="center"
            marginTop={minorScale(4)}
          >
            <Paragraph
              fontSize={"0.75rem"}
              lineHeight="1rem"
              fontWeight="normal"
              color={pallete.textGrey}
            >
              By clicking sign up, you agree to our
            </Paragraph>
            <Link href="">
              <ELink
                size={400}
                fontSize={".75rem"}
                lineHeight="1rem"
                fontWeight="normal"
                color={pallete.hoverBlue}
                marginLeft={minorScale(1)}
                cursor="pointer"
              >
                {"terms of service"}
              </ELink>
            </Link>
            <Paragraph
              fontSize={"0.75rem"}
              lineHeight="1rem"
              fontWeight="normal"
              color={pallete.textGrey}
              marginLeft={minorScale(1)}
            >
              and
            </Paragraph>
            <Link href="">
              <ELink
                size={400}
                fontSize={"0.75rem"}
                fontWeight="normal"
                lineHeight="1rem"
                color={pallete.hoverBlue}
                marginLeft={minorScale(1)}
                cursor="pointer"
              >
                {"privacy policy"}
              </ELink>
            </Link>
          </Pane>
        </Pane>
      </Pane>
    </Container>
  );
};

export default SignupPage;
