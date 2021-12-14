// @ts-nocheck
import { defaultTheme } from "evergreen-ui";
import pallete from "./pallete";

export default {
  ...defaultTheme,
  fontWeights: {
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
        superdanger: {
          color: "white",
          paddingX: 12,
          paddingY: 8,
          borderRadius: 5,
          backgroundColor: pallete.neutral,
          _hover: {
            backgroundColor: "gray",
          },
          _focus: {
            boxShadow: "0 0 0 2px lightcoral",
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
