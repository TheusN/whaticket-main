import React from 'react';
import { Menu as MuiMenu, MenuItem, Divider, ListItemIcon, ListItemText, Fade, Grow } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    paper: {
        borderRadius: 12,
        backgroundColor: theme.palette.background.paper,
        border: `1px solid ${theme.palette.divider}`,
        boxShadow: theme.palette.mode === 'light'
            ? '0 8px 24px rgba(0, 0, 0, 0.12)'
            : '0 8px 24px rgba(0, 0, 0, 0.6)',
        marginTop: 8,
        minWidth: 200,
        padding: '8px 0',
    },

    list: {
        padding: 0,
    },

    menuItem: {
        padding: '10px 16px',
        fontSize: '0.875rem',
        fontWeight: 500,
        color: theme.palette.text.primary,
        transition: 'all 0.2s ease',
        borderRadius: 8,
        margin: '2px 8px',

        '&:hover': {
            backgroundColor: theme.palette.mode === 'light'
                ? 'rgba(139, 92, 246, 0.08)'
                : 'rgba(139, 92, 246, 0.15)',
        },

        '&:active': {
            backgroundColor: theme.palette.mode === 'light'
                ? 'rgba(139, 92, 246, 0.15)'
                : 'rgba(139, 92, 246, 0.25)',
        },

        '& .MuiListItemIcon-root': {
            minWidth: 36,
            color: theme.palette.text.secondary,

            '& svg': {
                fontSize: 20,
            },
        },

        '& .MuiListItemText-primary': {
            fontSize: '0.875rem',
            fontWeight: 500,
        },

        '& .MuiListItemText-secondary': {
            fontSize: '0.75rem',
            marginTop: 2,
        },
    },

    // Destructive action
    destructive: {
        color: theme.palette.error.main,

        '&:hover': {
            backgroundColor: theme.palette.mode === 'light'
                ? 'rgba(239, 68, 68, 0.08)'
                : 'rgba(239, 68, 68, 0.15)',
        },

        '& .MuiListItemIcon-root': {
            color: theme.palette.error.main,
        },
    },

    // Active state
    active: {
        backgroundColor: theme.palette.mode === 'light'
            ? 'rgba(139, 92, 246, 0.12)'
            : 'rgba(139, 92, 246, 0.2)',
        color: theme.palette.primary.main,

        '& .MuiListItemIcon-root': {
            color: theme.palette.primary.main,
        },

        '&:hover': {
            backgroundColor: theme.palette.mode === 'light'
                ? 'rgba(139, 92, 246, 0.15)'
                : 'rgba(139, 92, 246, 0.25)',
        },
    },

    // Disabled state
    disabled: {
        opacity: 0.5,
        pointerEvents: 'none',
    },

    // Divider
    divider: {
        margin: '8px 0',
        backgroundColor: theme.palette.divider,
    },

    // Header (non-clickable)
    header: {
        padding: '8px 16px',
        fontSize: '0.75rem',
        fontWeight: 700,
        color: theme.palette.text.secondary,
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
        cursor: 'default',
        pointerEvents: 'none',
        margin: '0 8px',

        '&:hover': {
            backgroundColor: 'transparent',
        },
    },
}));

// Transition components
const FadeTransition = React.forwardRef(function Transition(props, ref) {
    return <Fade ref={ref} {...props} />;
});

const GrowTransition = React.forwardRef(function Transition(props, ref) {
    return <Grow ref={ref} {...props} />;
});

const Menu = ({
    anchorEl,
    open,
    onClose,
    items = [], // Array of menu items
    anchorOrigin = { vertical: 'bottom', horizontal: 'right' },
    transformOrigin = { vertical: 'top', horizontal: 'right' },
    transition = 'fade', // fade, grow
    className = '',
    ...props
}) => {
    const classes = useStyles();

    const TransitionComponent = transition === 'grow' ? GrowTransition : FadeTransition;

    const renderMenuItem = (item, index) => {
        // Header
        if (item.type === 'header') {
            return (
                <MenuItem key={index} className={classes.header} disabled>
                    {item.label}
                </MenuItem>
            );
        }

        // Divider
        if (item.type === 'divider') {
            return <Divider key={index} className={classes.divider} />;
        }

        // Regular menu item
        const itemClasses = [
            classes.menuItem,
            item.destructive && classes.destructive,
            item.active && classes.active,
            item.disabled && classes.disabled,
        ].filter(Boolean).join(' ');

        return (
            <MenuItem
                key={index}
                className={itemClasses}
                onClick={(e) => {
                    if (item.onClick) {
                        item.onClick(e);
                    }
                    if (item.closeOnClick !== false) {
                        onClose();
                    }
                }}
                disabled={item.disabled}
            >
                {item.icon && (
                    <ListItemIcon>
                        {item.icon}
                    </ListItemIcon>
                )}
                <ListItemText
                    primary={item.label}
                    secondary={item.description}
                />
                {item.shortcut && (
                    <span style={{
                        marginLeft: 24,
                        fontSize: '0.75rem',
                        opacity: 0.6,
                        fontWeight: 400,
                    }}>
                        {item.shortcut}
                    </span>
                )}
            </MenuItem>
        );
    };

    return (
        <MuiMenu
            anchorEl={anchorEl}
            open={open}
            onClose={onClose}
            anchorOrigin={anchorOrigin}
            transformOrigin={transformOrigin}
            TransitionComponent={TransitionComponent}
            classes={{
                paper: classes.paper,
                list: classes.list,
            }}
            className={className}
            {...props}
        >
            {items.map((item, index) => renderMenuItem(item, index))}
        </MuiMenu>
    );
};

export default Menu;
