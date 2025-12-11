import React from 'react';
import {
    Paper,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Avatar,
    Chip,
    Typography,
    Box,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

const useStyles = makeStyles((theme) => ({
    container: {
        borderRadius: 16,
        border: `1px solid ${theme.palette.divider}`,
        backgroundColor: theme.palette.background.paper,
        overflow: 'hidden',
    },

    header: {
        padding: '20px 24px',
        borderBottom: `1px solid ${theme.palette.divider}`,
    },

    title: {
        fontSize: '1.125rem',
        fontWeight: 600,
        color: theme.palette.text.primary,
    },

    table: {
        '& .MuiTableCell-head': {
            backgroundColor: theme.palette.mode === 'light'
                ? 'rgba(0, 0, 0, 0.02)'
                : 'rgba(255, 255, 255, 0.02)',
            color: theme.palette.text.secondary,
            fontWeight: 600,
            fontSize: '0.813rem',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            padding: '16px 24px',
            borderBottom: `2px solid ${theme.palette.divider}`,
        },

        '& .MuiTableCell-body': {
            padding: '16px 24px',
            fontSize: '0.875rem',
            borderBottom: `1px solid ${theme.palette.divider}`,
        },

        '& .MuiTableRow-root': {
            transition: 'background-color 0.2s ease',

            '&:hover': {
                backgroundColor: theme.palette.mode === 'light'
                    ? 'rgba(139, 92, 246, 0.04)'
                    : 'rgba(139, 92, 246, 0.08)',
            },

            '&:last-child .MuiTableCell-body': {
                borderBottom: 'none',
            },
        },
    },

    userCell: {
        display: 'flex',
        alignItems: 'center',
        gap: 12,
    },

    avatar: {
        width: 40,
        height: 40,
        backgroundColor: theme.palette.primary.main,
        fontWeight: 600,
    },

    userName: {
        fontWeight: 500,
        color: theme.palette.text.primary,
        marginBottom: 2,
    },

    userStatus: {
        fontSize: '0.75rem',
        color: theme.palette.text.secondary,
        display: 'flex',
        alignItems: 'center',
        gap: 4,
    },

    statusDot: {
        width: 8,
        height: 8,
        borderRadius: '50%',
    },

    statusOnline: {
        backgroundColor: theme.palette.success.main,
    },

    statusOffline: {
        backgroundColor: theme.palette.text.disabled,
    },

    statValue: {
        fontSize: '1.25rem',
        fontWeight: 600,
        color: theme.palette.text.primary,
        marginBottom: 2,
    },

    statLabel: {
        fontSize: '0.75rem',
        color: theme.palette.text.secondary,
    },

    chip: {
        fontWeight: 600,
        fontSize: '0.75rem',
        height: 24,
    },

    chipSuccess: {
        backgroundColor: theme.palette.mode === 'light'
            ? 'rgba(16, 185, 129, 0.12)'
            : 'rgba(16, 185, 129, 0.2)',
        color: theme.palette.success.main,
    },

    chipWarning: {
        backgroundColor: theme.palette.mode === 'light'
            ? 'rgba(245, 158, 11, 0.12)'
            : 'rgba(245, 158, 11, 0.2)',
        color: theme.palette.warning.main,
    },

    empty: {
        padding: 48,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

const AttendantsTable = ({ attendants = [], loading = false }) => {
    const classes = useStyles();

    const getUserInitials = (name) => {
        if (!name) return '?';
        const names = name.split(' ');
        if (names.length >= 2) {
            return `${names[0][0]}${names[1][0]}`.toUpperCase();
        }
        return name.substring(0, 2).toUpperCase();
    };

    const getStatusColor = (online) => {
        return online ? 'success' : 'default';
    };

    if (loading) {
        return (
            <Paper className={classes.container}>
                <div className={classes.header}>
                    <Typography className={classes.title}>Atendentes</Typography>
                </div>
                <div className={classes.empty}>
                    <Typography>Carregando...</Typography>
                </div>
            </Paper>
        );
    }

    if (!attendants || attendants.length === 0) {
        return (
            <Paper className={classes.container}>
                <div className={classes.header}>
                    <Typography className={classes.title}>Atendentes</Typography>
                </div>
                <div className={classes.empty}>
                    <Typography>Nenhum atendente encontrado</Typography>
                </div>
            </Paper>
        );
    }

    return (
        <Paper className={classes.container}>
            <div className={classes.header}>
                <Typography className={classes.title}>Atendentes</Typography>
            </div>

            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell>Atendente</TableCell>
                        <TableCell align="center">Em Atendimento</TableCell>
                        <TableCell align="center">Finalizados</TableCell>
                        <TableCell align="center">Tempo Médio</TableCell>
                        <TableCell align="center">Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {attendants.map((attendant) => (
                        <TableRow key={attendant.id}>
                            <TableCell>
                                <div className={classes.userCell}>
                                    <Avatar className={classes.avatar}>
                                        {getUserInitials(attendant.name)}
                                    </Avatar>
                                    <div>
                                        <Typography className={classes.userName}>
                                            {attendant.name}
                                        </Typography>
                                        <div className={classes.userStatus}>
                                            <div
                                                className={`${classes.statusDot} ${
                                                    attendant.online
                                                        ? classes.statusOnline
                                                        : classes.statusOffline
                                                }`}
                                            />
                                            {attendant.online ? 'Online' : 'Offline'}
                                        </div>
                                    </div>
                                </div>
                            </TableCell>

                            <TableCell align="center">
                                <Box>
                                    <Typography className={classes.statValue}>
                                        {attendant.inAttendance || 0}
                                    </Typography>
                                    <HourglassEmptyIcon
                                        style={{ fontSize: 16, color: '#F59E0B' }}
                                    />
                                </Box>
                            </TableCell>

                            <TableCell align="center">
                                <Box>
                                    <Typography className={classes.statValue}>
                                        {attendant.finished || 0}
                                    </Typography>
                                    <CheckCircleIcon
                                        style={{ fontSize: 16, color: '#10B981' }}
                                    />
                                </Box>
                            </TableCell>

                            <TableCell align="center">
                                <Chip
                                    label={attendant.avgTime || '00:00'}
                                    className={`${classes.chip} ${
                                        parseInt(attendant.avgTime) > 30
                                            ? classes.chipWarning
                                            : classes.chipSuccess
                                    }`}
                                    size="small"
                                />
                            </TableCell>

                            <TableCell align="center">
                                <Chip
                                    icon={
                                        <FiberManualRecordIcon
                                            style={{
                                                fontSize: 12,
                                                color: attendant.online ? '#10B981' : '#D1D5DB',
                                            }}
                                        />
                                    }
                                    label={attendant.online ? 'Online' : 'Offline'}
                                    size="small"
                                    variant="outlined"
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Paper>
    );
};

export default AttendantsTable;
