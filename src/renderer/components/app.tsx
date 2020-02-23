import * as React from 'react';
import { ThemeProvider, Theme, Collapse, IconButton } from '@material-ui/core';
import { getTheme } from '../utils/theme';
import Drawer from './navigation/drawer';
import Alert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';

const App = () => {
  const [theme, setTheme] = React.useState<Theme>();
  const [alert, setAlert] = React.useState(null);

  React.useEffect(() => {
    var lsTheme = localStorage.getItem("theme");
    setTheme(getTheme(lsTheme));
  }, [])

  const changeTheme = () => {
    var lsTheme = localStorage.getItem("theme");
    setTheme(getTheme(lsTheme));
  }

  window.addEventListener('storage', () => changeTheme())

  window.addEventListener('showAlert', (e: CustomEvent) => {
    setAlert({ type: e.detail.type, content: e.detail.content });
  })

  return (
    /*theme 
     ? <ThemeProvider theme={theme}>*/
      <div>
        {alert != null &&
          <Collapse style={{
            position: "fixed",
            top: "10%",
            left: "25%",
            right: "25%",
            margin: "auto",
            zIndex: 1300
          }} in={alert != null}>
            <Alert
              variant="filled"
              severity={alert.type}
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setAlert(null);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
            >
              {alert.content}
            </Alert>
          </Collapse>
        }
        <Drawer />
      </div>
      /*</ThemeProvider>
    : <p>Loading Theme...</p>*/
  );
}

export default App;