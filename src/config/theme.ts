// @ts-nocheck
import {  defaultTheme } from "evergreen-ui";
import pallete from "./pallete";

export default {
    ...defaultTheme,
    components: {
      ...defaultTheme.components,
      colors: {
        ...defaultTheme.components.colors,
        border: {
            ...defaultTheme.components.border,
            default: '#D7D8DC'
          }
      },
      Button: {
        ...defaultTheme.components.Button,
        appearances: {
          superdanger: {
            color: 'white',
            paddingX: 12,
            paddingY: 8,
            borderRadius: 5,
            backgroundColor: pallete.neutral,
            _hover: {
              backgroundColor: 'gray',
            },
            _focus: {
              boxShadow: '0 0 0 2px lightcoral',
            },
          },
        },
      },
    },
  }