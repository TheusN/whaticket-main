import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton, Button, Fab } from '@material-ui/core';

/**
 * Touch Target Utilities
 * Garante que todos os elementos interativos tenham no mínimo 48x48px
 * conforme as diretrizes WCAG 2.1 e Material Design
 */

const useStyles = makeStyles((theme) => ({
    touchTarget: {
        minWidth: 48,
        minHeight: 48,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
    },

    iconButton: {
        minWidth: 48,
        minHeight: 48,
        padding: 12,

        '& .MuiSvgIcon-root': {
            fontSize: 24,
        },

        // Em mobile, aumentar área de toque
        [theme.breakpoints.down('sm')]: {
            minWidth: 48,
            minHeight: 48,
            padding: 12,
        },
    },

    button: {
        minHeight: 48,
        padding: theme.spacing(1.5, 3),

        [theme.breakpoints.down('sm')]: {
            minHeight: 48,
            padding: theme.spacing(1.5, 2.5),
        },
    },

    fab: {
        minWidth: 56,
        minHeight: 56,

        '&.MuiFab-sizeSmall': {
            minWidth: 48,
            minHeight: 48,
        },

        [theme.breakpoints.down('sm')]: {
            minWidth: 56,
            minHeight: 56,
        },
    },

    chip: {
        minHeight: 48,
        fontSize: '0.938rem',
        padding: theme.spacing(0, 2),

        [theme.breakpoints.down('sm')]: {
            minHeight: 48,
        },
    },

    listItem: {
        minHeight: 48,
        padding: theme.spacing(1.5, 2),

        [theme.breakpoints.down('sm')]: {
            minHeight: 56, // Aumentar em mobile
            padding: theme.spacing(2, 2),
        },
    },

    menuItem: {
        minHeight: 48,
        padding: theme.spacing(1.5, 2),

        [theme.breakpoints.down('sm')]: {
            minHeight: 56,
            padding: theme.spacing(2, 2),
        },
    },

    link: {
        minHeight: 48,
        display: 'inline-flex',
        alignItems: 'center',
        padding: theme.spacing(1.5, 1),
        textDecoration: 'none',
        color: 'inherit',
        transition: 'all 0.2s ease',

        '&:hover': {
            textDecoration: 'none',
        },

        [theme.breakpoints.down('sm')]: {
            minHeight: 56,
            padding: theme.spacing(2, 1),
        },
    },

    checkbox: {
        minWidth: 48,
        minHeight: 48,

        '& .MuiSvgIcon-root': {
            fontSize: 24,
        },
    },

    radio: {
        minWidth: 48,
        minHeight: 48,

        '& .MuiSvgIcon-root': {
            fontSize: 24,
        },
    },

    switch: {
        minWidth: 48,
        minHeight: 48,
        padding: 12,
    },
}));

/**
 * IconButton com touch target garantido
 */
export const TouchIconButton = ({ children, className, ...props }) => {
    const classes = useStyles();
    return (
        <IconButton
            className={`${classes.iconButton} ${className || ''}`}
            {...props}
        >
            {children}
        </IconButton>
    );
};

/**
 * Button com touch target garantido
 */
export const TouchButton = ({ children, className, ...props }) => {
    const classes = useStyles();
    return (
        <Button
            className={`${classes.button} ${className || ''}`}
            {...props}
        >
            {children}
        </Button>
    );
};

/**
 * FAB com touch target garantido
 */
export const TouchFab = ({ children, className, ...props }) => {
    const classes = useStyles();
    return (
        <Fab
            className={`${classes.fab} ${className || ''}`}
            {...props}
        >
            {children}
        </Fab>
    );
};

/**
 * Wrapper genérico para garantir touch target
 */
export const TouchTarget = ({ children, component = 'div', className, ...props }) => {
    const classes = useStyles();
    const Component = component;

    return (
        <Component
            className={`${classes.touchTarget} ${className || ''}`}
            {...props}
        >
            {children}
        </Component>
    );
};

/**
 * Hook para aplicar estilos de touch target
 */
export const useTouchTarget = () => {
    const classes = useStyles();

    return {
        iconButton: classes.iconButton,
        button: classes.button,
        fab: classes.fab,
        chip: classes.chip,
        listItem: classes.listItem,
        menuItem: classes.menuItem,
        link: classes.link,
        checkbox: classes.checkbox,
        radio: classes.radio,
        switch: classes.switch,
        touchTarget: classes.touchTarget,
    };
};

/**
 * Helper para calcular se um elemento atende ao requisito de 48px
 */
export const isTouchTargetValid = (width, height) => {
    const MIN_SIZE = 48;
    return width >= MIN_SIZE && height >= MIN_SIZE;
};

/**
 * HOC para adicionar touch target a qualquer componente
 */
export const withTouchTarget = (Component) => {
    return React.forwardRef((props, ref) => {
        const classes = useStyles();
        return (
            <div className={classes.touchTarget}>
                <Component ref={ref} {...props} />
            </div>
        );
    });
};

export default TouchTarget;
