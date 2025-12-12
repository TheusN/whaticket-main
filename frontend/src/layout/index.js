import React, { useState, useContext, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import clsx from "clsx";
import {
  makeStyles,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Divider,
  MenuItem,
  IconButton,
  Menu,
  useTheme,
  Typography,
  Box,
} from "@material-ui/core";

import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import AccountCircle from "@material-ui/icons/AccountCircle";
import CachedIcon from "@material-ui/icons/Cached";
import useVersion from "../hooks/useVersion";

import MainListItems from "./MainListItems";
import NotificationsPopOver from "../components/NotificationsPopOver";
import NotificationsVolume from "../components/NotificationsVolume";
import UserModal from "../components/UserModal";
import { AuthContext } from "../context/Auth/AuthContext";
import BackdropLoading from "../components/BackdropLoading";
import DarkMode from "../components/DarkMode";
import { i18n } from "../translate/i18n";
import toastError from "../errors/toastError";
import AnnouncementsPopover from "../components/AnnouncementsPopover";
import TopNavigationBar from "../components/TopNavigationBar";

import logoDefault from "../assets/logo.png";
import { SocketContext } from "../context/Socket/SocketContext";
import { useWhitelabelContext } from "../context/Whitelabel/WhitelabelContext";
import ChatPopover from "../pages/Chat/ChatPopover";


import ColorModeContext from "../layout/themeContext";
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import LanguageControl from "../components/LanguageControl";
import { LanguageOutlined } from "@material-ui/icons";
import SkipNavigation from "../components/SkipNavigation";

const drawerWidth = 240;
const appBarHeight = 64;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    [theme.breakpoints.down("sm")]: {
      height: "calc(100vh - 56px)",
    },
    backgroundColor: theme.palette.fancyBackground,
    '& .MuiButton-outlinedPrimary': {
      color: theme.mode === 'light' ? '#FFF' : '#FFF',
      backgroundColor: theme.mode === 'light' ? theme.palette.primary.main : '#1c1c1c',
    },
    '& .MuiTab-textColorPrimary.Mui-selected': {
      color: theme.mode === 'light' ? 'Primary' : '#FFF',
    }
  },
  avatar: {
    width: "100%",
  },
  toolbar: {
    paddingRight: 24,
    paddingLeft: 16,
    color: theme.palette.dark.main,
    background: theme.palette.barraSuperior,
    minHeight: appBarHeight,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    width: "100%",
  },
  menuButton: {
    marginRight: 16,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
    fontSize: 14,
    color: "white",
  },
  logo: {
    height: 40,
    width: "auto",
    marginRight: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      height: 32,
    },
  },
  // Container abaixo do AppBar
  mainContainer: {
    display: "flex",
    flex: 1,
    overflow: "hidden",
    marginTop: appBarHeight,
  },
  // Drawer (menu lateral)
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    height: "100%",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    [theme.breakpoints.down("sm")]: {
      width: "100%"
    },
    ...theme.scrollbarStylesSoft
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
    [theme.breakpoints.down("sm")]: {
      width: "100%"
    }
  },
  drawerContainer: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
  drawerContent: {
    flex: 1,
    overflowY: "auto",
    overflowX: "hidden",
    ...theme.scrollbarStylesSoft,
  },
  drawerFooter: {
    padding: theme.spacing(1, 2),
    borderTop: `1px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.background.paper,
    textAlign: "center",
  },
  versionText: {
    fontSize: "11px",
    color: theme.palette.text.secondary,
    fontWeight: 500,
    opacity: 0.8,
  },
  content: {
    flex: 1,
    overflow: "auto",
    margin: theme.spacing(1),
    borderRadius: "16px",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.palette.mode === 'dark'
      ? "0 4px 20px rgba(0, 0, 0, 0.3)"
      : "0 4px 20px rgba(0, 0, 0, 0.08)",
  },
  contentFullWidth: {
    flex: 1,
    overflow: "auto",
    margin: theme.spacing(1),
    borderRadius: "16px",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.palette.mode === 'dark'
      ? "0 4px 20px rgba(0, 0, 0, 0.3)"
      : "0 4px 20px rgba(0, 0, 0, 0.08)",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column"
  },
  containerWithScroll: {
    flex: 1,
    padding: theme.spacing(1),
    paddingTop: theme.spacing(2),
    overflowY: "auto",
    ...theme.scrollbarStyles,
  },
  NotificationsPopOver: {
    // color: theme.barraSuperior.secondary.main,
  },
}));

const LoggedInLayout = ({ children, themeToggle }) => {
  const classes = useStyles();
  const location = useLocation();
  const [userModalOpen, setUserModalOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const { handleLogout, loading } = useContext(AuthContext);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerVariant, setDrawerVariant] = useState("permanent");
  const [version, setVersion] = useState("");
  const { user } = useContext(AuthContext);
  const { getVersion } = useVersion();
  const isMountedRef = useRef(true);

  const theme = useTheme();
  const { colorMode } = useContext(ColorModeContext);
  const { whitelabel, getLogo } = useWhitelabelContext();

  // Determina a logo baseada no tema (light/dark)
  const currentLogo = React.useMemo(() => {
    const themeMode = theme.palette.type;
    const whitelabelLogo = getLogo(themeMode);
    return whitelabelLogo || logoDefault;
  }, [getLogo, theme.palette.type]);

  // Verifica se está na página do Dashboard (rota "/" apenas)
  const isDashboard = location.pathname === "/";

  const [volume, setVolume] = useState(localStorage.getItem("volume") || 1);


  // Languages
  const [anchorElLanguage, setAnchorElLanguage] = useState(null);
  const [menuLanguageOpen, setMenuLanguageOpen] = useState(false);


  //################### CODIGOS DE TESTE #########################################
  // useEffect(() => {
  //   navigator.getBattery().then((battery) => {
  //     console.log(`Battery Charging: ${battery.charging}`);
  //     console.log(`Battery Level: ${battery.level * 100}%`);
  //     console.log(`Charging Time: ${battery.chargingTime}`);
  //     console.log(`Discharging Time: ${battery.dischargingTime}`);
  //   })
  // }, []);

  // useEffect(() => {
  //   const geoLocation = navigator.geolocation

  //   geoLocation.getCurrentPosition((position) => {
  //     let lat = position.coords.latitude;
  //     let long = position.coords.longitude;

  //     console.log('latitude: ', lat)
  //     console.log('longitude: ', long)
  //   })
  // }, []);

  // useEffect(() => {
  //   const nucleos = window.navigator.hardwareConcurrency;

  //   console.log('Nucleos: ', nucleos)
  // }, []);

  // useEffect(() => {
  //   console.log('userAgent', navigator.userAgent)
  //   if (
  //     navigator.userAgent.match(/Android/i)
  //     || navigator.userAgent.match(/webOS/i)
  //     || navigator.userAgent.match(/iPhone/i)
  //     || navigator.userAgent.match(/iPad/i)
  //     || navigator.userAgent.match(/iPod/i)
  //     || navigator.userAgent.match(/BlackBerry/i)
  //     || navigator.userAgent.match(/Windows Phone/i)
  //   ) {
  //     console.log('é mobile ', true) //celular
  //   }
  //   else {
  //     console.log('não é mobile: ', false) //nao é celular
  //   }
  // }, []);
  //##############################################################################

  const socketManager = useContext(SocketContext);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    async function fetchVersion() {
      try {
        const _version = await getVersion();
        if (isMountedRef.current) {
          setVersion(_version.version);
        }
      } catch (err) {
        // Silently fail - version is optional
      }
    }
    fetchVersion();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (document.body.offsetWidth > 1200) {
      setDrawerOpen(true);
    }
  }, []);

  useEffect(() => {
    if (document.body.offsetWidth < 600) {
      setDrawerVariant("temporary");
    } else {
      setDrawerVariant("permanent");
    }
  }, [drawerOpen]);

  useEffect(() => {
    const companyId = localStorage.getItem("companyId");
    const userId = localStorage.getItem("userId");

    const socket = socketManager.getSocket(companyId);

    socket.on(`company-${companyId}-auth`, (data) => {
      if (data.user.id === +userId) {
        toastError("Sua conta foi acessada em outro computador.");
        setTimeout(() => {
          localStorage.clear();
          window.location.reload();
        }, 1000);
      }
    });

    socket.emit("userStatus");
    const interval = setInterval(() => {
      socket.emit("userStatus");
    }, 1000 * 60 * 5);

    return () => {
      socket.disconnect();
      clearInterval(interval);
    };
  }, [socketManager]);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
    setMenuOpen(true);
  };

  const handlemenuLanguage = ( event ) => {
    setAnchorElLanguage(event.currentTarget);
    setMenuLanguageOpen( true );
  }

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setMenuOpen(false);
  };

  const handleCloseMenuLanguage = (  ) => {
    setAnchorElLanguage(null);
    setMenuLanguageOpen(false);
  }

  const handleOpenUserModal = () => {
    setUserModalOpen(true);
    handleCloseMenu();
  };

  const handleClickLogout = () => {
    handleCloseMenu();
    handleLogout();
  };

  const drawerClose = () => {
    if (document.body.offsetWidth < 600) {
      setDrawerOpen(false);
    }
  };

  const handleRefreshPage = () => {
    window.location.reload(false);
  }

  const handleMenuItemClick = () => {
    const { innerWidth: width } = window;
    if (width <= 600) {
      setDrawerOpen(false);
    }
  };

  const toggleColorMode = () => {
    colorMode.toggleColorMode();
  }

  if (loading) {
    return <BackdropLoading />;
  }

  return (
    <div className={classes.root}>
      {/* ♿ ACESSIBILIDADE: Skip Navigation Link */}
      <SkipNavigation mainId="main-content" />

      <UserModal
        open={userModalOpen}
        onClose={() => setUserModalOpen(false)}
        userId={user?.id}
      />

      {/* AppBar sempre no topo com 100% de largura */}
      <AppBar
        position="fixed"
        className={classes.appBar}
        color="primary"
        component="header"
        role="banner"
      >
        <Toolbar
          className={classes.toolbar}
          role="toolbar"
          aria-label="Barra de ferramentas principal"
        >
          {/* Logo no AppBar */}
          <img
            src={currentLogo}
            className={classes.logo}
            alt={`Logo ${whitelabel?.companyName || 'Atendechat'} - Sistema de atendimento`}
          />

          {/* Botão de menu (só aparece quando não é Dashboard) */}
          {!isDashboard && (
            <IconButton
              edge="start"
              aria-label={drawerOpen ? "Fechar menu lateral" : "Abrir menu lateral"}
              onClick={() => setDrawerOpen(!drawerOpen)}
              className={classes.menuButton}
              style={{ color: "white" }}
            >
              {drawerOpen ? <ChevronLeftIcon /> : <MenuIcon />}
            </IconButton>
          )}

          <TopNavigationBar />

          <div className={classes.title}></div>

          <div>
            <IconButton
              edge="start"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handlemenuLanguage}
            >
              <LanguageOutlined
                style={{ color: "white", marginRight: 10 }}
              />
            </IconButton>
            <Menu
              id="menu-appbar-language"
              anchorEl={anchorElLanguage}
              getContentAnchorEl={null}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={menuLanguageOpen}
              onClose={handleCloseMenuLanguage}
            >
              <MenuItem>
                <LanguageControl />
              </MenuItem>
            </Menu>
          </div>

          <IconButton edge="start" onClick={toggleColorMode}>
            {theme.mode === 'dark' ? <Brightness7Icon style={{ color: "white" }} /> : <Brightness4Icon style={{ color: "white" }} />}
          </IconButton>

          <NotificationsVolume
            setVolume={setVolume}
            volume={volume}
          />

          <IconButton
            onClick={handleRefreshPage}
            aria-label={i18n.t("mainDrawer.appBar.refresh")}
            color="inherit"
          >
            <CachedIcon style={{ color: "white" }} />
          </IconButton>

          {user.id && <NotificationsPopOver volume={volume} />}

          <AnnouncementsPopover />

          <ChatPopover />

          <div>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              variant="contained"
              style={{ color: "white" }}
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              getContentAnchorEl={null}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={menuOpen}
              onClose={handleCloseMenu}
            >
              <MenuItem onClick={handleOpenUserModal}>
                {i18n.t("mainDrawer.appBar.user.profile")}
              </MenuItem>
              <MenuItem onClick={handleClickLogout}>
                {i18n.t("mainDrawer.appBar.user.logout")}
              </MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>

      {/* Container principal abaixo do AppBar */}
      <div className={classes.mainContainer}>
        {/* Drawer (menu lateral) - só aparece quando não é Dashboard */}
        {!isDashboard && (
          <Drawer
            variant={drawerVariant}
            classes={{
              paper: clsx(
                classes.drawerPaper,
                !drawerOpen && classes.drawerPaperClose
              ),
            }}
            open={drawerOpen}
            role="navigation"
            aria-label="Menu de navegação principal"
          >
            <div className={classes.drawerContainer}>
              <List
                className={classes.drawerContent}
                component="nav"
                aria-label="Menu principal de navegação"
              >
                <MainListItems drawerClose={drawerClose} collapsed={!drawerOpen} />
              </List>
              {drawerOpen && version && (
                <Box className={classes.drawerFooter}>
                  <Typography className={classes.versionText}>
                    v{version}
                  </Typography>
                </Box>
              )}
            </div>
          </Drawer>
        )}

        {/* Conteúdo principal */}
        <main
          id="main-content"
          className={isDashboard ? classes.contentFullWidth : classes.content}
          role="main"
          aria-label="Conteúdo principal"
        >
          {children ? children : null}
        </main>
      </div>
    </div>
  );
};

export default LoggedInLayout;
