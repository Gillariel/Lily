import * as React from 'react';
import clsx from 'clsx';
import { createStyles, makeStyles, useTheme, Theme } from '@material-ui/core/styles';
import MuiDrawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

/* Icons */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilm, faTv, faCompactDisc, faCamera, faBook, faMask, faGamepad, faNewspaper, faPowerOff, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { faSteam, faBattleNet } from '@fortawesome/free-brands-svg-icons'


import { MainRouter } from '../../routes'
import { useHistory } from 'react-router-dom';
import { ROUTES } from '@/renderer/routes/routes';

import { ButtonKey, Axis } from '../../../types/gamepad';
import useGamepad from '../../controllers';
import { goToPreviousTabbedElement, goToNextTabbedElement, simulateClickOnActiveElement } from '../../utils/tabindex-helper';
import { IpcRendererEvent } from 'electron';
import { KeyValue } from '../../../types';

const ipcRenderer = require('electron').ipcRenderer;
ipcRenderer.on('result-log-stores', (e: IpcRendererEvent, args: Object) => {
  console.log(args);
})

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: 36,
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: 'hidden',
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9) + 1,
      },
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: theme.spacing(0, 1),
      ...theme.mixins.toolbar,
    },
    content: {
      flexGrow: 1,
      /* AppBar is fixed and content is under it.
         This add the size of the bar + the padding normal (64 + 24) to match perfectly and become the main container.
         /*\ The Y scroll is then apply on all and the beginning will go under the app since the app will never move
      */
      paddingTop: "88px",
      padding: theme.spacing(3),
    },
  }),
);

const Drawer = () => {
  const history = useHistory();
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [animated, setAnimated] = React.useState(null);
  const gamepad = useGamepad();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const toggleDrawer = () => {
    setOpen(prev => !prev);
  }
  
  const redirect = (route: ROUTES) => {
    history.push(route);
  }

  const quitApp = () => {
    const remote = require('electron').remote;
    remote.app.exit(0);
  }

  React.useEffect(() => {
    gamepad._handleGamepadEventListener(ButtonKey.button_1, "DrawerMenu", (finished) => {
      simulateClickOnActiveElement();
      finished();
    })

    gamepad._handleGamepadEventListener(ButtonKey.button_4, "DrawerMenu", (finished) => {
      quitApp();
      finished();
    })
  
    gamepad._handleGamepadEventListener(ButtonKey.select, "DrawerMenu", (finished) => {
      setAnimated(prev => finished);
      toggleDrawer();
    })

    gamepad._handleGamepadEventListener(ButtonKey.d_pad_up, "DrawerMenu", (finished) => {
      goToPreviousTabbedElement();
      finished();
    })

    gamepad._handleGamepadEventListener(ButtonKey.d_pad_down, "DrawerMenu", (finished) => {
      goToNextTabbedElement();
      finished();
    })

    return () => { gamepad.unsubscribeContext("DrawerMenu"); }
  }, [])

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        onClick={handleDrawerOpen}
        onTransitionEnd={() => {
          if(animated) {
            animated();
            setAnimated(null);          
          }
        }}
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Lily
          </Typography>
        </Toolbar>
      </AppBar>
      <MuiDrawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div style={{ overflowX: "hidden" }} className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {[ { text: 'Emulators', icon: <FontAwesomeIcon size="2x" icon={faGamepad} />, route: ROUTES.EMULATORS }, 
             { text: 'Steam', icon: <FontAwesomeIcon size="2x" icon={faSteam} />, route: ROUTES.STEAM  }, 
             { text: 'Battle.net', icon: <FontAwesomeIcon size="2x" icon={faBattleNet} />, route: ROUTES.BATTLENET  }, 
          ].map((item, index) => (
            <ListItem id={item.text + index} className="tabbed-index" onClick={() => redirect(item.route)} button key={item.text}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {[ { text: 'Movies', icon: <FontAwesomeIcon size="2x" icon={faFilm} />, route: ROUTES.MOVIES  }, 
             { text: 'TV Shows', icon: <FontAwesomeIcon size="2x" icon={faTv} />, route: ROUTES.TVSHOWS  }, 
             { text: 'Music', icon: <FontAwesomeIcon size="2x" icon={faCompactDisc} />, route: ROUTES.MUSIC  }, 
             { text: 'Photos', icon: <FontAwesomeIcon size="2x" icon={faCamera} />, route: ROUTES.PHOTOS  }
          ].map((item, index) => (
            <ListItem id={item.text + index} className="tabbed-index" onClick={() => redirect(item.route)} button key={item.text}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {[ { text: 'Books', icon: <FontAwesomeIcon size="2x" icon={faBook} />, route: ROUTES.BOOKS  }, 
             { text: 'Comics', icon: <FontAwesomeIcon size="2x" icon={faMask} />, route: ROUTES.COMICS  }, 
             { text: 'Magazines', icon: <FontAwesomeIcon size="2x" icon={faNewspaper} />, route: ROUTES.MAGAZINES  }, 
          ].map((item, index) => (
            <ListItem id={item.text + index} className="tabbed-index" onClick={() => redirect(item.route)} button key={item.text}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
          ))}
        </List>
        <List style={{ position: "absolute", bottom: 0 }}>
          {process.env.NODE_ENV === 'development' && 
            <ListItem id={"log-store-icon"} className="tabbed-index" onClick={() => {
              ipcRenderer.send('log-stores');
              ipcRenderer.send("generate-library");
            }} button key={"log store"}>
              <ListItemIcon>{<FontAwesomeIcon size="2x" icon={faSignOutAlt} />}</ListItemIcon>
              <ListItemText primary={"Log Store"} />
            </ListItem>
          }
          <ListItem id={"logout-icon"} className="tabbed-index" onClick={() => redirect(ROUTES.LOGIN)} button key={"logout"}>
            <ListItemIcon>{<FontAwesomeIcon size="2x" icon={faSignOutAlt} />}</ListItemIcon>
            <ListItemText primary={"Logout"} />
          </ListItem>
          <ListItem id={"quit-icon"} className="tabbed-index" onClick={() => quitApp()} button key={"exit"}>
            <ListItemIcon>{<FontAwesomeIcon size="2x" icon={faPowerOff} />}</ListItemIcon>
            <ListItemText primary={"Exit"} />
          </ListItem>
        </List>
      </MuiDrawer>
      <main className={classes.content}>
        <MainRouter logged={true} />
      </main>
    </div>
  );
}

export default Drawer;
