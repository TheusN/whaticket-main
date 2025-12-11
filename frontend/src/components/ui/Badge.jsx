import React from 'react';
import { Badge as MuiBadge } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    badge: {
        '& .MuiBadge-badge': {
            fontWeight: 600,
            fontSize: '0.75rem',
            padding: '0 6px',
            height: 20,
            minWidth: 20,
            borderRadius: 10,
            border: `2px solid ${theme.palette.background.paper}`,
            boxShadow: theme.palette.mode === 'light'
                ? '0 2px 4px rgba(0, 0, 0, 0.1)'
                : '0 2px 4px rgba(0, 0, 0, 0.4)',
        },
    },

    // Color variants
    primary: {
        '& .MuiBadge-badge': {
            backgroundColor: theme.palette.primary.main,
            color: '#FFFFFF',
        },
    },

    secondary: {
        '& .MuiBadge-badge': {
            backgroundColor: theme.palette.secondary.main,
            color: '#FFFFFF',
        },
    },

    error: {
        '& .MuiBadge-badge': {
            backgroundColor: theme.palette.error.main,
            color: '#FFFFFF',
        },
    },

    warning: {
        '& .MuiBadge-badge': {
            backgroundColor: theme.palette.warning.main,
            color: '#FFFFFF',
        },
    },

    info: {
        '& .MuiBadge-badge': {
            backgroundColor: theme.palette.info.main,
            color: '#FFFFFF',
        },
    },

    success: {
        '& .MuiBadge-badge': {
            backgroundColor: theme.palette.success.main,
            color: '#FFFFFF',
        },
    },

    // Dot variant
    dot: {
        '& .MuiBadge-badge': {
            height: 10,
            minWidth: 10,
            padding: 0,
            borderRadius: '50%',
        },
    },

    // Pulse animation
    pulse: {
        '& .MuiBadge-badge': {
            animation: '$pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        },
    },

    '@keyframes pulse': {
        '0%, 100%': {
            opacity: 1,
        },
        '50%': {
            opacity: 0.7,
        },
    },
}));

const Badge = ({
    children,
    badgeContent,
    color = 'primary', // primary, secondary, error, warning, info, success
    variant = 'standard', // standard, dot
    anchorOrigin = { vertical: 'top', horizontal: 'right' },
    overlap = 'rectangular',
    invisible = false,
    showZero = false,
    max = 99,
    pulse = false,
    className = '',
    ...props
}) => {
    const classes = useStyles();

    const badgeClasses = [
        classes.badge,
        classes[color],
        variant === 'dot' && classes.dot,
        pulse && classes.pulse,
        className,
    ].filter(Boolean).join(' ');

    return (
        <MuiBadge
            className={badgeClasses}
            badgeContent={badgeContent}
            variant={variant}
            anchorOrigin={anchorOrigin}
            overlap={overlap}
            invisible={invisible}
            showZero={showZero}
            max={max}
            {...props}
        >
            {children}
        </MuiBadge>
    );
};

export default Badge;
