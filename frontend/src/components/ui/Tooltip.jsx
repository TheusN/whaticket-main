import React from 'react';
import { Tooltip as MuiTooltip, Zoom, Fade } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    tooltip: {
        backgroundColor: theme.palette.mode === 'light'
            ? 'rgba(23, 23, 23, 0.95)'
            : 'rgba(250, 250, 250, 0.95)',
        color: theme.palette.mode === 'light'
            ? '#FFFFFF'
            : '#171717',
        fontSize: '0.813rem',
        fontWeight: 500,
        padding: '8px 12px',
        borderRadius: 8,
        boxShadow: theme.palette.mode === 'light'
            ? '0 4px 12px rgba(0, 0, 0, 0.15)'
            : '0 4px 12px rgba(0, 0, 0, 0.6)',
        backdropFilter: 'blur(8px)',
        maxWidth: 300,
        lineHeight: 1.5,
    },

    arrow: {
        color: theme.palette.mode === 'light'
            ? 'rgba(23, 23, 23, 0.95)'
            : 'rgba(250, 250, 250, 0.95)',
    },

    // Color variants
    primary: {
        backgroundColor: 'rgba(139, 92, 246, 0.95)',
        color: '#FFFFFF',

        '& $arrow': {
            color: 'rgba(139, 92, 246, 0.95)',
        },
    },

    secondary: {
        backgroundColor: 'rgba(16, 185, 129, 0.95)',
        color: '#FFFFFF',

        '& $arrow': {
            color: 'rgba(16, 185, 129, 0.95)',
        },
    },

    error: {
        backgroundColor: 'rgba(239, 68, 68, 0.95)',
        color: '#FFFFFF',

        '& $arrow': {
            color: 'rgba(239, 68, 68, 0.95)',
        },
    },

    warning: {
        backgroundColor: 'rgba(245, 158, 11, 0.95)',
        color: '#FFFFFF',

        '& $arrow': {
            color: 'rgba(245, 158, 11, 0.95)',
        },
    },

    info: {
        backgroundColor: 'rgba(59, 130, 246, 0.95)',
        color: '#FFFFFF',

        '& $arrow': {
            color: 'rgba(59, 130, 246, 0.95)',
        },
    },

    success: {
        backgroundColor: 'rgba(16, 185, 129, 0.95)',
        color: '#FFFFFF',

        '& $arrow': {
            color: 'rgba(16, 185, 129, 0.95)',
        },
    },

    // Light variant (always light background)
    light: {
        backgroundColor: 'rgba(250, 250, 250, 0.95)',
        color: '#171717',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',

        '& $arrow': {
            color: 'rgba(250, 250, 250, 0.95)',
        },
    },

    // Dark variant (always dark background)
    dark: {
        backgroundColor: 'rgba(23, 23, 23, 0.95)',
        color: '#FFFFFF',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',

        '& $arrow': {
            color: 'rgba(23, 23, 23, 0.95)',
        },
    },
}));

// Transition components
const ZoomTransition = React.forwardRef(function Transition(props, ref) {
    return <Zoom ref={ref} {...props} />;
});

const FadeTransition = React.forwardRef(function Transition(props, ref) {
    return <Fade ref={ref} {...props} />;
});

const Tooltip = ({
    children,
    title,
    placement = 'top', // top, bottom, left, right, top-start, top-end, etc.
    arrow = true,
    color = 'default', // default, primary, secondary, error, warning, info, success, light, dark
    enterDelay = 200,
    leaveDelay = 0,
    interactive = false,
    transition = 'zoom', // zoom, fade
    className = '',
    ...props
}) => {
    const classes = useStyles();

    const TransitionComponent = transition === 'fade' ? FadeTransition : ZoomTransition;

    const tooltipClasses = {
        tooltip: `${classes.tooltip} ${color !== 'default' ? classes[color] : ''} ${className}`,
        arrow: classes.arrow,
    };

    return (
        <MuiTooltip
            title={title}
            placement={placement}
            arrow={arrow}
            enterDelay={enterDelay}
            leaveDelay={leaveDelay}
            interactive={interactive}
            TransitionComponent={TransitionComponent}
            classes={tooltipClasses}
            {...props}
        >
            {children}
        </MuiTooltip>
    );
};

export default Tooltip;
