import React from 'react';
import { Box, Grid, Paper } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    skeleton: {
        backgroundColor: theme.palette.mode === 'light'
            ? 'rgba(0, 0, 0, 0.08)'
            : 'rgba(255, 255, 255, 0.08)',
        borderRadius: 8,

        '&::after': {
            background: theme.palette.mode === 'light'
                ? 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.8), transparent)'
                : 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)',
        },
    },

    rounded: {
        borderRadius: 12,
    },

    card: {
        padding: 24,
        borderRadius: 16,
        border: `1px solid ${theme.palette.divider}`,
        backgroundColor: theme.palette.background.paper,
    },
}));

// Dashboard Stat Card Skeleton
export const SkeletonStatCard = () => {
    const classes = useStyles();

    return (
        <Paper className={classes.card}>
            <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                <Box flex={1}>
                    <Skeleton
                        variant="text"
                        width="60%"
                        height={20}
                        className={classes.skeleton}
                    />
                    <Skeleton
                        variant="text"
                        width="40%"
                        height={40}
                        className={classes.skeleton}
                        style={{ marginTop: 8 }}
                    />
                </Box>
                <Skeleton
                    variant="rectangular"
                    width={56}
                    height={56}
                    className={classes.rounded}
                />
            </Box>
            <Skeleton
                variant="text"
                width="50%"
                height={16}
                className={classes.skeleton}
            />
        </Paper>
    );
};

// Table Row Skeleton
export const SkeletonTableRow = ({ columns = 5 }) => {
    const classes = useStyles();

    return (
        <Box display="flex" gap={2} p={2} alignItems="center">
            {Array.from({ length: columns }).map((_, index) => (
                <Skeleton
                    key={index}
                    variant="text"
                    width={index === 0 ? '30%' : '15%'}
                    height={24}
                    className={classes.skeleton}
                />
            ))}
        </Box>
    );
};

// Chat Message Skeleton
export const SkeletonChatMessage = ({ incoming = true }) => {
    const classes = useStyles();

    return (
        <Box
            display="flex"
            justifyContent={incoming ? 'flex-start' : 'flex-end'}
            mb={2}
        >
            {incoming && (
                <Skeleton
                    variant="circular"
                    width={40}
                    height={40}
                    className={classes.skeleton}
                    style={{ marginRight: 12 }}
                />
            )}
            <Box maxWidth="60%">
                <Skeleton
                    variant="rectangular"
                    width="100%"
                    height={60}
                    className={classes.rounded}
                />
            </Box>
        </Box>
    );
};

// Ticket List Item Skeleton
export const SkeletonTicketItem = () => {
    const classes = useStyles();

    return (
        <Paper className={classes.card} style={{ marginBottom: 12 }}>
            <Box display="flex" gap={2}>
                <Skeleton
                    variant="circular"
                    width={48}
                    height={48}
                    className={classes.skeleton}
                />
                <Box flex={1}>
                    <Skeleton
                        variant="text"
                        width="70%"
                        height={20}
                        className={classes.skeleton}
                    />
                    <Skeleton
                        variant="text"
                        width="50%"
                        height={16}
                        className={classes.skeleton}
                        style={{ marginTop: 8 }}
                    />
                    <Box display="flex" gap={1} mt={1}>
                        <Skeleton
                            variant="rectangular"
                            width={60}
                            height={24}
                            className={classes.rounded}
                        />
                        <Skeleton
                            variant="rectangular"
                            width={80}
                            height={24}
                            className={classes.rounded}
                        />
                    </Box>
                </Box>
                <Skeleton
                    variant="text"
                    width={60}
                    height={16}
                    className={classes.skeleton}
                />
            </Box>
        </Paper>
    );
};

// Contact Card Skeleton
export const SkeletonContactCard = () => {
    const classes = useStyles();

    return (
        <Paper className={classes.card}>
            <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
                <Skeleton
                    variant="circular"
                    width={80}
                    height={80}
                    className={classes.skeleton}
                />
                <Skeleton
                    variant="text"
                    width="60%"
                    height={24}
                    className={classes.skeleton}
                />
                <Skeleton
                    variant="text"
                    width="40%"
                    height={16}
                    className={classes.skeleton}
                />
                <Box display="flex" gap={1} width="100%" mt={1}>
                    <Skeleton
                        variant="rectangular"
                        width="48%"
                        height={36}
                        className={classes.rounded}
                    />
                    <Skeleton
                        variant="rectangular"
                        width="48%"
                        height={36}
                        className={classes.rounded}
                    />
                </Box>
            </Box>
        </Paper>
    );
};

// Chart Skeleton
export const SkeletonChart = ({ height = 300 }) => {
    const classes = useStyles();

    return (
        <Paper className={classes.card}>
            <Skeleton
                variant="text"
                width="30%"
                height={28}
                className={classes.skeleton}
                style={{ marginBottom: 16 }}
            />
            <Skeleton
                variant="rectangular"
                width="100%"
                height={height}
                className={classes.rounded}
            />
        </Paper>
    );
};

// Full Dashboard Skeleton
export const SkeletonDashboard = () => {
    return (
        <Box>
            {/* Filters Skeleton */}
            <Paper style={{ padding: 24, marginBottom: 24, borderRadius: 16 }}>
                <Grid container spacing={2}>
                    {Array.from({ length: 4 }).map((_, index) => (
                        <Grid item xs={12} sm={6} md={3} key={index}>
                            <Skeleton variant="rectangular" height={40} style={{ borderRadius: 12 }} />
                        </Grid>
                    ))}
                </Grid>
            </Paper>

            {/* Stat Cards Skeleton */}
            <Grid container spacing={3} style={{ marginBottom: 24 }}>
                {Array.from({ length: 4 }).map((_, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index}>
                        <SkeletonStatCard />
                    </Grid>
                ))}
            </Grid>

            {/* Charts Skeleton */}
            <Grid container spacing={3} style={{ marginBottom: 24 }}>
                <Grid item xs={12} md={8}>
                    <SkeletonChart height={300} />
                </Grid>
                <Grid item xs={12} md={4}>
                    <SkeletonChart height={300} />
                </Grid>
            </Grid>
        </Box>
    );
};

// Full Page Skeleton
export const SkeletonPage = () => {
    const classes = useStyles();

    return (
        <Box p={3}>
            <Skeleton
                variant="text"
                width="30%"
                height={40}
                className={classes.skeleton}
                style={{ marginBottom: 24 }}
            />
            <Grid container spacing={3}>
                {Array.from({ length: 6 }).map((_, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <SkeletonContactCard />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default {
    SkeletonStatCard,
    SkeletonTableRow,
    SkeletonChatMessage,
    SkeletonTicketItem,
    SkeletonContactCard,
    SkeletonChart,
    SkeletonDashboard,
    SkeletonPage,
};
