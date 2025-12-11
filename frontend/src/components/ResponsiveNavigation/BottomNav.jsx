import React from 'react';
import { BottomNavigation, BottomNavigationAction, Paper, Badge } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory, useLocation } from 'react-router-dom';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ChatIcon from '@material-ui/icons/Chat';
import ContactsIcon from '@material-ui/icons/Contacts';
import SettingsIcon from '@material-ui/icons/Settings';

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: theme.zIndex.appBar,
        display: 'none',
        [theme.breakpoints.down('sm')]: {
            display: 'block',
        },
        borderTop: `1px solid ${theme.palette.divider}`,
        boxShadow: theme.palette.mode === 'light'
            ? '0 -4px 6px -1px rgba(0, 0, 0, 0.1)'
            : '0 -4px 6px -1px rgba(0, 0, 0, 0.4)',
    },

    bottomNav: {
        backgroundColor: theme.palette.background.paper,
        height: 64,
        paddingBottom: 'env(safe-area-inset-bottom)', // iOS safe area

        '& .MuiBottomNavigationAction-root': {
            minWidth: 0,
            minHeight: 48, // Touch target mínimo
            padding: theme.spacing(0.5, 1),
            color: theme.palette.text.secondary,
            transition: 'all 0.2s ease',

            '&.Mui-selected': {
                color: theme.palette.primary.main,
                paddingTop: theme.spacing(0.5),
            },

            '&:hover': {
                backgroundColor: theme.palette.mode === 'light'
                    ? 'rgba(139, 92, 246, 0.08)'
                    : 'rgba(139, 92, 246, 0.15)',
            },

            '& .MuiBottomNavigationAction-label': {
                fontSize: '0.688rem',
                fontWeight: 600,
                marginTop: 4,

                '&.Mui-selected': {
                    fontSize: '0.75rem',
                },
            },
        },

        '& .MuiSvgIcon-root': {
            fontSize: 24,
        },
    },

    badge: {
        '& .MuiBadge-badge': {
            backgroundColor: theme.palette.error.main,
            color: '#FFFFFF',
            fontWeight: 700,
            fontSize: '0.625rem',
            minWidth: 18,
            height: 18,
            padding: '0 4px',
        },
    },

    // Spacer para compensar bottom nav
    spacer: {
        height: 64,
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
}));

const BottomNav = ({
    items = [],
    badges = {},
    onChange,
}) => {
    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();

    // Itens padrão se nenhum for fornecido
    const defaultItems = [
        {
            label: 'Dashboard',
            icon: <DashboardIcon />,
            path: '/',
            value: 'dashboard',
        },
        {
            label: 'Tickets',
            icon: <ChatIcon />,
            path: '/tickets',
            value: 'tickets',
        },
        {
            label: 'Contatos',
            icon: <ContactsIcon />,
            path: '/contacts',
            value: 'contacts',
        },
        {
            label: 'Config',
            icon: <SettingsIcon />,
            path: '/settings',
            value: 'settings',
        },
    ];

    const navItems = items.length > 0 ? items : defaultItems;

    // Determinar qual item está ativo baseado na rota atual
    const getCurrentValue = () => {
        const currentItem = navItems.find(item =>
            location.pathname === item.path ||
            location.pathname.startsWith(`${item.path}/`)
        );
        return currentItem ? currentItem.value : navItems[0]?.value;
    };

    const [value, setValue] = React.useState(getCurrentValue());

    // Atualizar quando a rota mudar
    React.useEffect(() => {
        setValue(getCurrentValue());
    }, [location.pathname]);

    const handleChange = (event, newValue) => {
        setValue(newValue);

        const selectedItem = navItems.find(item => item.value === newValue);
        if (selectedItem) {
            if (selectedItem.onClick) {
                selectedItem.onClick();
            } else if (selectedItem.path) {
                history.push(selectedItem.path);
            }
        }

        // Callback externo
        if (onChange) {
            onChange(event, newValue);
        }
    };

    return (
        <>
            <Paper className={classes.root} elevation={3}>
                <BottomNavigation
                    value={value}
                    onChange={handleChange}
                    showLabels
                    className={classes.bottomNav}
                >
                    {navItems.map((item) => {
                        const badge = badges[item.value];
                        const iconWithBadge = badge ? (
                            <Badge
                                badgeContent={badge}
                                className={classes.badge}
                                max={99}
                            >
                                {item.icon}
                            </Badge>
                        ) : item.icon;

                        return (
                            <BottomNavigationAction
                                key={item.value}
                                label={item.label}
                                value={item.value}
                                icon={iconWithBadge}
                            />
                        );
                    })}
                </BottomNavigation>
            </Paper>

            {/* Spacer para não cobrir conteúdo */}
            <div className={classes.spacer} />
        </>
    );
};

// Hook para usar Bottom Navigation facilmente
export const useBottomNav = () => {
    const [badges, setBadges] = React.useState({});

    const updateBadge = (key, count) => {
        setBadges(prev => ({
            ...prev,
            [key]: count > 0 ? count : undefined,
        }));
    };

    const clearBadge = (key) => {
        setBadges(prev => {
            const newBadges = { ...prev };
            delete newBadges[key];
            return newBadges;
        });
    };

    return {
        badges,
        updateBadge,
        clearBadge,
    };
};

export default BottomNav;
