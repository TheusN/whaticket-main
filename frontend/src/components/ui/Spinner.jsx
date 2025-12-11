import React from 'react';
import { CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },

    spinner: {
        color: theme.palette.primary.main,
    },

    // Color variants
    primary: {
        color: theme.palette.primary.main,
    },

    secondary: {
        color: theme.palette.secondary.main,
    },

    error: {
        color: theme.palette.error.main,
    },

    warning: {
        color: theme.palette.warning.main,
    },

    info: {
        color: theme.palette.info.main,
    },

    success: {
        color: theme.palette.success.main,
    },

    white: {
        color: '#FFFFFF',
    },

    // Sizes
    small: {
        width: 20,
        height: 20,
    },

    medium: {
        width: 32,
        height: 32,
    },

    large: {
        width: 48,
        height: 48,
    },

    xlarge: {
        width: 64,
        height: 64,
    },

    // With overlay
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: theme.palette.mode === 'light'
            ? 'rgba(255, 255, 255, 0.8)'
            : 'rgba(0, 0, 0, 0.8)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backdropFilter: 'blur(4px)',
    },

    // With text
    withText: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 16,
    },

    text: {
        fontSize: '0.875rem',
        fontWeight: 500,
        color: theme.palette.text.primary,
    },
}));

const Spinner = ({
    size = 'medium', // small, medium, large, xlarge
    color = 'primary', // primary, secondary, error, warning, info, success, white
    overlay = false,
    text,
    thickness = 4,
    className = '',
    ...props
}) => {
    const classes = useStyles();

    const spinnerClasses = [
        classes.spinner,
        classes[color],
        classes[size],
        className,
    ].filter(Boolean).join(' ');

    const spinner = (
        <div className={text ? classes.withText : classes.container}>
            <CircularProgress
                className={spinnerClasses}
                thickness={thickness}
                {...props}
            />
            {text && <span className={classes.text}>{text}</span>}
        </div>
    );

    if (overlay) {
        return (
            <div className={classes.overlay}>
                {spinner}
            </div>
        );
    }

    return spinner;
};

// Dots spinner (alternative style)
export const DotsSpinner = ({ size = 'medium', color = 'primary', className = '' }) => {
    const classes = useStyles();

    const dotSizes = {
        small: 6,
        medium: 8,
        large: 10,
        xlarge: 12,
    };

    const dotSize = dotSizes[size] || 8;

    const dotStyles = {
        width: dotSize,
        height: dotSize,
        borderRadius: '50%',
        backgroundColor: 'currentColor',
        animation: 'dotPulse 1.4s ease-in-out infinite',
    };

    const containerStyles = {
        display: 'flex',
        gap: dotSize,
        alignItems: 'center',
        justifyContent: 'center',
    };

    return (
        <div className={`${classes[color]} ${className}`} style={containerStyles}>
            <style>
                {`
                    @keyframes dotPulse {
                        0%, 80%, 100% { opacity: 0.3; transform: scale(0.8); }
                        40% { opacity: 1; transform: scale(1); }
                    }
                `}
            </style>
            <div style={{ ...dotStyles, animationDelay: '0s' }} />
            <div style={{ ...dotStyles, animationDelay: '0.2s' }} />
            <div style={{ ...dotStyles, animationDelay: '0.4s' }} />
        </div>
    );
};

// Pulse spinner (alternative style)
export const PulseSpinner = ({ size = 'medium', color = 'primary', className = '' }) => {
    const classes = useStyles();

    const pulseSizes = {
        small: 20,
        medium: 32,
        large: 48,
        xlarge: 64,
    };

    const pulseSize = pulseSizes[size] || 32;

    const pulseStyles = {
        width: pulseSize,
        height: pulseSize,
        borderRadius: '50%',
        backgroundColor: 'currentColor',
        animation: 'pulse 1.5s ease-in-out infinite',
    };

    return (
        <div className={`${classes.container} ${classes[color]} ${className}`}>
            <style>
                {`
                    @keyframes pulse {
                        0%, 100% { opacity: 1; transform: scale(1); }
                        50% { opacity: 0.5; transform: scale(0.8); }
                    }
                `}
            </style>
            <div style={pulseStyles} />
        </div>
    );
};

export default Spinner;
