import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    IconButton,
    Slide,
    Fade,
    Zoom,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
    paper: {
        borderRadius: 20,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.palette.mode === 'light'
            ? '0 20px 60px rgba(0, 0, 0, 0.2)'
            : '0 20px 60px rgba(0, 0, 0, 0.8)',
        border: `1px solid ${theme.palette.divider}`,
        overflow: 'hidden',
    },

    // Backdrop
    backdrop: {
        backgroundColor: theme.palette.mode === 'light'
            ? 'rgba(0, 0, 0, 0.5)'
            : 'rgba(0, 0, 0, 0.7)',
        backdropFilter: 'blur(8px)',
    },

    // Title
    title: {
        padding: '24px 32px',
        borderBottom: `1px solid ${theme.palette.divider}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',

        '& h2': {
            fontSize: '1.5rem',
            fontWeight: 700,
            color: theme.palette.text.primary,
            margin: 0,
        },
    },

    // Close button
    closeButton: {
        color: theme.palette.text.secondary,
        padding: 8,
        transition: 'all 0.2s ease',

        '&:hover': {
            backgroundColor: theme.palette.mode === 'light'
                ? 'rgba(0, 0, 0, 0.04)'
                : 'rgba(255, 255, 255, 0.08)',
            color: theme.palette.text.primary,
        },
    },

    // Content
    content: {
        padding: '32px',
        color: theme.palette.text.primary,

        '&:first-child': {
            paddingTop: 32,
        },
    },

    // Actions
    actions: {
        padding: '20px 32px',
        borderTop: `1px solid ${theme.palette.divider}`,
        gap: 12,
    },

    // Sizes
    small: {
        maxWidth: 400,
    },

    medium: {
        maxWidth: 600,
    },

    large: {
        maxWidth: 800,
    },

    xlarge: {
        maxWidth: 1000,
    },

    fullWidth: {
        width: '100%',
        margin: 32,
    },

    // Compact spacing
    compact: {
        '& $title': {
            padding: '20px 24px',
        },

        '& $content': {
            padding: 24,

            '&:first-child': {
                paddingTop: 24,
            },
        },

        '& $actions': {
            padding: '16px 24px',
        },
    },

    // Centered content
    centered: {
        '& $content': {
            textAlign: 'center',
        },
    },

    // No dividers
    noDividers: {
        '& $title': {
            borderBottom: 'none',
        },

        '& $actions': {
            borderTop: 'none',
        },
    },
}));

// Transition components
const SlideTransition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const FadeTransition = React.forwardRef(function Transition(props, ref) {
    return <Fade ref={ref} {...props} />;
});

const ZoomTransition = React.forwardRef(function Transition(props, ref) {
    return <Zoom ref={ref} {...props} />;
});

const Modal = ({
    open,
    onClose,
    title,
    children,
    actions,
    size = 'medium', // small, medium, large, xlarge
    transition = 'fade', // fade, slide, zoom
    fullWidth = false,
    compact = false,
    centered = false,
    dividers = true,
    closeButton = true,
    disableBackdropClick = false,
    disableEscapeKeyDown = false,
    className = '',
    ...props
}) => {
    const classes = useStyles();

    const transitionComponents = {
        fade: FadeTransition,
        slide: SlideTransition,
        zoom: ZoomTransition,
    };

    const TransitionComponent = transitionComponents[transition] || FadeTransition;

    const paperClasses = [
        classes.paper,
        classes[size],
        fullWidth && classes.fullWidth,
        compact && classes.compact,
        centered && classes.centered,
        !dividers && classes.noDividers,
        className,
    ].filter(Boolean).join(' ');

    const handleClose = (event, reason) => {
        if (disableBackdropClick && reason === 'backdropClick') {
            return;
        }
        if (disableEscapeKeyDown && reason === 'escapeKeyDown') {
            return;
        }
        onClose && onClose();
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            TransitionComponent={TransitionComponent}
            classes={{ paper: paperClasses }}
            BackdropProps={{
                className: classes.backdrop,
            }}
            {...props}
        >
            {title && (
                <DialogTitle className={classes.title} disableTypography>
                    <h2>{title}</h2>
                    {closeButton && (
                        <IconButton
                            aria-label="close"
                            className={classes.closeButton}
                            onClick={onClose}
                        >
                            <CloseIcon />
                        </IconButton>
                    )}
                </DialogTitle>
            )}

            <DialogContent className={classes.content}>
                {children}
            </DialogContent>

            {actions && (
                <DialogActions className={classes.actions}>
                    {actions}
                </DialogActions>
            )}
        </Dialog>
    );
};

export default Modal;
