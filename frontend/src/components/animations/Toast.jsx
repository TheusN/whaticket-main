import React from 'react';
import { Snackbar, SnackbarContent, IconButton, Slide } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import WarningIcon from '@material-ui/icons/Warning';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
    snackbar: {
        '& .MuiSnackbarContent-root': {
            borderRadius: 12,
            padding: '12px 20px',
            boxShadow: theme.palette.mode === 'light'
                ? '0 8px 24px rgba(0, 0, 0, 0.15)'
                : '0 8px 24px rgba(0, 0, 0, 0.6)',
            minWidth: 300,
            border: 'none',
        },
    },

    content: {
        display: 'flex',
        alignItems: 'center',
        gap: 12,
    },

    icon: {
        fontSize: 24,
        flexShrink: 0,
    },

    message: {
        flex: 1,
        fontSize: '0.938rem',
        fontWeight: 500,
        lineHeight: 1.5,
    },

    closeButton: {
        padding: 4,
        marginLeft: 8,
    },

    // Variants
    success: {
        '& .MuiSnackbarContent-root': {
            backgroundColor: theme.palette.success.main,
            color: '#FFFFFF',
        },
    },

    error: {
        '& .MuiSnackbarContent-root': {
            backgroundColor: theme.palette.error.main,
            color: '#FFFFFF',
        },
    },

    warning: {
        '& .MuiSnackbarContent-root': {
            backgroundColor: theme.palette.warning.main,
            color: '#FFFFFF',
        },
    },

    info: {
        '& .MuiSnackbarContent-root': {
            backgroundColor: theme.palette.info.main,
            color: '#FFFFFF',
        },
    },

    default: {
        '& .MuiSnackbarContent-root': {
            backgroundColor: theme.palette.text.primary,
            color: theme.palette.background.paper,
        },
    },
}));

function SlideTransition(props) {
    return <Slide {...props} direction="up" />;
}

const Toast = ({
    open,
    onClose,
    message,
    variant = 'success', // success, error, warning, info, default
    autoHideDuration = 4000,
    anchorOrigin = { vertical: 'bottom', horizontal: 'right' },
    showIcon = true,
    showCloseButton = true,
}) => {
    const classes = useStyles();

    const icons = {
        success: <CheckCircleIcon className={classes.icon} />,
        error: <ErrorIcon className={classes.icon} />,
        warning: <WarningIcon className={classes.icon} />,
        info: <InfoIcon className={classes.icon} />,
        default: null,
    };

    const icon = showIcon ? icons[variant] : null;

    return (
        <Snackbar
            open={open}
            autoHideDuration={autoHideDuration}
            onClose={onClose}
            anchorOrigin={anchorOrigin}
            TransitionComponent={SlideTransition}
            className={`${classes.snackbar} ${classes[variant]}`}
        >
            <SnackbarContent
                message={
                    <div className={classes.content}>
                        {icon}
                        <span className={classes.message}>{message}</span>
                    </div>
                }
                action={
                    showCloseButton && (
                        <IconButton
                            size="small"
                            aria-label="close"
                            color="inherit"
                            onClick={onClose}
                            className={classes.closeButton}
                        >
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    )
                }
            />
        </Snackbar>
    );
};

// Hook para usar Toast facilmente
export const useToast = () => {
    const [toast, setToast] = React.useState({
        open: false,
        message: '',
        variant: 'success',
    });

    const showToast = (message, variant = 'success') => {
        setToast({
            open: true,
            message,
            variant,
        });
    };

    const hideToast = () => {
        setToast((prev) => ({ ...prev, open: false }));
    };

    return {
        toast,
        showToast,
        hideToast,
        ToastComponent: () => (
            <Toast
                open={toast.open}
                onClose={hideToast}
                message={toast.message}
                variant={toast.variant}
            />
        ),
    };
};

export default Toast;
