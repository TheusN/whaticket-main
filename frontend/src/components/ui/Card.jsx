import React from 'react';
import { Card as MuiCard, CardContent, CardHeader, CardActions, Avatar, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    card: {
        borderRadius: 16,
        border: `1px solid ${theme.palette.divider}`,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.palette.mode === 'light'
            ? '0 2px 8px rgba(0, 0, 0, 0.08)'
            : '0 2px 8px rgba(0, 0, 0, 0.4)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        overflow: 'hidden',

        '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: theme.palette.mode === 'light'
                ? '0 8px 24px rgba(0, 0, 0, 0.12)'
                : '0 8px 24px rgba(0, 0, 0, 0.6)',
        },
    },

    // Variants
    elevated: {
        boxShadow: theme.palette.mode === 'light'
            ? '0 4px 12px rgba(0, 0, 0, 0.1)'
            : '0 4px 12px rgba(0, 0, 0, 0.5)',

        '&:hover': {
            boxShadow: theme.palette.mode === 'light'
                ? '0 12px 32px rgba(0, 0, 0, 0.15)'
                : '0 12px 32px rgba(0, 0, 0, 0.7)',
        },
    },

    outlined: {
        boxShadow: 'none',
        border: `2px solid ${theme.palette.divider}`,

        '&:hover': {
            borderColor: theme.palette.primary.main,
            boxShadow: theme.palette.mode === 'light'
                ? '0 4px 12px rgba(139, 92, 246, 0.15)'
                : '0 4px 12px rgba(139, 92, 246, 0.3)',
        },
    },

    flat: {
        boxShadow: 'none',
        border: 'none',

        '&:hover': {
            boxShadow: 'none',
            transform: 'none',
        },
    },

    // Interactive
    interactive: {
        cursor: 'pointer',

        '&:active': {
            transform: 'translateY(0)',
        },
    },

    // No hover
    noHover: {
        '&:hover': {
            transform: 'none',
            boxShadow: theme.palette.mode === 'light'
                ? '0 2px 8px rgba(0, 0, 0, 0.08)'
                : '0 2px 8px rgba(0, 0, 0, 0.4)',
        },
    },

    // Header
    header: {
        padding: '20px 24px',
        borderBottom: `1px solid ${theme.palette.divider}`,

        '& .MuiCardHeader-title': {
            fontSize: '1.125rem',
            fontWeight: 600,
            color: theme.palette.text.primary,
        },

        '& .MuiCardHeader-subheader': {
            fontSize: '0.875rem',
            fontWeight: 400,
            color: theme.palette.text.secondary,
            marginTop: 4,
        },

        '& .MuiCardHeader-avatar': {
            marginRight: 16,
        },

        '& .MuiCardHeader-action': {
            marginTop: 0,
            marginRight: 0,
        },
    },

    // Content
    content: {
        padding: 24,

        '&:last-child': {
            paddingBottom: 24,
        },
    },

    // Actions
    actions: {
        padding: '16px 24px',
        borderTop: `1px solid ${theme.palette.divider}`,
        display: 'flex',
        gap: 12,
    },

    // Compact
    compact: {
        '& $header': {
            padding: '16px 20px',
        },

        '& $content': {
            padding: 20,

            '&:last-child': {
                paddingBottom: 20,
            },
        },

        '& $actions': {
            padding: '12px 20px',
        },
    },

    // Spacious
    spacious: {
        '& $header': {
            padding: '24px 32px',
        },

        '& $content': {
            padding: 32,

            '&:last-child': {
                paddingBottom: 32,
            },
        },

        '& $actions': {
            padding: '20px 32px',
        },
    },
}));

const Card = ({
    children,
    title,
    subtitle,
    avatar,
    action,
    actions,
    variant = 'default', // default, elevated, outlined, flat
    spacing = 'default', // compact, default, spacious
    interactive = false,
    hover = true,
    onClick,
    className = '',
    ...props
}) => {
    const classes = useStyles();

    const cardClasses = [
        classes.card,
        variant !== 'default' && classes[variant],
        classes[spacing],
        interactive && classes.interactive,
        !hover && classes.noHover,
        className,
    ].filter(Boolean).join(' ');

    return (
        <MuiCard
            className={cardClasses}
            onClick={interactive ? onClick : undefined}
            {...props}
        >
            {(title || subtitle || avatar || action) && (
                <CardHeader
                    className={classes.header}
                    avatar={avatar}
                    title={title}
                    subheader={subtitle}
                    action={action}
                />
            )}

            <CardContent className={classes.content}>
                {children}
            </CardContent>

            {actions && (
                <CardActions className={classes.actions}>
                    {actions}
                </CardActions>
            )}
        </MuiCard>
    );
};

export default Card;
