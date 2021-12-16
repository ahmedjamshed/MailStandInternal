// @ts-nocheck
import { defaultTheme } from "evergreen-ui";
import pallete from "./pallete";

export default {
  ...defaultTheme,
  fontWeights: {
    700: "700px",
    600: "600px",
    400: "400px",
    500: "500px",
  },
  components: {
    ...defaultTheme.components,
    colors: {
      ...pallete,
      ...defaultTheme.components.colors,
      border: {
        ...defaultTheme.components.border,
        default: "#D7D8DC",
      },
    },

    Button: {
      ...defaultTheme.components.Button,
      appearances: {
        ...defaultTheme.components.Button.appearances,
        primary: {
          color: "white",
          paddingX: 12,
          paddingY: 8,
          borderRadius: 5,
          backgroundColor: pallete.neutral,
          _hover: {
            backgroundColor: pallete.blackHover,
          },
          // _focus: {
          //   boxShadow: "0 0 0 2px lightcoral",
          // },
          _disabled: {
            backgroundColor: pallete.blackDisable,
            color: pallete.white,
          },
        },
        greenButton: {
          color: "white",
          paddingX: 12,
          paddingY: 8,
          borderRadius: 5,
          backgroundColor: pallete.greenNeutral,
          _hover: {
            backgroundColor: pallete.greenHover,
          },
          // _focus: {
          //   boxShadow: "0 0 0 2px lightcoral",
          // },
          _disabled: {
            backgroundColor: pallete.blackDisable,
            color: pallete.white,
          },
        },
      },
    },
    Checkbox: {
      ...defaultTheme.components.Checkbox,
      appearances: {
        default: {
          ...defaultTheme.components.Checkbox.appearances.default,
          color: "#303139",
        },
      },
    },
  },
};
