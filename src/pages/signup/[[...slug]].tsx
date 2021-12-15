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
  Tooltip,
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
import { agency_mode, BasicAuthHeader, TeammateUser } from "../../utils/types";
import {
  signupUser,
  selectAuth,
  resetResponseError,
  setStatus,
  User,
  resetEmail,
} from "../../redux/signup/authSlice";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { InfoSignIcon } from "evergreen-ui";
import { useRouter } from "next/router";
import { toaster } from "evergreen-ui";
import { selectUser } from "../../redux/signup/userSlice";
import authToken from "../../services/token";
import * as yup from "yup";
const SignupPage: NextPage = (props) => {
  const router = useRouter();
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const dispatch = useAppDispatch();
  const { api_key, status, verifiedEmail, email, responseError } =
    useAppSelector(selectAuth);
  const { user } = useAppSelector(selectUser);
  const [checked, setChecked] = useState<agency_mode>({
    yes: true,
    No: false,
  });
  const [inputs, setInputs] = useState<TeammateUser | any>({
    first_name: "",
    last_name: "",
    company_name: "",
    email: "",
    password: "",
    timezone: timezone,
    agency_mode: checked.yes,
    team_invite: null,
    referred_by: null,
  });
  let schema = yup.object().shape({
    first_name: yup.string().required().min(3),
    last_name: yup.string().required().min(3),
    company_name: yup.string().required().min(3),
    email: yup.string().required().email(),
    password: yup.string().required().min(3),
    timezone: yup.string().required().min(3),
    agency_mode: yup.boolean().required(),
    team_invite: yup.string().nullable(),
    referred_by: yup.string().nullable(),
  });
  const loadUserIfSaved = async () => {
    if (authToken()?.api_key) {
      const accessToken = {
        username: authToken()?.api_key,
        password: "",
      } as BasicAuthHeader;
      try {
        const response = await dispatch(User(accessToken)).unwrap();
        if (!verifiedEmail) {
          router.push("/verify");
          dispatch(setStatus("idle"));
          dispatch(resetResponseError());
        }
      } catch (error) {
        // toaster.danger("something went wrong");
      }
    }
  };
  useEffect(() => {
    loadUserIfSaved();
  }, []);
  useEffect(() => {
    setInputs({
      ...inputs,
      team_invite: router.query.slug?.[0] ?? null,
      referred_by: router.query["code"] ?? null,
    });
    // window.addEventListener("keyup", handleSubmit);
    // return () => {
    //   window.removeEventListener("keyup", handleSubmit);
    // };
  }, [router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // const accessToken = {
    //   username: authToken()?.api_key,
    //   password: "",
    // } as BasicAuthHeader;
    // dispatch(User(accessToken));

    let error = false;
    await schema.validate(inputs).catch(function (err) {
      console.log("inside", err);
      error = true;
      toaster.danger(err.errors[0].replaceAll("_", " "));
    });
    if (!error) {
      try {
        const response = await dispatch(signupUser(inputs)).unwrap();

        router.push("/verify");
        dispatch(setStatus("idle"));
        dispatch(resetResponseError());
      } catch (err) {
        console.log(err);
      }
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | any) => {
    const name = e?.target?.name;
    const value = e?.target?.value;
    setInputs({ ...inputs, [name]: value });
  };
  return (
    <Container>
      <Head>
        <title>Mailstand | Sign Up</title>
      </Head>
      <Pane
        display="flex"
        justifyContent="center"
        flexDirection="column"
        alignItems="center"
        marginTop={majorScale(4)}
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
          paddingTop={minorScale(8)}
          paddingLeft={minorScale(8)}
          paddingRight={minorScale(8)}
          paddingBottom={minorScale(6)}
          marginTop={minorScale(8)}
          background={pallete.white}
          className="w-full min-h-min"
        >
          <Pane>
            <Heading size={700} fontSize="1.25rem" fontWeight="bold">
              Sign up
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
          <form onSubmit={handleSubmit}>
            <Pane className="sm:grid sm:grid-cols-2 sm:gap-4">
              <FormInput
                name={"first_name"}
                onChange={handleChange}
                label="First name"
                labelSecondary={null}
              />
              <FormInput
                name="last_name"
                onChange={handleChange}
                label="Last name"
                labelSecondary={null}
              />
            </Pane>
            <FormInput
              name="company_name"
              onChange={handleChange}
              label="Company name"
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
              label="Create password"
              labelSecondary={null}
              type="password"
            />

            <Pane
              marginTop={minorScale(2)}
              display="flex"
              flexDirection="row"
              alignItems="center"
              flexWrap="wrap"
              justifyContent="start"
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
              <Tooltip content="Agency mode allows you to separate your clients into completely separate environments/sections. This will allow you to have one dashboard for your clients separate contacts, campaigns and settings and for full data safety.">
                <InfoSignIcon
                  size={13}
                  color="secondaryButton"
                  marginLeft={minorScale(2)}
                />
              </Tooltip>
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
              onClick={() => {}}
              text={"Sign up"}
              iconBefore={undefined}
              appereance="superdanger"
              type="submit"
              width="100%"
              isLoading={status === "loading" ? true : false}
              disabled={status === "loading" ? true : false}
            />
          </form>
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
