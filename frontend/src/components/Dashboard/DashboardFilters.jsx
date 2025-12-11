import React from 'react';
import { Paper, Grid, TextField, MenuItem, IconButton, Tooltip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import RefreshIcon from '@material-ui/icons/Refresh';
import TodayIcon from '@material-ui/icons/Today';
import DateRangeIcon from '@material-ui/icons/DateRange';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';

const useStyles = makeStyles((theme) => ({
    container: {
        padding: 24,
        borderRadius: 16,
        border: `1px solid ${theme.palette.divider}`,
        backgroundColor: theme.palette.background.paper,
        marginBottom: 24,
    },

    filterField: {
        '& .MuiOutlinedInput-root': {
            borderRadius: 12,
            backgroundColor: theme.palette.mode === 'light'
                ? 'rgba(0, 0, 0, 0.02)'
                : 'rgba(255, 255, 255, 0.02)',

            '&:hover': {
                backgroundColor: theme.palette.mode === 'light'
                    ? 'rgba(0, 0, 0, 0.04)'
                    : 'rgba(255, 255, 255, 0.04)',
            },

            '&.Mui-focused': {
                backgroundColor: theme.palette.background.paper,
                boxShadow: `0 0 0 2px ${theme.palette.primary.main}25`,
            },
        },

        '& .MuiInputLabel-root': {
            fontWeight: 500,
        },
    },

    quickFilters: {
        display: 'flex',
        gap: 8,
        flexWrap: 'wrap',
    },

    quickFilterButton: {
        padding: '8px 16px',
        borderRadius: 8,
        border: `1px solid ${theme.palette.divider}`,
        backgroundColor: theme.palette.background.paper,
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        fontSize: '0.875rem',
        fontWeight: 500,
        color: theme.palette.text.secondary,

        '&:hover': {
            borderColor: theme.palette.primary.main,
            backgroundColor: theme.palette.mode === 'light'
                ? 'rgba(139, 92, 246, 0.08)'
                : 'rgba(139, 92, 246, 0.15)',
            color: theme.palette.primary.main,
        },

        '&.active': {
            borderColor: theme.palette.primary.main,
            backgroundColor: theme.palette.mode === 'light'
                ? 'rgba(139, 92, 246, 0.12)'
                : 'rgba(139, 92, 246, 0.2)',
            color: theme.palette.primary.main,
        },

        '& svg': {
            fontSize: 18,
        },
    },

    refreshButton: {
        backgroundColor: theme.palette.mode === 'light'
            ? 'rgba(139, 92, 246, 0.08)'
            : 'rgba(139, 92, 246, 0.15)',
        color: theme.palette.primary.main,

        '&:hover': {
            backgroundColor: theme.palette.mode === 'light'
                ? 'rgba(139, 92, 246, 0.15)'
                : 'rgba(139, 92, 246, 0.25)',
        },
    },
}));

const DashboardFilters = ({
    dateFrom,
    dateTo,
    onDateFromChange,
    onDateToChange,
    users = [],
    selectedUser,
    onUserChange,
    queues = [],
    selectedQueue,
    onQueueChange,
    onRefresh,
    quickPeriod,
    onQuickPeriodChange,
}) => {
    const classes = useStyles();

    const quickPeriods = [
        { value: 'today', label: 'Hoje', icon: <TodayIcon /> },
        { value: 'week', label: 'Esta Semana', icon: <CalendarTodayIcon /> },
        { value: 'month', label: 'Este Mês', icon: <DateRangeIcon /> },
    ];

    return (
        <Paper className={classes.container}>
            <Grid container spacing={3} alignItems="center">
                {/* Quick Period Filters */}
                <Grid item xs={12}>
                    <div className={classes.quickFilters}>
                        {quickPeriods.map((period) => (
                            <div
                                key={period.value}
                                className={`${classes.quickFilterButton} ${quickPeriod === period.value ? 'active' : ''}`}
                                onClick={() => onQuickPeriodChange(period.value)}
                            >
                                {period.icon}
                                {period.label}
                            </div>
                        ))}
                    </div>
                </Grid>

                {/* Date Range */}
                <Grid item xs={12} sm={6} md={3}>
                    <TextField
                        fullWidth
                        label="Data Inicial"
                        type="date"
                        value={dateFrom}
                        onChange={(e) => onDateFromChange(e.target.value)}
                        InputLabelProps={{ shrink: true }}
                        variant="outlined"
                        size="small"
                        className={classes.filterField}
                    />
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <TextField
                        fullWidth
                        label="Data Final"
                        type="date"
                        value={dateTo}
                        onChange={(e) => onDateToChange(e.target.value)}
                        InputLabelProps={{ shrink: true }}
                        variant="outlined"
                        size="small"
                        className={classes.filterField}
                    />
                </Grid>

                {/* User Filter */}
                {users.length > 0 && (
                    <Grid item xs={12} sm={6} md={3}>
                        <TextField
                            fullWidth
                            select
                            label="Atendente"
                            value={selectedUser || ''}
                            onChange={(e) => onUserChange(e.target.value)}
                            variant="outlined"
                            size="small"
                            className={classes.filterField}
                        >
                            <MenuItem value="">Todos</MenuItem>
                            {users.map((user) => (
                                <MenuItem key={user.id} value={user.id}>
                                    {user.name}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                )}

                {/* Queue Filter */}
                {queues.length > 0 && (
                    <Grid item xs={12} sm={6} md={2}>
                        <TextField
                            fullWidth
                            select
                            label="Fila"
                            value={selectedQueue || ''}
                            onChange={(e) => onQueueChange(e.target.value)}
                            variant="outlined"
                            size="small"
                            className={classes.filterField}
                        >
                            <MenuItem value="">Todas</MenuItem>
                            {queues.map((queue) => (
                                <MenuItem key={queue.id} value={queue.id}>
                                    {queue.name}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                )}

                {/* Refresh Button */}
                <Grid item xs={12} sm={6} md={1}>
                    <Tooltip title="Atualizar" arrow>
                        <IconButton
                            onClick={onRefresh}
                            className={classes.refreshButton}
                        >
                            <RefreshIcon />
                        </IconButton>
                    </Tooltip>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default DashboardFilters;
