import React from 'react';
import { Chip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    pill: {
        borderRadius: 16,
        fontWeight: 600,
        fontSize: '0.813rem',
        height: 28,
        transition: 'all 0.2s ease',

        '& .MuiChip-label': {
            paddingLeft: 12,
            paddingRight: 12,
        },

        '& .MuiChip-icon': {
            marginLeft: 8,
            marginRight: -4,
            fontSize: 18,
        },

        '& .MuiChip-deleteIcon': {
            marginRight: 4,
            marginLeft: -4,
            fontSize: 18,
            color: 'currentColor',
            opacity: 0.7,
            transition: 'opacity 0.2s ease',

            '&:hover': {
                opacity: 1,
            },
        },
    },

    // Color variants
    primary: {
        backgroundColor: theme.palette.mode === 'light'
            ? 'rgba(139, 92, 246, 0.12)'
            : 'rgba(139, 92, 246, 0.2)',
        color: theme.palette.primary.main,
        border: `1px solid ${theme.palette.mode === 'light' ? 'rgba(139, 92, 246, 0.3)' : 'rgba(139, 92, 246, 0.5)'}`,

        '&:hover': {
            backgroundColor: theme.palette.mode === 'light'
                ? 'rgba(139, 92, 246, 0.2)'
                : 'rgba(139, 92, 246, 0.3)',
        },
    },

    secondary: {
        backgroundColor: theme.palette.mode === 'light'
            ? 'rgba(16, 185, 129, 0.12)'
            : 'rgba(16, 185, 129, 0.2)',
        color: theme.palette.secondary.main,
        border: `1px solid ${theme.palette.mode === 'light' ? 'rgba(16, 185, 129, 0.3)' : 'rgba(16, 185, 129, 0.5)'}`,

        '&:hover': {
            backgroundColor: theme.palette.mode === 'light'
                ? 'rgba(16, 185, 129, 0.2)'
                : 'rgba(16, 185, 129, 0.3)',
        },
    },

    error: {
        backgroundColor: theme.palette.mode === 'light'
            ? 'rgba(239, 68, 68, 0.12)'
            : 'rgba(239, 68, 68, 0.2)',
        color: theme.palette.error.main,
        border: `1px solid ${theme.palette.mode === 'light' ? 'rgba(239, 68, 68, 0.3)' : 'rgba(239, 68, 68, 0.5)'}`,

        '&:hover': {
            backgroundColor: theme.palette.mode === 'light'
                ? 'rgba(239, 68, 68, 0.2)'
                : 'rgba(239, 68, 68, 0.3)',
        },
    },

    warning: {
        backgroundColor: theme.palette.mode === 'light'
            ? 'rgba(245, 158, 11, 0.12)'
            : 'rgba(245, 158, 11, 0.2)',
        color: theme.palette.warning.main,
        border: `1px solid ${theme.palette.mode === 'light' ? 'rgba(245, 158, 11, 0.3)' : 'rgba(245, 158, 11, 0.5)'}`,

        '&:hover': {
            backgroundColor: theme.palette.mode === 'light'
                ? 'rgba(245, 158, 11, 0.2)'
                : 'rgba(245, 158, 11, 0.3)',
        },
    },

    info: {
        backgroundColor: theme.palette.mode === 'light'
            ? 'rgba(59, 130, 246, 0.12)'
            : 'rgba(59, 130, 246, 0.2)',
        color: theme.palette.info.main,
        border: `1px solid ${theme.palette.mode === 'light' ? 'rgba(59, 130, 246, 0.3)' : 'rgba(59, 130, 246, 0.5)'}`,

        '&:hover': {
            backgroundColor: theme.palette.mode === 'light'
                ? 'rgba(59, 130, 246, 0.2)'
                : 'rgba(59, 130, 246, 0.3)',
        },
    },

    success: {
        backgroundColor: theme.palette.mode === 'light'
            ? 'rgba(16, 185, 129, 0.12)'
            : 'rgba(16, 185, 129, 0.2)',
        color: theme.palette.success.main,
        border: `1px solid ${theme.palette.mode === 'light' ? 'rgba(16, 185, 129, 0.3)' : 'rgba(16, 185, 129, 0.5)'}`,

        '&:hover': {
            backgroundColor: theme.palette.mode === 'light'
                ? 'rgba(16, 185, 129, 0.2)'
                : 'rgba(16, 185, 129, 0.3)',
        },
    },

    neutral: {
        backgroundColor: theme.palette.mode === 'light'
            ? 'rgba(115, 115, 115, 0.12)'
            : 'rgba(163, 163, 163, 0.2)',
        color: theme.palette.text.secondary,
        border: `1px solid ${theme.palette.divider}`,

        '&:hover': {
            backgroundColor: theme.palette.mode === 'light'
                ? 'rgba(115, 115, 115, 0.2)'
                : 'rgba(163, 163, 163, 0.3)',
        },
    },

    // Filled variant
    filled: {
        border: 'none',

        '&$primary': {
            backgroundColor: theme.palette.primary.main,
            color: '#FFFFFF',

            '&:hover': {
                backgroundColor: theme.palette.primary.dark,
            },
        },

        '&$secondary': {
            backgroundColor: theme.palette.secondary.main,
            color: '#FFFFFF',

            '&:hover': {
                backgroundColor: theme.palette.secondary.dark,
            },
        },

        '&$error': {
            backgroundColor: theme.palette.error.main,
            color: '#FFFFFF',

            '&:hover': {
                backgroundColor: theme.palette.error.dark,
            },
        },

        '&$warning': {
            backgroundColor: theme.palette.warning.main,
            color: '#FFFFFF',

            '&:hover': {
                backgroundColor: theme.palette.warning.dark,
            },
        },

        '&$info': {
            backgroundColor: theme.palette.info.main,
            color: '#FFFFFF',

            '&:hover': {
                backgroundColor: theme.palette.info.dark,
            },
        },

        '&$success': {
            backgroundColor: theme.palette.success.main,
            color: '#FFFFFF',

            '&:hover': {
                backgroundColor: theme.palette.success.dark,
            },
        },

        '&$neutral': {
            backgroundColor: theme.palette.text.secondary,
            color: '#FFFFFF',

            '&:hover': {
                backgroundColor: theme.palette.text.primary,
            },
        },
    },

    // Sizes
    small: {
        height: 24,
        fontSize: '0.75rem',

        '& .MuiChip-label': {
            paddingLeft: 10,
            paddingRight: 10,
        },
    },

    large: {
        height: 32,
        fontSize: '0.875rem',

        '& .MuiChip-label': {
            paddingLeft: 14,
            paddingRight: 14,
        },
    },

    // Clickable
    clickable: {
        cursor: 'pointer',

        '&:hover': {
            transform: 'translateY(-1px)',
        },

        '&:active': {
            transform: 'translateY(0)',
        },
    },
}));

const Pill = ({
    label,
    color = 'primary', // primary, secondary, error, warning, info, success, neutral
    variant = 'outlined', // outlined, filled
    size = 'medium', // small, medium, large
    icon,
    onDelete,
    onClick,
    className = '',
    ...props
}) => {
    const classes = useStyles();

    const pillClasses = [
        classes.pill,
        classes[color],
        variant === 'filled' && classes.filled,
        classes[size],
        onClick && classes.clickable,
        className,
    ].filter(Boolean).join(' ');

    return (
        <Chip
            className={pillClasses}
            label={label}
            icon={icon}
            onDelete={onDelete}
            onClick={onClick}
            {...props}
        />
    );
};

export default Pill;
