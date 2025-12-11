import React, { useState, useContext, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import {
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Collapse,
    Avatar,
    IconButton,
    Divider,
    TextField,
    InputAdornment,
    Badge,
    Tooltip,
    Box,
    Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// Icons
import DashboardOutlinedIcon from '@material-ui/icons/DashboardOutlined';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import ContactPhoneOutlinedIcon from '@material-ui/icons/ContactPhoneOutlined';
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import AccountTreeOutlinedIcon from '@material-ui/icons/AccountTreeOutlined';
import SyncAltIcon from '@material-ui/icons/SyncAlt';
import FlashOnIcon from '@material-ui/icons/FlashOn';
import EventIcon from '@material-ui/icons/Event';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import ForumIcon from '@material-ui/icons/Forum';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import TableChartIcon from '@material-ui/icons/TableChart';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import AnnouncementIcon from '@material-ui/icons/Announcement';
import AllInclusive from '@material-ui/icons/AllInclusive';
import DeviceHubOutlined from '@material-ui/icons/DeviceHubOutlined';
import AttachFile from '@material-ui/icons/AttachFile';
import CodeRoundedIcon from '@material-ui/icons/CodeRounded';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import SearchIcon from '@material-ui/icons/Search';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

import { AuthContext } from '../../context/Auth/AuthContext';
import { Can } from '../Can';
import { i18n } from '../../translate/i18n';
import usePlans from '../../hooks/usePlans';
import ColorModeContext from '../../layout/themeContext';

import logo from '../../assets/logo.png';

const drawerWidth = 280;
const drawerCollapsedWidth = 80;

const useStyles = makeStyles((theme) => ({
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },

    drawerPaper: {
        width: drawerWidth,
        backgroundColor: theme.palette.background.paper,
        borderRight: `1px solid ${theme.palette.divider}`,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        overflowX: 'hidden',
        ...theme.scrollbarStylesSoft,
    },

    drawerPaperCollapsed: {
        width: drawerCollapsedWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
    },

    // Header
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px 20px',
        minHeight: 72,
        borderBottom: `1px solid ${theme.palette.divider}`,
        background: theme.palette.mode === 'light'
            ? 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)'
            : theme.palette.background.paper,
    },

    logo: {
        height: 40,
        width: 'auto',
        transition: 'all 0.3s ease',
    },

    logoCollapsed: {
        height: 32,
    },

    toggleButton: {
        color: theme.palette.mode === 'light' ? '#FFFFFF' : theme.palette.text.primary,
        padding: 8,
        transition: 'transform 0.3s ease',

        '&:hover': {
            backgroundColor: theme.palette.mode === 'light'
                ? 'rgba(255, 255, 255, 0.15)'
                : 'rgba(255, 255, 255, 0.08)',
        },
    },

    // User Profile
    userProfile: {
        display: 'flex',
        alignItems: 'center',
        padding: '20px',
        gap: 12,
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        borderBottom: `1px solid ${theme.palette.divider}`,

        '&:hover': {
            backgroundColor: theme.palette.mode === 'light'
                ? 'rgba(0, 0, 0, 0.02)'
                : 'rgba(255, 255, 255, 0.02)',
        },
    },

    userAvatar: {
        width: 48,
        height: 48,
        backgroundColor: theme.palette.primary.main,
        fontWeight: 600,
        fontSize: '1.25rem',
    },

    userInfo: {
        flex: 1,
        minWidth: 0,
        opacity: 1,
        transition: 'opacity 0.3s ease',
    },

    userInfoHidden: {
        opacity: 0,
        width: 0,
        overflow: 'hidden',
    },

    userName: {
        fontSize: '0.938rem',
        fontWeight: 600,
        color: theme.palette.text.primary,
        marginBottom: 2,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },

    userStatus: {
        fontSize: '0.813rem',
        color: theme.palette.text.secondary,
        display: 'flex',
        alignItems: 'center',
        gap: 6,
    },

    statusDot: {
        width: 8,
        height: 8,
        borderRadius: '50%',
        backgroundColor: theme.palette.success.main,
        animation: '$pulse 2s ease-in-out infinite',
    },

    '@keyframes pulse': {
        '0%, 100%': {
            opacity: 1,
        },
        '50%': {
            opacity: 0.5,
        },
    },

    // Search
    searchContainer: {
        padding: '16px 20px',
    },

    searchInput: {
        '& .MuiOutlinedInput-root': {
            borderRadius: 12,
            backgroundColor: theme.palette.mode === 'light'
                ? 'rgba(0, 0, 0, 0.04)'
                : 'rgba(255, 255, 255, 0.04)',
            border: 'none',

            '& fieldset': {
                border: 'none',
            },

            '&:hover': {
                backgroundColor: theme.palette.mode === 'light'
                    ? 'rgba(0, 0, 0, 0.06)'
                    : 'rgba(255, 255, 255, 0.06)',
            },

            '&.Mui-focused': {
                backgroundColor: theme.palette.background.paper,
                boxShadow: `0 0 0 2px ${theme.palette.primary.main}25`,
            },
        },

        '& .MuiInputBase-input': {
            padding: '10px 12px',
            fontSize: '0.875rem',
        },

        '& .MuiInputAdornment-root': {
            marginRight: 8,
        },
    },

    // Menu
    menuList: {
        padding: '12px 8px',
    },

    categoryDivider: {
        margin: '16px 0',
        backgroundColor: theme.palette.divider,
    },

    categoryHeader: {
        padding: '12px 20px',
        fontSize: '0.75rem',
        fontWeight: 700,
        color: theme.palette.text.secondary,
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
    },

    categoryHeaderCollapsed: {
        textAlign: 'center',
        padding: '12px 8px',
    },

    menuItem: {
        borderRadius: 12,
        margin: '4px 8px',
        padding: '10px 16px',
        transition: 'all 0.2s ease',
        position: 'relative',
        overflow: 'hidden',

        '&::before': {
            content: '""',
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: 0,
            backgroundColor: theme.palette.primary.main,
            transition: 'width 0.2s ease',
        },

        '&:hover': {
            backgroundColor: theme.palette.mode === 'light'
                ? 'rgba(139, 92, 246, 0.08)'
                : 'rgba(139, 92, 246, 0.15)',

            '& $menuIcon': {
                color: theme.palette.primary.main,
                transform: 'translateX(4px)',
            },
        },

        '&.active': {
            backgroundColor: theme.palette.mode === 'light'
                ? 'rgba(139, 92, 246, 0.12)'
                : 'rgba(139, 92, 246, 0.2)',
            color: theme.palette.primary.main,

            '&::before': {
                width: 4,
            },

            '& $menuIcon': {
                color: theme.palette.primary.main,
            },

            '& $menuText': {
                fontWeight: 600,
                color: theme.palette.primary.main,
            },
        },
    },

    menuItemCollapsed: {
        justifyContent: 'center',
        padding: '12px',
    },

    menuIcon: {
        minWidth: 40,
        color: theme.palette.text.secondary,
        transition: 'all 0.2s ease',

        '& svg': {
            fontSize: 22,
        },
    },

    menuIconCollapsed: {
        minWidth: 'auto',
    },

    menuText: {
        '& .MuiTypography-root': {
            fontSize: '0.875rem',
            fontWeight: 500,
            color: theme.palette.text.primary,
        },
    },

    // Submenu
    submenuItem: {
        paddingLeft: 68,
        borderRadius: 8,
        margin: '2px 8px 2px 20px',
        padding: '8px 16px',

        '&:hover': {
            backgroundColor: theme.palette.mode === 'light'
                ? 'rgba(0, 0, 0, 0.04)'
                : 'rgba(255, 255, 255, 0.04)',
        },

        '&.active': {
            backgroundColor: theme.palette.mode === 'light'
                ? 'rgba(139, 92, 246, 0.08)'
                : 'rgba(139, 92, 246, 0.15)',
            color: theme.palette.primary.main,
        },
    },

    // Footer
    drawerFooter: {
        marginTop: 'auto',
        borderTop: `1px solid ${theme.palette.divider}`,
        padding: '16px',
    },

    themeToggle: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 16px',
        borderRadius: 12,
        backgroundColor: theme.palette.mode === 'light'
            ? 'rgba(0, 0, 0, 0.04)'
            : 'rgba(255, 255, 255, 0.04)',
        cursor: 'pointer',
        transition: 'all 0.2s ease',

        '&:hover': {
            backgroundColor: theme.palette.mode === 'light'
                ? 'rgba(0, 0, 0, 0.08)'
                : 'rgba(255, 255, 255, 0.08)',
        },
    },

    versionText: {
        fontSize: '0.75rem',
        color: theme.palette.text.disabled,
        textAlign: 'center',
        padding: '8px 0',
        marginTop: 8,
    },
}));

const Sidebar = ({ open, onClose, variant = 'permanent' }) => {
    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();
    const { user } = useContext(AuthContext);
    const { colorMode } = useContext(ColorModeContext);
    const { getPlanCompany } = usePlans();

    const [collapsed, setCollapsed] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [openSubmenus, setOpenSubmenus] = useState({});

    // Plan features
    const [showCampaigns, setShowCampaigns] = useState(false);
    const [showKanban, setShowKanban] = useState(false);
    const [showOpenAi, setShowOpenAi] = useState(false);
    const [showIntegrations, setShowIntegrations] = useState(false);
    const [showExternalApi, setShowExternalApi] = useState(false);

    useEffect(() => {
        async function fetchPlanData() {
            const companyId = user.companyId;
            const planConfigs = await getPlanCompany(undefined, companyId);

            setShowCampaigns(planConfigs.plan.useCampaigns);
            setShowKanban(planConfigs.plan.useKanban);
            setShowOpenAi(planConfigs.plan.useOpenAi);
            setShowIntegrations(planConfigs.plan.useIntegrations);
            setShowExternalApi(planConfigs.plan.useExternalApi);
        }
        fetchPlanData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
        if (!collapsed) {
            setOpenSubmenus({});
        }
    };

    const toggleSubmenu = (key) => {
        if (!collapsed) {
            setOpenSubmenus(prev => ({
                ...prev,
                [key]: !prev[key]
            }));
        }
    };

    const isActive = (path) => {
        return location.pathname === path;
    };

    const handleNavigation = (path) => {
        history.push(path);
        if (variant === 'temporary') {
            onClose();
        }
    };

    const toggleTheme = () => {
        colorMode.toggleColorMode();
    };

    const getUserInitials = (name) => {
        if (!name) return '?';
        const names = name.split(' ');
        if (names.length >= 2) {
            return `${names[0][0]}${names[1][0]}`.toUpperCase();
        }
        return name.substring(0, 2).toUpperCase();
    };

    // Menu items organized by categories
    const menuCategories = [
        {
            key: 'main',
            label: i18n.t('mainDrawer.listItems.main') || 'Principal',
            items: [
                { path: '/', label: 'Dashboard', icon: <DashboardOutlinedIcon />, role: 'dashboard:view' },
                { path: '/tickets', label: i18n.t('mainDrawer.listItems.tickets'), icon: <WhatsAppIcon /> },
                { path: '/kanban', label: 'Kanban', icon: <TableChartIcon />, show: showKanban },
                { path: '/todolist', label: i18n.t('mainDrawer.listItems.tasks'), icon: <BorderColorIcon /> },
            ],
        },
        {
            key: 'contacts',
            label: i18n.t('mainDrawer.listItems.contactsCategory') || 'Contatos',
            items: [
                { path: '/contacts', label: i18n.t('mainDrawer.listItems.contacts'), icon: <ContactPhoneOutlinedIcon /> },
                { path: '/tags', label: i18n.t('mainDrawer.listItems.tags'), icon: <LocalOfferIcon /> },
                { path: '/chats', label: i18n.t('mainDrawer.listItems.chats'), icon: <ForumIcon />, badge: 'chat' },
            ],
        },
        {
            key: 'tools',
            label: i18n.t('mainDrawer.listItems.tools') || 'Ferramentas',
            items: [
                { path: '/quick-messages', label: i18n.t('mainDrawer.listItems.quickMessages'), icon: <FlashOnIcon /> },
                { path: '/schedules', label: i18n.t('mainDrawer.listItems.schedules'), icon: <EventIcon /> },
                { path: '/helps', label: i18n.t('mainDrawer.listItems.helps'), icon: <HelpOutlineIcon /> },
            ],
        },
    ];

    const adminCategory = {
        key: 'admin',
        label: i18n.t('mainDrawer.listItems.administration'),
        role: 'drawer-admin-items:view',
        items: [
            {
                key: 'campaigns',
                label: i18n.t('mainDrawer.listItems.campaigns'),
                icon: <EventAvailableIcon />,
                show: showCampaigns,
                submenu: [
                    { path: '/campaigns', label: 'Listagem' },
                    { path: '/contact-lists', label: 'Listas de Contatos' },
                    { path: '/campaigns-config', label: 'Configurações' },
                ],
            },
            { path: '/announcements', label: i18n.t('mainDrawer.listItems.annoucements'), icon: <AnnouncementIcon />, super: true },
            { path: '/prompts', label: i18n.t('mainDrawer.listItems.prompts'), icon: <AllInclusive />, show: showOpenAi },
            { path: '/queue-integration', label: i18n.t('mainDrawer.listItems.queueIntegration'), icon: <DeviceHubOutlined />, show: showIntegrations },
            { path: '/connections', label: i18n.t('mainDrawer.listItems.connections'), icon: <SyncAltIcon /> },
            { path: '/files', label: i18n.t('mainDrawer.listItems.files'), icon: <AttachFile /> },
            { path: '/queues', label: i18n.t('mainDrawer.listItems.queues'), icon: <AccountTreeOutlinedIcon /> },
            { path: '/users', label: i18n.t('mainDrawer.listItems.users'), icon: <PeopleAltOutlinedIcon /> },
            { path: '/messages-api', label: i18n.t('mainDrawer.listItems.messagesAPI'), icon: <CodeRoundedIcon />, show: showExternalApi },
            { path: '/financeiro', label: i18n.t('mainDrawer.listItems.financeiro'), icon: <LocalAtmIcon /> },
            { path: '/settings', label: i18n.t('mainDrawer.listItems.settings'), icon: <SettingsOutlinedIcon /> },
        ],
    };

    const renderMenuItem = (item) => {
        // Check if should show
        if (item.show === false) return null;
        if (item.super && !user.super) return null;

        // Submenu item
        if (item.submenu) {
            return (
                <React.Fragment key={item.key}>
                    <ListItem
                        button
                        onClick={() => toggleSubmenu(item.key)}
                        className={`${classes.menuItem} ${collapsed ? classes.menuItemCollapsed : ''}`}
                    >
                        <ListItemIcon className={`${classes.menuIcon} ${collapsed ? classes.menuIconCollapsed : ''}`}>
                            {item.icon}
                        </ListItemIcon>
                        {!collapsed && (
                            <>
                                <ListItemText primary={item.label} className={classes.menuText} />
                                {openSubmenus[item.key] ? <ExpandLess /> : <ExpandMore />}
                            </>
                        )}
                    </ListItem>
                    {!collapsed && (
                        <Collapse in={openSubmenus[item.key]} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                {item.submenu.map((subItem) => (
                                    <ListItem
                                        key={subItem.path}
                                        button
                                        onClick={() => handleNavigation(subItem.path)}
                                        className={`${classes.submenuItem} ${isActive(subItem.path) ? 'active' : ''}`}
                                    >
                                        <ListItemText
                                            primary={subItem.label}
                                            primaryTypographyProps={{ style: { fontSize: '0.813rem' } }}
                                        />
                                    </ListItem>
                                ))}
                            </List>
                        </Collapse>
                    )}
                </React.Fragment>
            );
        }

        // Regular menu item
        const menuItem = (
            <Tooltip
                title={collapsed ? item.label : ''}
                placement="right"
                arrow
                key={item.path}
            >
                <ListItem
                    button
                    onClick={() => handleNavigation(item.path)}
                    className={`${classes.menuItem} ${collapsed ? classes.menuItemCollapsed : ''} ${isActive(item.path) ? 'active' : ''}`}
                >
                    <ListItemIcon className={`${classes.menuIcon} ${collapsed ? classes.menuIconCollapsed : ''}`}>
                        {item.badge ? (
                            <Badge color="secondary" variant="dot">
                                {item.icon}
                            </Badge>
                        ) : (
                            item.icon
                        )}
                    </ListItemIcon>
                    {!collapsed && <ListItemText primary={item.label} className={classes.menuText} />}
                </ListItem>
            </Tooltip>
        );

        // Wrap with Can if role specified
        if (item.role) {
            return (
                <Can key={item.path} role={user.profile} perform={item.role} yes={() => menuItem} />
            );
        }

        return menuItem;
    };

    return (
        <Drawer
            variant={variant}
            anchor="left"
            open={open}
            onClose={onClose}
            className={classes.drawer}
            classes={{
                paper: `${classes.drawerPaper} ${collapsed ? classes.drawerPaperCollapsed : ''}`,
            }}
        >
            {/* Header */}
            <div className={classes.drawerHeader}>
                {!collapsed && <img src={logo} alt="Logo" className={classes.logo} />}
                <IconButton onClick={toggleCollapsed} className={classes.toggleButton} size="small">
                    {collapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                </IconButton>
            </div>

            {/* User Profile */}
            <div className={classes.userProfile}>
                <Badge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    badgeContent={<FiberManualRecordIcon style={{ fontSize: 12, color: '#10B981' }} />}
                >
                    <Avatar className={classes.userAvatar}>{getUserInitials(user?.name)}</Avatar>
                </Badge>
                <div className={`${classes.userInfo} ${collapsed ? classes.userInfoHidden : ''}`}>
                    <Typography className={classes.userName}>{user?.name}</Typography>
                    <div className={classes.userStatus}>
                        <span className={classes.statusDot}></span>
                        Online
                    </div>
                </div>
            </div>

            {/* Search */}
            {!collapsed && (
                <div className={classes.searchContainer}>
                    <TextField
                        fullWidth
                        placeholder="Buscar..."
                        variant="outlined"
                        size="small"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className={classes.searchInput}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon style={{ fontSize: 20 }} />
                                </InputAdornment>
                            ),
                        }}
                    />
                </div>
            )}

            {/* Menu Categories */}
            <List className={classes.menuList}>
                {menuCategories.map((category) => (
                    <React.Fragment key={category.key}>
                        {!collapsed && (
                            <Typography className={classes.categoryHeader}>
                                {category.label}
                            </Typography>
                        )}
                        {category.items.map(renderMenuItem)}
                        <Divider className={classes.categoryDivider} />
                    </React.Fragment>
                ))}

                {/* Admin Section */}
                <Can
                    role={user.profile}
                    perform={adminCategory.role}
                    yes={() => (
                        <>
                            {!collapsed && (
                                <Typography className={classes.categoryHeader}>
                                    {adminCategory.label}
                                </Typography>
                            )}
                            {adminCategory.items.map(renderMenuItem)}
                        </>
                    )}
                />
            </List>

            {/* Footer */}
            <div className={classes.drawerFooter}>
                {!collapsed && (
                    <>
                        <Box className={classes.themeToggle} onClick={toggleTheme}>
                            <Typography variant="body2">Tema</Typography>
                            <IconButton size="small">
                                {colorMode.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                            </IconButton>
                        </Box>
                        <Typography className={classes.versionText}>
                            v6.0.0
                        </Typography>
                    </>
                )}
            </div>
        </Drawer>
    );
};

export default Sidebar;
