import React from 'react';
import { Paper, Typography, Box, Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import TrendingDownIcon from '@material-ui/icons/TrendingDown';

const useStyles = makeStyles((theme) => ({
    card: {
        padding: 24,
        borderRadius: 16,
        border: `1px solid ${theme.palette.divider}`,
        backgroundColor: theme.palette.background.paper,
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        position: 'relative',
        overflow: 'hidden',
        height: '100%',

        '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            background: 'linear-gradient(90deg, #8B5CF6 0%, #7C3AED 100%)',
            opacity: 0,
            transition: 'opacity 0.3s ease',
        },

        '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: theme.palette.mode === 'light'
                ? '0 12px 32px rgba(0, 0, 0, 0.12)'
                : '0 12px 32px rgba(0, 0, 0, 0.6)',

            '&::before': {
                opacity: 1,
            },
        },
    },

    header: {
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        marginBottom: 16,
    },

    iconContainer: {
        width: 56,
        height: 56,
        borderRadius: 12,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'transform 0.3s ease',

        '&:hover': {
            transform: 'scale(1.1) rotate(5deg)',
        },
    },

    // Color variants
    primary: {
        background: theme.palette.mode === 'light'
            ? 'linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(124, 58, 237, 0.15) 100%)'
            : 'linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(124, 58, 237, 0.25) 100%)',
        color: theme.palette.primary.main,
    },

    success: {
        background: theme.palette.mode === 'light'
            ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(5, 150, 105, 0.15) 100%)'
            : 'linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(5, 150, 105, 0.25) 100%)',
        color: theme.palette.success.main,
    },

    warning: {
        background: theme.palette.mode === 'light'
            ? 'linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(217, 119, 6, 0.15) 100%)'
            : 'linear-gradient(135deg, rgba(245, 158, 11, 0.2) 0%, rgba(217, 119, 6, 0.25) 100%)',
        color: theme.palette.warning.main,
    },

    error: {
        background: theme.palette.mode === 'light'
            ? 'linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(220, 38, 38, 0.15) 100%)'
            : 'linear-gradient(135deg, rgba(239, 68, 68, 0.2) 0%, rgba(220, 38, 38, 0.25) 100%)',
        color: theme.palette.error.main,
    },

    info: {
        background: theme.palette.mode === 'light'
            ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(37, 99, 235, 0.15) 100%)'
            : 'linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(37, 99, 235, 0.25) 100%)',
        color: theme.palette.info.main,
    },

    title: {
        fontSize: '0.875rem',
        fontWeight: 500,
        color: theme.palette.text.secondary,
        marginBottom: 8,
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
    },

    value: {
        fontSize: '2rem',
        fontWeight: 700,
        color: theme.palette.text.primary,
        marginBottom: 12,
        lineHeight: 1.2,
    },

    footer: {
        display: 'flex',
        alignItems: 'center',
        gap: 8,
    },

    trend: {
        display: 'flex',
        alignItems: 'center',
        gap: 4,
        fontSize: '0.813rem',
        fontWeight: 600,
        padding: '4px 8px',
        borderRadius: 6,
    },

    trendUp: {
        color: theme.palette.success.main,
        backgroundColor: theme.palette.mode === 'light'
            ? 'rgba(16, 185, 129, 0.1)'
            : 'rgba(16, 185, 129, 0.2)',
    },

    trendDown: {
        color: theme.palette.error.main,
        backgroundColor: theme.palette.mode === 'light'
            ? 'rgba(239, 68, 68, 0.1)'
            : 'rgba(239, 68, 68, 0.2)',
    },

    description: {
        fontSize: '0.813rem',
        color: theme.palette.text.secondary,
    },

    loading: {
        animation: '$pulse 1.5s ease-in-out infinite',
    },

    '@keyframes pulse': {
        '0%, 100%': {
            opacity: 1,
        },
        '50%': {
            opacity: 0.6,
        },
    },
}));

const StatCard = ({
    title,
    value,
    icon,
    color = 'primary', // primary, success, warning, error, info
    trend,
    trendValue,
    description,
    loading = false,
    onClick,
}) => {
    const classes = useStyles();

    const formatValue = (val) => {
        if (typeof val === 'number') {
            return val.toLocaleString('pt-BR');
        }
        return val;
    };

    const renderTrend = () => {
        if (!trend || !trendValue) return null;

        const isPositive = trend === 'up';
        const TrendIcon = isPositive ? TrendingUpIcon : TrendingDownIcon;

        return (
            <div className={`${classes.trend} ${isPositive ? classes.trendUp : classes.trendDown}`}>
                <TrendIcon style={{ fontSize: 16 }} />
                <span>{trendValue}</span>
            </div>
        );
    };

    return (
        <Paper
            className={`${classes.card} ${loading ? classes.loading : ''}`}
            onClick={onClick}
            style={{ cursor: onClick ? 'pointer' : 'default' }}
        >
            <div className={classes.header}>
                <div>
                    <Typography className={classes.title}>{title}</Typography>
                    <Typography className={classes.value}>
                        {loading ? '---' : formatValue(value)}
                    </Typography>
                </div>
                <div className={`${classes.iconContainer} ${classes[color]}`}>
                    {icon}
                </div>
            </div>

            <div className={classes.footer}>
                {renderTrend()}
                {description && (
                    <Typography className={classes.description}>
                        {description}
                    </Typography>
                )}
            </div>
        </Paper>
    );
};

export default StatCard;
