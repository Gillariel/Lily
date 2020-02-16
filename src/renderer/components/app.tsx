import * as React from 'react';
import { ThemeProvider, Theme } from '@material-ui/core';
import { getTheme } from '../utils/theme';
import Drawer from './navigation/drawer';

const App = () => {
  const [theme, setTheme] = React.useState<Theme>();

  React.useEffect(() => {
    var lsTheme = localStorage.getItem("theme");
    setTheme(getTheme(lsTheme));
  }, [])

  const changeTheme = () => {
    var lsTheme = localStorage.getItem("theme");
    setTheme(getTheme(lsTheme));
  }

  window.addEventListener('storage', () => changeTheme())

  return (
    /*theme 
     ? <ThemeProvider theme={theme}>*/
        <Drawer />
      /*</ThemeProvider>
    : <p>Loading Theme...</p>*/
  );
}

export default App;