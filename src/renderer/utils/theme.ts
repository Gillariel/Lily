import Enum from "../models/enums"
import Theme from '../models/objects/theme'
import { Theme as MuiTheme } from "@material-ui/core";

export const getTheme = (themeString: string | null): MuiTheme => {
  if (themeString) {
    switch (themeString) {
      case Enum.THEME.DEFAULT: {
        return Theme.defaultTheme;
      }
      case Enum.THEME.PURPLE: {
        return Theme.purpleTheme;
      }
      default: {
        return Theme.defaultTheme;
      }
    }
  } else return Theme.defaultTheme;
}