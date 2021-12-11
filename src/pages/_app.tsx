import { Provider } from "react-redux";
import type { AppProps } from "next/app";
import "tailwindcss/tailwind.css";
import "../styles/globals.css";
import store from "../app/store";
import theme from "../config/theme"
import { ThemeProvider } from "evergreen-ui";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (

    <Provider store={store}>
      <ThemeProvider value={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
}
