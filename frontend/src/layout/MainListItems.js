import React, { useContext, useEffect, useReducer, useState, useRef } from "react";
import { Link as RouterLink, useHistory } from "react-router-dom";

import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import Divider from "@material-ui/core/Divider";
import { Badge, Collapse, List } from "@material-ui/core";
import DashboardOutlinedIcon from "@material-ui/icons/DashboardOutlined";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import SyncAltIcon from "@material-ui/icons/SyncAlt";
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";
import PeopleAltOutlinedIcon from "@material-ui/icons/PeopleAltOutlined";
import ContactPhoneOutlinedIcon from "@material-ui/icons/ContactPhoneOutlined";
import AccountTreeOutlinedIcon from "@material-ui/icons/AccountTreeOutlined";
import FlashOnIcon from "@material-ui/icons/FlashOnOutlined";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import CodeRoundedIcon from "@material-ui/icons/CodeRounded";
import EventIcon from "@material-ui/icons/EventOutlined";
import LocalOfferIcon from "@material-ui/icons/LocalOfferOutlined";
import EventAvailableIcon from "@material-ui/icons/EventAvailableOutlined";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PeopleIcon from "@material-ui/icons/PeopleOutlined";
import ListIcon from "@material-ui/icons/ListAltOutlined";
import AnnouncementIcon from "@material-ui/icons/AnnouncementOutlined";
import ForumIcon from "@material-ui/icons/ForumOutlined";
import LocalAtmIcon from '@material-ui/icons/LocalAtmOutlined';
import RotateRight from "@material-ui/icons/RotateRight";
import MoveToInboxIcon from "@material-ui/icons/MoveToInbox";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import SearchIcon from "@material-ui/icons/Search";
import HourglassEmptyIcon from "@material-ui/icons/HourglassEmpty";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import { i18n } from "../translate/i18n";
import { WhatsAppsContext } from "../context/WhatsApp/WhatsAppsContext";
import { AuthContext } from "../context/Auth/AuthContext";
import LoyaltyRoundedIcon from '@material-ui/icons/LoyaltyRounded';
import { Can } from "../components/Can";
import { SocketContext } from "../context/Socket/SocketContext";
import { isArray } from "lodash";
import TableChartIcon from '@material-ui/icons/TableChartOutlined';
import api from "../services/api";
import BorderColorIcon from '@material-ui/icons/BorderColorOutlined';
import ToDoList from "../pages/ToDoList/";
import toastError from "../errors/toastError";
import { makeStyles } from "@material-ui/core/styles";
import { AllInclusive, AttachFileOutlined, BlurCircular, DeviceHubOutlined, Schedule } from '@material-ui/icons';
import usePlans from "../hooks/usePlans";
import Typography from "@material-ui/core/Typography";
import useVersion from "../hooks/useVersion";
import { useTicketsFilter } from "../context/Tickets/TicketsFilterContext";

const useStyles = makeStyles((theme) => ({
  ListSubheader: {
    height: 26,
    marginTop: "-15px",
    marginBottom: "-10px",
  },
  listItem: {
    borderRadius: "8px",
    margin: "4px 8px",
    padding: "8px 12px",
    transition: "all 0.2s ease-in-out",
    "&:hover": {
      backgroundColor: theme.mode === 'dark'
        ? "rgba(255, 255, 255, 0.08)"
        : "rgba(139, 92, 246, 0.08)", // Roxo claro visível
      transform: "translateX(4px)",
    },
    "&.Mui-selected": {
      backgroundColor: theme.mode === 'dark'
        ? "rgba(139, 92, 246, 0.2)"
        : "rgba(139, 92, 246, 0.12)", // Mais visível no claro
      borderLeft: `3px solid ${theme.palette.primary.main}`,
      "&:hover": {
        backgroundColor: theme.mode === 'dark'
          ? "rgba(139, 92, 246, 0.3)"
          : "rgba(139, 92, 246, 0.18)",
      }
    }
  },
  listItemIcon: {
    minWidth: "40px",
    color: theme.palette.text.primary,
  },
  listItemText: {
    "& .MuiTypography-root": {
      fontSize: "0.9rem",
      fontWeight: 500,
    }
  }
}));


function ListItemLink(props) {
  const { icon, primary, to, className } = props;
  const classes = useStyles();

  const renderLink = React.useMemo(
    () =>
      React.forwardRef((itemProps, ref) => (
        <RouterLink to={to} ref={ref} {...itemProps} />
      )),
    [to]
  );

  return (
    <li>
      <ListItem
        button
        dense
        component={renderLink}
        className={`${classes.listItem} ${className || ''}`}
      >
        {icon ? (
          <ListItemIcon className={classes.listItemIcon}>
            {icon}
          </ListItemIcon>
        ) : null}
        <ListItemText primary={primary} className={classes.listItemText} />
      </ListItem>
    </li>
  );
}

const reducer = (state, action) => {
  if (action.type === "LOAD_CHATS") {
    const chats = action.payload;
    const newChats = [];

    if (isArray(chats)) {
      chats.forEach((chat) => {
        const chatIndex = state.findIndex((u) => u.id === chat.id);
        if (chatIndex !== -1) {
          state[chatIndex] = chat;
        } else {
          newChats.push(chat);
        }
      });
    }

    return [...state, ...newChats];
  }

  if (action.type === "UPDATE_CHATS") {
    const chat = action.payload;
    const chatIndex = state.findIndex((u) => u.id === chat.id);

    if (chatIndex !== -1) {
      state[chatIndex] = chat;
      return [...state];
    } else {
      return [chat, ...state];
    }
  }

  if (action.type === "DELETE_CHAT") {
    const chatId = action.payload;

    const chatIndex = state.findIndex((u) => u.id === chatId);
    if (chatIndex !== -1) {
      state.splice(chatIndex, 1);
    }
    return [...state];
  }

  if (action.type === "RESET") {
    return [];
  }

  if (action.type === "CHANGE_CHAT") {
    const changedChats = state.map((chat) => {
      if (chat.id === action.payload.chat.id) {
        return action.payload.chat;
      }
      return chat;
    });
    return changedChats;
  }
};

const MainListItems = (props) => {
  const classes = useStyles();
  const { drawerClose, collapsed } = props;
  const { whatsApps } = useContext(WhatsAppsContext);
  const { user, handleLogout } = useContext(AuthContext);
  const [connectionWarning, setConnectionWarning] = useState(false);
  const [openCampaignSubmenu, setOpenCampaignSubmenu] = useState(false);
  const [showCampaigns, setShowCampaigns] = useState(false);
  const [showKanban, setShowKanban] = useState(false);
  const [showOpenAi, setShowOpenAi] = useState(false);
  const [showIntegrations, setShowIntegrations] = useState(false);
  const history = useHistory();
  const location = history.location;
  const [showSchedules, setShowSchedules] = useState(false);
  const [showInternalChat, setShowInternalChat] = useState(false);
  const [showExternalApi, setShowExternalApi] = useState(false);

  // Filtros de tickets do contexto
  const { ticketFilter, setTicketFilter, ticketSubFilter, setTicketSubFilter } = useTicketsFilter();

  // Detecta qual seção está ativa baseado na rota
  const getCurrentSection = () => {
    const path = location.pathname;
    if (path.startsWith('/tickets')) return 'atendimento';
    if (path.startsWith('/kanban')) return 'crm';
    if (path.startsWith('/dashboard') || path === '/') return 'dashboard';
    if (path.startsWith('/reports')) return 'relatorios';
    // Todas as outras rotas são consideradas "configurações"
    return 'configuracoes';
  };

  const currentSection = getCurrentSection();


  const [invisible, setInvisible] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [searchParam] = useState("");
  const [chats, dispatch] = useReducer(reducer, []);
  const { getPlanCompany } = usePlans();
  
  const [version, setVersion] = useState(false);
  
  
  const { getVersion } = useVersion();

  const socketManager = useContext(SocketContext);
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    async function fetchVersion() {
      const _version = await getVersion();
      if (isMountedRef.current) {
        setVersion(_version.version);
      }
    }
    fetchVersion();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
 

  useEffect(() => {
    dispatch({ type: "RESET" });
    setPageNumber(1);
  }, [searchParam]);

  useEffect(() => {
    async function fetchData() {
      const companyId = user.companyId;
      const planConfigs = await getPlanCompany(undefined, companyId);

      if (isMountedRef.current) {
        setShowCampaigns(planConfigs.plan.useCampaigns);
        setShowKanban(planConfigs.plan.useKanban);
        setShowOpenAi(planConfigs.plan.useOpenAi);
        setShowIntegrations(planConfigs.plan.useIntegrations);
        setShowSchedules(planConfigs.plan.useSchedules);
        setShowInternalChat(planConfigs.plan.useInternalChat);
        setShowExternalApi(planConfigs.plan.useExternalApi);
      }
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);



  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchChats();
    }, 500);
    return () => clearTimeout(delayDebounceFn);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParam, pageNumber]);

  useEffect(() => {
    const companyId = localStorage.getItem("companyId");
    const socket = socketManager.getSocket(companyId);

    socket.on(`company-${companyId}-chat`, (data) => {
      if (data.action === "new-message") {
        dispatch({ type: "CHANGE_CHAT", payload: data });
      }
      if (data.action === "update") {
        dispatch({ type: "CHANGE_CHAT", payload: data });
      }
    });
    return () => {
      socket.disconnect();
    };
  }, [socketManager]);

  useEffect(() => {
    let unreadsCount = 0;
    if (chats.length > 0) {
      for (let chat of chats) {
        for (let chatUser of chat.users) {
          if (chatUser.userId === user.id) {
            unreadsCount += chatUser.unreads;
          }
        }
      }
    }
    if (unreadsCount > 0) {
      setInvisible(false);
    } else {
      setInvisible(true);
    }
  }, [chats, user.id]);

  useEffect(() => {
    if (localStorage.getItem("cshow")) {
      setShowCampaigns(true);
    }
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (whatsApps.length > 0) {
        const offlineWhats = whatsApps.filter((whats) => {
          return (
            whats.status === "qrcode" ||
            whats.status === "PAIRING" ||
            whats.status === "DISCONNECTED" ||
            whats.status === "TIMEOUT" ||
            whats.status === "OPENING"
          );
        });
        if (offlineWhats.length > 0) {
          setConnectionWarning(true);
        } else {
          setConnectionWarning(false);
        }
      }
    }, 2000);
    return () => clearTimeout(delayDebounceFn);
  }, [whatsApps]);

  const fetchChats = async () => {
    try {
      const { data } = await api.get("/chats/", {
        params: { searchParam, pageNumber },
      });
      if (isMountedRef.current) {
        dispatch({ type: "LOAD_CHATS", payload: data.records });
      }
    } catch (err) {
      if (isMountedRef.current) {
        toastError(err);
      }
    }
  };

  const handleClickLogout = () => {
    //handleCloseMenu();
    handleLogout();
  };

  return (
    <div onClick={drawerClose}>
      {/* SEÇÃO: ATENDIMENTO */}
      {currentSection === 'atendimento' && (
        <>
          <ListSubheader
            hidden={collapsed}
            style={{
              position: "relative",
              fontSize: "13px",
              textAlign: "left",
              paddingLeft: 20,
              marginTop: 5,
              marginBottom: 5,
              color: "inherit",
              opacity: 0.7
            }}
            inset
            color="inherit">
            Tickets
          </ListSubheader>

          <ListItem
            button
            dense
            selected={ticketFilter === "open" && ticketSubFilter === "open"}
            onClick={() => {
              setTicketFilter("open");
              setTicketSubFilter("open");
              history.push("/tickets");
            }}
            className={classes.listItem}
          >
            <ListItemIcon className={classes.listItemIcon}>
              <AssignmentIndIcon />
            </ListItemIcon>
            <ListItemText primary={i18n.t("ticketsList.assignedHeader")} className={classes.listItemText} />
          </ListItem>

          <ListItem
            button
            dense
            selected={ticketFilter === "open" && ticketSubFilter === "pending"}
            onClick={() => {
              setTicketFilter("open");
              setTicketSubFilter("pending");
              history.push("/tickets");
            }}
            className={classes.listItem}
          >
            <ListItemIcon className={classes.listItemIcon}>
              <HourglassEmptyIcon />
            </ListItemIcon>
            <ListItemText primary={i18n.t("ticketsList.pendingHeader")} className={classes.listItemText} />
          </ListItem>

          <ListItem
            button
            dense
            selected={ticketFilter === "closed"}
            onClick={() => {
              setTicketFilter("closed");
              history.push("/tickets");
            }}
            className={classes.listItem}
          >
            <ListItemIcon className={classes.listItemIcon}>
              <CheckBoxIcon />
            </ListItemIcon>
            <ListItemText primary={i18n.t("tickets.tabs.closed.title")} className={classes.listItemText} />
          </ListItem>

          <ListItem
            button
            dense
            selected={ticketFilter === "search"}
            onClick={() => {
              setTicketFilter("search");
              history.push("/tickets");
            }}
            className={classes.listItem}
          >
            <ListItemIcon className={classes.listItemIcon}>
              <SearchIcon />
            </ListItemIcon>
            <ListItemText primary={i18n.t("tickets.tabs.search.title")} className={classes.listItemText} />
          </ListItem>

          <Divider style={{ margin: "10px 0" }} />

          <ListSubheader
            hidden={collapsed}
            style={{
              position: "relative",
              fontSize: "13px",
              textAlign: "left",
              paddingLeft: 20,
              marginTop: 5,
              marginBottom: 5,
              color: "inherit",
              opacity: 0.7
            }}
            inset
            color="inherit">
            Ferramentas
          </ListSubheader>

          <ListItemLink
            to="/quick-messages"
            primary={i18n.t("mainDrawer.listItems.quickMessages")}
            icon={<FlashOnIcon />}
          />
          <ListItemLink
            to="/contacts"
            primary={i18n.t("mainDrawer.listItems.contacts")}
            icon={<ContactPhoneOutlinedIcon />}
          />
          <ListItemLink
            to="/schedules"
            primary={i18n.t("mainDrawer.listItems.schedules")}
            icon={<EventIcon />}
          />
          <ListItemLink
            to="/tags"
            primary={i18n.t("mainDrawer.listItems.tags")}
            icon={<LocalOfferIcon />}
          />
          <ListItemLink
            to="/todolist"
            primary={i18n.t("mainDrawer.listItems.tasks")}
            icon={<BorderColorIcon />}
          />
          <ListItemLink
            to="/chats"
            primary={i18n.t("mainDrawer.listItems.chats")}
            icon={
              <Badge color="secondary" variant="dot" overlap="circular" invisible={invisible}>
                <ForumIcon />
              </Badge>
            }
          />
        </>
      )}

      {/* SEÇÃO: CRM (KANBAN) */}
      {currentSection === 'crm' && showKanban && (
        <>
          <ListItemLink
            to="/kanban"
            primary="Kanban"
            icon={<TableChartIcon />}
          />
          <ListItemLink
            to="/contacts"
            primary={i18n.t("mainDrawer.listItems.contacts")}
            icon={<ContactPhoneOutlinedIcon />}
          />
          <ListItemLink
            to="/tags"
            primary={i18n.t("mainDrawer.listItems.tags")}
            icon={<LocalOfferIcon />}
          />
        </>
      )}

      {/* SEÇÃO: DASHBOARD */}
      {currentSection === 'dashboard' && (
        <Can
          role={user.profile}
          perform="dashboard:view"
          yes={() => (
            <ListItemLink
              to="/"
              primary="Dashboard"
              icon={<DashboardOutlinedIcon />}
            />
          )}
        />
      )}

      {/* SEÇÃO: RELATÓRIOS */}
      {currentSection === 'relatorios' && (
        <>
          <ListSubheader
            hidden={collapsed}
            style={{
              position: "relative",
              fontSize: "17px",
              textAlign: "left",
              paddingLeft: 20
            }}
            inset
            color="inherit">
            Relatórios
          </ListSubheader>
          {/* Aqui você pode adicionar itens específicos de relatórios futuramente */}
        </>
      )}

      {/* SEÇÃO: CONFIGURAÇÕES */}
      {currentSection === 'configuracoes' && (
        <Can
          role={user.profile}
          perform="drawer-admin-items:view"
          yes={() => (
            <>
              <ListSubheader
                hidden={collapsed}
                style={{
                  position: "relative",
                  fontSize: "17px",
                  textAlign: "left",
                  paddingLeft: 20
                }}
                inset
                color="inherit">
                {i18n.t("mainDrawer.listItems.administration")}
              </ListSubheader>

              {showCampaigns && (
                <>
                  <ListItem
                    button
                    onClick={() => setOpenCampaignSubmenu((prev) => !prev)}
                    className={classes.listItem}
                  >
                    <ListItemIcon className={classes.listItemIcon}>
                      <EventAvailableIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={i18n.t("mainDrawer.listItems.campaigns")}
                      className={classes.listItemText}
                    />
                    {openCampaignSubmenu ? (
                      <ExpandLessIcon />
                    ) : (
                      <ExpandMoreIcon />
                    )}
                  </ListItem>
                  <Collapse
                    style={{ paddingLeft: 15 }}
                    in={openCampaignSubmenu}
                    timeout="auto"
                    unmountOnExit
                  >
                    <List component="div" disablePadding>
                      <ListItem onClick={() => history.push("/campaigns")} button className={classes.listItem}>
                        <ListItemIcon className={classes.listItemIcon}>
                          <ListIcon />
                        </ListItemIcon>
                        <ListItemText primary="Listagem" className={classes.listItemText} />
                      </ListItem>
                      <ListItem
                        onClick={() => history.push("/contact-lists")}
                        button
                        className={classes.listItem}
                      >
                        <ListItemIcon className={classes.listItemIcon}>
                          <PeopleIcon />
                        </ListItemIcon>
                        <ListItemText primary="Listas de Contatos" className={classes.listItemText} />
                      </ListItem>
                      <ListItem
                        onClick={() => history.push("/campaigns-config")}
                        button
                        className={classes.listItem}
                      >
                        <ListItemIcon className={classes.listItemIcon}>
                          <SettingsOutlinedIcon />
                        </ListItemIcon>
                        <ListItemText primary="Configurações" className={classes.listItemText} />
                      </ListItem>
                    </List>
                  </Collapse>
                </>
              )}

              {user.super && (
                <ListItemLink
                  to="/announcements"
                  primary={i18n.t("mainDrawer.listItems.annoucements")}
                  icon={<AnnouncementIcon />}
                />
              )}

              {showOpenAi && (
                <ListItemLink
                  to="/prompts"
                  primary={i18n.t("mainDrawer.listItems.prompts")}
                  icon={<AllInclusive />}
                />
              )}

              {showIntegrations && (
                <ListItemLink
                  to="/queue-integration"
                  primary={i18n.t("mainDrawer.listItems.queueIntegration")}
                  icon={<DeviceHubOutlined />}
                />
              )}

              <ListItemLink
                to="/connections"
                primary={i18n.t("mainDrawer.listItems.connections")}
                icon={
                  <Badge badgeContent={connectionWarning ? "!" : 0} color="error" overlap="rectangular">
                    <SyncAltIcon />
                  </Badge>
                }
              />

              <ListItemLink
                to="/files"
                primary={i18n.t("mainDrawer.listItems.files")}
                icon={<AttachFileOutlined />}
              />

              <ListItemLink
                to="/queues"
                primary={i18n.t("mainDrawer.listItems.queues")}
                icon={<AccountTreeOutlinedIcon />}
              />

              <ListItemLink
                to="/users"
                primary={i18n.t("mainDrawer.listItems.users")}
                icon={<PeopleAltOutlinedIcon />}
              />

              {showExternalApi && (
                <ListItemLink
                  to="/messages-api"
                  primary={i18n.t("mainDrawer.listItems.messagesAPI")}
                  icon={<CodeRoundedIcon />}
                />
              )}

              <ListItemLink
                to="/financeiro"
                primary={i18n.t("mainDrawer.listItems.financeiro")}
                icon={<LocalAtmIcon />}
              />

              <ListItemLink
                to="/settings"
                primary={i18n.t("mainDrawer.listItems.settings")}
                icon={<SettingsOutlinedIcon />}
              />

              <ListItemLink
                to="/helps"
                primary={i18n.t("mainDrawer.listItems.helps")}
                icon={<HelpOutlineIcon />}
              />
            </>
          )}
        />
      )}

      {/* Rodapé com versão */}
      {!collapsed && (
        <React.Fragment>
          <Divider />
          <Typography style={{ fontSize: "12px", padding: "10px", textAlign: "right", fontWeight: "bold" }}>
            {version}
          </Typography>
        </React.Fragment>
      )}
    </div>
  );
};

export default MainListItems;
