import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { makeStyles, Tabs, Tab } from "@material-ui/core";
import {
  HeadsetMic,
  TableChart,
  Dashboard,
  Assessment,
  Settings
} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginLeft: theme.spacing(3),
    maxWidth: 600,
  },
  tabs: {
    "& .MuiTab-root": {
      minWidth: 100,
      color: theme.mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(255, 255, 255, 0.85)',
      fontWeight: 500,
      fontSize: '0.9rem',
      textTransform: 'none',
      "&:hover": {
        color: '#fff',
        opacity: 1,
      },
      "&.Mui-selected": {
        color: '#fff',
        fontWeight: 600,
      },
    },
    "& .MuiTabs-indicator": {
      backgroundColor: '#fff',
      height: 3,
      borderRadius: '3px 3px 0 0',
    },
  },
  tabIcon: {
    marginRight: theme.spacing(1),
    fontSize: '1.2rem',
  }
}));

const TopNavigationBar = () => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();

  // Detecta a rota atual e define o tab ativo
  const getCurrentTab = () => {
    const path = location.pathname;

    if (path.startsWith('/tickets')) return 0;
    if (path.startsWith('/kanban')) return 1;
    if (path === '/') return 2; // Dashboard é a rota raiz "/"
    if (path.startsWith('/reports')) return 3;
    if (
      path.startsWith('/connections') ||
      path.startsWith('/users') ||
      path.startsWith('/queues') ||
      path.startsWith('/settings') ||
      path.startsWith('/contacts') ||
      path.startsWith('/schedules') ||
      path.startsWith('/tags') ||
      path.startsWith('/quickmessages') ||
      path.startsWith('/helps') ||
      path.startsWith('/prompts') ||
      path.startsWith('/companies') ||
      path.startsWith('/plans') ||
      path.startsWith('/financeiro') ||
      path.startsWith('/messages-api') ||
      path.startsWith('/campaigns') ||
      path.startsWith('/contact-lists') ||
      path.startsWith('/announcements') ||
      path.startsWith('/files') ||
      path.startsWith('/todolist')
    ) return 4;

    return 0; // Default para Atendimento
  };

  const [value, setValue] = useState(getCurrentTab());

  // Atualiza o tab ativo quando a rota muda
  useEffect(() => {
    setValue(getCurrentTab());
  }, [location.pathname]);

  const handleChange = (event, newValue) => {
    setValue(newValue);

    // Navega para a rota correspondente
    switch(newValue) {
      case 0:
        history.push('/tickets');
        break;
      case 1:
        history.push('/kanban');
        break;
      case 2:
        history.push('/'); // Dashboard é a rota raiz "/"
        break;
      case 3:
        history.push('/reports');
        break;
      case 4:
        history.push('/connections');
        break;
      default:
        history.push('/tickets');
    }
  };

  return (
    <div className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        className={classes.tabs}
        variant="standard"
      >
        <Tab
          icon={<HeadsetMic className={classes.tabIcon} />}
          label="Atendimento"
        />
        <Tab
          icon={<TableChart className={classes.tabIcon} />}
          label="CRM"
        />
        <Tab
          icon={<Dashboard className={classes.tabIcon} />}
          label="Dashboard"
        />
        <Tab
          icon={<Assessment className={classes.tabIcon} />}
          label="Relatórios"
        />
        <Tab
          icon={<Settings className={classes.tabIcon} />}
          label="Configurações"
        />
      </Tabs>
    </div>
  );
};

export default TopNavigationBar;
