import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  resetApiKey,
  resetEmail,
  resetEmailVerification,
  resetResponseError,
  selectAuth,
  setStatus,
  User,
} from "../../redux/signup/authSlice";
import authToken from "../../services/token";
import { BasicAuthHeader } from "../../utils/types";

function RouteGuard({ children }: any) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { api_key, verifiedEmail, status, agencyMode, email } =
    useAppSelector(selectAuth);
  const [authorized, setAuthorized] = useState(false);
  // console.log(api_key, email, status, verifiedEmail, agencyMode);

  useEffect(() => {
    const hideContent = () => {
      // console.log("resetting");
      setAuthorized(false);
    };
    if (status !== "loading" && status !== "failed") {
      // console.log("auth check");
      authCheck(router.asPath);
      // on route change start - hide page content by setting authorized to false

      router.events.on("routeChangeStart", hideContent);
      // on route change complete - run auth check
      // console.log("auth check on change complete");
      router.events.on("routeChangeComplete", authCheck);
      return () => {
        router.events.off("routeChangeStart", hideContent);
        console.log("exit event");
        router.events.off("routeChangeComplete", authCheck);
      };
    }

    // unsubscribe from events in useEffect return function
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadUserIfSaved = async () => {
    console.log(authToken()?.api_key);
    if (authToken()?.api_key) {
      console.log("getting new user");
      const accessToken = {
        username: authToken()?.api_key,
        password: "",
      } as BasicAuthHeader;
      try {
        const user = await dispatch(User(accessToken)).unwrap();
      } catch (error) {}
    }
    return;
  };

  async function authCheck(url: string) {
    if (!api_key && !email && status !== "loading") {
      console.log(api_key, email, status);
      // await loadUserIfSaved();
    }
    const publicPaths = ["/login", "/signup", "/forgot", "/reset"];
    console.log(url);
    const path = url.split("?")[0];
    console.log(
      path,
      api_key,
      email,
      status,
      verifiedEmail,
      agencyMode,
      publicPaths.includes("/login")
    );
    // working on it
    // if (
    //   api_key && //false
    //   email && // false
    //   verifiedEmail &&
    //   agencyMode &&
    //   publicPaths.includes(path)
    // ) {
    //   console.log("displaying current", path, "");
    //   setAuthorized(true);
    // } else {
    //   if (path === "/verify") {
    //     console.log("its confidential but authenticated", path);
    //     if (email && !verifiedEmail) {
    //       console.log("email and verified", email, verifiedEmail);
    //       setAuthorized(true);
    //     } else {
    //       setAuthorized(false);
    //       router.push("/login");
    //     }
    //   }
    //   console.log("its confidential", path, "redirectiong to  login");
    //   setAuthorized(false);
    //   router.push("/login");
    // }
  }

  return authorized && children;
}

export default RouteGuard;
