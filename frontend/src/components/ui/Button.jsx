import React from 'react';
import { Button as MuiButton, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    // Base styles
    button: {
        borderRadius: 8,
        fontWeight: 600,
        textTransform: 'none',
        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        position: 'relative',
        overflow: 'hidden',

        '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)',
            opacity: 0,
            transition: 'opacity 0.3s ease',
            pointerEvents: 'none',
        },

        '&:hover::before': {
            opacity: 1,
        },

        '&:disabled': {
            opacity: 0.5,
            cursor: 'not-allowed',
        },
    },

    // Variants
    primary: {
        background: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
        color: '#FFFFFF',
        boxShadow: theme.palette.mode === 'light'
            ? '0 2px 8px rgba(139, 92, 246, 0.25)'
            : '0 2px 8px rgba(0, 0, 0, 0.4)',

        '&:hover': {
            background: 'linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)',
            boxShadow: theme.palette.mode === 'light'
                ? '0 4px 16px rgba(139, 92, 246, 0.35)'
                : '0 4px 16px rgba(0, 0, 0, 0.6)',
            transform: 'translateY(-1px)',
        },

        '&:active': {
            transform: 'translateY(0)',
        },
    },

    secondary: {
        backgroundColor: theme.palette.secondary.main,
        color: '#FFFFFF',
        boxShadow: theme.palette.mode === 'light'
            ? '0 2px 8px rgba(16, 185, 129, 0.25)'
            : '0 2px 8px rgba(0, 0, 0, 0.4)',

        '&:hover': {
            backgroundColor: theme.palette.secondary.dark,
            boxShadow: theme.palette.mode === 'light'
                ? '0 4px 16px rgba(16, 185, 129, 0.35)'
                : '0 4px 16px rgba(0, 0, 0, 0.6)',
            transform: 'translateY(-1px)',
        },

        '&:active': {
            transform: 'translateY(0)',
        },
    },

    outline: {
        backgroundColor: 'transparent',
        color: theme.palette.primary.main,
        border: `2px solid ${theme.palette.primary.main}`,
        boxShadow: 'none',

        '&:hover': {
            backgroundColor: theme.palette.mode === 'light'
                ? 'rgba(139, 92, 246, 0.08)'
                : 'rgba(139, 92, 246, 0.15)',
            borderColor: theme.palette.primary.dark,
            transform: 'translateY(-1px)',
        },

        '&:active': {
            transform: 'translateY(0)',
        },
    },

    ghost: {
        backgroundColor: 'transparent',
        color: theme.palette.text.primary,
        boxShadow: 'none',

        '&:hover': {
            backgroundColor: theme.palette.mode === 'light'
                ? 'rgba(0, 0, 0, 0.04)'
                : 'rgba(255, 255, 255, 0.08)',
        },
    },

    // Sizes
    small: {
        padding: '6px 16px',
        fontSize: '0.813rem',
        height: 32,
    },

    medium: {
        padding: '10px 24px',
        fontSize: '0.875rem',
        height: 40,
    },

    large: {
        padding: '14px 32px',
        fontSize: '1rem',
        height: 48,
    },

    // Full width
    fullWidth: {
        width: '100%',
    },

    // Icon button
    iconButton: {
        minWidth: 'auto',
        padding: 8,

        '& svg': {
            fontSize: 20,
        },
    },

    // Loading
    loading: {
        pointerEvents: 'none',

        '& .button-content': {
            opacity: 0,
        },
    },

    loadingSpinner: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
}));

const Button = ({
    children,
    variant = 'primary', // primary, secondary, outline, ghost
    size = 'medium', // small, medium, large
    fullWidth = false,
    loading = false,
    disabled = false,
    startIcon,
    endIcon,
    onClick,
    type = 'button',
    className = '',
    ...props
}) => {
    const classes = useStyles();

    const buttonClasses = [
        classes.button,
        classes[variant],
        classes[size],
        fullWidth && classes.fullWidth,
        loading && classes.loading,
        className,
    ].filter(Boolean).join(' ');

    return (
        <MuiButton
            className={buttonClasses}
            disabled={disabled || loading}
            onClick={onClick}
            type={type}
            disableElevation
            disableRipple
            {...props}
        >
            <span className="button-content" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                {startIcon && <span style={{ display: 'flex', alignItems: 'center' }}>{startIcon}</span>}
                {children}
                {endIcon && <span style={{ display: 'flex', alignItems: 'center' }}>{endIcon}</span>}
            </span>
            {loading && (
                <CircularProgress
                    size={24}
                    className={classes.loadingSpinner}
                    style={{ color: variant === 'outline' || variant === 'ghost' ? 'currentColor' : '#ffffff' }}
                />
            )}
        </MuiButton>
    );
};

export default Button;
