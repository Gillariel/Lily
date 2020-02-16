import { createMuiTheme } from "@material-ui/core";

declare module '@material-ui/core/styles/createMuiTheme' {
  interface Theme {
    // for custom property
  }
  interface ThemeOptions {
    // for custom property
  }
}

const defaultTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#29b6f6",
      light: "#73e8ff",
      dark: "#0086c3"
    },
    secondary: {
      main: "#1565c0",
      light: "#5e92f3",
      dark: "#003c8f"
    },
    text: {
      primary: "#000000",
      secondary: "#ffffff"
    },
    action: {
      active: "#29b6f6",
      disabled: "#29b6f6",
      disabledBackground: "#29b6f6",
      hover: "#73e8ff",
      hoverOpacity: 50,
      selected: "#73e8ff"
    },
    contrastThreshold: 50,
    getContrastText: () => "Contrast text",
    error: { 
      main: "red",
      contrastText: "Contrast text",
      dark: "dark",
      light: "light"
    },
    info: { 
      main: "lightblue",
      contrastText: "Contrast text",
      dark: "dark",
      light: "light"
    },
    success: { 
      main: "green",
      contrastText: "Contrast text",
      dark: "dark",
      light: "light"
    },
    warning: {
      main: "orange",
      contrastText: "Contrast text",
      dark: "dark",
      light: "light"
    },
    tonalOffset: 50,
    background: {
      default: "#ffffff",
      paper: "#lightgrey"
    },
    common: {
      black: "#000000",
      white: "#ffffff"
    },
    type: "light"
  },
});

const purpleTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#aa00ff",
      light: "#e254ff",
      dark: "#7200ca"
    },
    secondary: {
      main: "#8e24aa",
      light: "#c158dc",
      dark: "#5c007a"
    },
    text: {
      primary: "#ffffff",
      secondary: "#ffffff"
    },
    action: { }
  },
});

export default {
  defaultTheme, purpleTheme
}