import React from 'react';
import {
    Drawer,
    IconButton,
    AppBar,
    Toolbar,
    Typography,
    useMediaQuery,
    useTheme,
    Box,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
    appBar: {
        display: 'none',
        [theme.breakpoints.down('md')]: {
            display: 'block',
        },
        background: theme.palette.mode === 'light'
            ? 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)'
            : theme.palette.background.paper,
        boxShadow: theme.palette.mode === 'light'
            ? '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            : '0 4px 6px -1px rgba(0, 0, 0, 0.4)',
    },

    toolbar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        minHeight: 64,
        padding: theme.spacing(0, 2),
    },

    menuButton: {
        minWidth: 48,
        minHeight: 48,
        color: theme.palette.mode === 'light'
            ? '#FFFFFF'
            : theme.palette.text.primary,
        '&:hover': {
            backgroundColor: theme.palette.mode === 'light'
                ? 'rgba(255, 255, 255, 0.1)'
                : 'rgba(139, 92, 246, 0.1)',
        },
    },

    title: {
        fontWeight: 700,
        fontSize: '1.25rem',
        color: theme.palette.mode === 'light'
            ? '#FFFFFF'
            : theme.palette.text.primary,
    },

    drawer: {
        '& .MuiDrawer-paper': {
            width: '85vw',
            maxWidth: 320,
            backgroundColor: theme.palette.background.paper,
            borderRight: `1px solid ${theme.palette.divider}`,
        },
    },

    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: theme.spacing(2),
        borderBottom: `1px solid ${theme.palette.divider}`,
        minHeight: 64,
    },

    drawerContent: {
        overflowY: 'auto',
        height: 'calc(100vh - 64px)',
        ...theme.scrollbarStylesSoft,
    },

    closeButton: {
        minWidth: 48,
        minHeight: 48,
        color: theme.palette.text.primary,
        '&:hover': {
            backgroundColor: theme.palette.mode === 'light'
                ? 'rgba(139, 92, 246, 0.08)'
                : 'rgba(139, 92, 246, 0.15)',
        },
    },

    // Garantir touch targets mínimo 48px
    touchTarget: {
        minWidth: 48,
        minHeight: 48,
    },
}));

const MobileDrawer = ({
    children,
    title = 'Atendechat',
    appBarContent,
    open,
    onOpen,
    onClose,
}) => {
    const classes = useStyles();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [mobileOpen, setMobileOpen] = React.useState(false);

    // Controle externo ou interno
    const isOpen = open !== undefined ? open : mobileOpen;
    const handleOpen = onOpen || (() => setMobileOpen(true));
    const handleClose = onClose || (() => setMobileOpen(false));

    const handleDrawerToggle = () => {
        if (isOpen) {
            handleClose();
        } else {
            handleOpen();
        }
    };

    if (!isMobile) {
        // Em desktop, não renderiza a AppBar mobile
        return null;
    }

    return (
        <>
            {/* AppBar Mobile */}
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar className={classes.toolbar}>
                    <IconButton
                        edge="start"
                        onClick={handleDrawerToggle}
                        className={classes.menuButton}
                        aria-label="menu"
                    >
                        <MenuIcon />
                    </IconButton>

                    <Typography variant="h6" className={classes.title}>
                        {title}
                    </Typography>

                    {/* Conteúdo adicional da AppBar (ex: botões de ação) */}
                    {appBarContent && (
                        <Box className={classes.touchTarget}>
                            {appBarContent}
                        </Box>
                    )}
                </Toolbar>
            </AppBar>

            {/* Drawer Temporário (Mobile) */}
            <Drawer
                variant="temporary"
                anchor="left"
                open={isOpen}
                onClose={handleClose}
                className={classes.drawer}
                ModalProps={{
                    keepMounted: true, // Melhor performance em mobile
                }}
            >
                <div className={classes.drawerHeader}>
                    <Typography variant="h6" className={classes.title}>
                        {title}
                    </Typography>
                    <IconButton
                        onClick={handleClose}
                        className={classes.closeButton}
                        aria-label="close menu"
                    >
                        <CloseIcon />
                    </IconButton>
                </div>

                <div className={classes.drawerContent}>
                    {children}
                </div>
            </Drawer>

            {/* Spacer para compensar AppBar fixed */}
            <Toolbar />
        </>
    );
};

export default MobileDrawer;
