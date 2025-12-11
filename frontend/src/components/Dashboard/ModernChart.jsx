import React from 'react';
import { Paper, Typography, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const useStyles = makeStyles((theme) => ({
    container: {
        padding: 24,
        borderRadius: 16,
        border: `1px solid ${theme.palette.divider}`,
        backgroundColor: theme.palette.background.paper,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },

    header: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 24,
    },

    title: {
        fontSize: '1.125rem',
        fontWeight: 600,
        color: theme.palette.text.primary,
    },

    subtitle: {
        fontSize: '0.875rem',
        color: theme.palette.text.secondary,
        marginTop: 4,
    },

    chartContainer: {
        flex: 1,
        position: 'relative',
        minHeight: 300,
    },

    legend: {
        display: 'flex',
        gap: 16,
        marginTop: 16,
        flexWrap: 'wrap',
    },

    legendItem: {
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        fontSize: '0.875rem',
        color: theme.palette.text.secondary,
    },

    legendDot: {
        width: 12,
        height: 12,
        borderRadius: '50%',
    },

    empty: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 300,
        color: theme.palette.text.secondary,
    },
}));

const ModernChart = ({
    title,
    subtitle,
    type = 'line', // line, bar, doughnut
    data,
    height = 300,
    showLegend = true,
    customLegend = false,
}) => {
    const classes = useStyles();
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';

    // Default chart options
    const defaultOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: showLegend && !customLegend,
                position: 'bottom',
                labels: {
                    usePointStyle: true,
                    padding: 16,
                    font: {
                        size: 12,
                        family: 'Poppins',
                        weight: 500,
                    },
                    color: isDark ? '#A3A3A3' : '#737373',
                },
            },
            tooltip: {
                backgroundColor: isDark ? 'rgba(250, 250, 250, 0.95)' : 'rgba(23, 23, 23, 0.95)',
                titleColor: isDark ? '#171717' : '#FAFAFA',
                bodyColor: isDark ? '#171717' : '#FAFAFA',
                borderColor: isDark ? '#E5E5E5' : '#262626',
                borderWidth: 1,
                padding: 12,
                boxPadding: 6,
                usePointStyle: true,
                font: {
                    family: 'Poppins',
                    size: 13,
                },
                callbacks: {
                    label: function (context) {
                        let label = context.dataset.label || '';
                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed.y !== null) {
                            label += new Intl.NumberFormat('pt-BR').format(context.parsed.y);
                        }
                        return label;
                    },
                },
            },
        },
        scales:
            type !== 'doughnut'
                ? {
                      x: {
                          grid: {
                              display: false,
                          },
                          ticks: {
                              font: {
                                  family: 'Poppins',
                                  size: 11,
                              },
                              color: isDark ? '#A3A3A3' : '#737373',
                          },
                      },
                      y: {
                          beginAtZero: true,
                          grid: {
                              color: isDark ? '#262626' : '#E5E5E5',
                              drawBorder: false,
                          },
                          ticks: {
                              font: {
                                  family: 'Poppins',
                                  size: 11,
                              },
                              color: isDark ? '#A3A3A3' : '#737373',
                              callback: function (value) {
                                  return new Intl.NumberFormat('pt-BR').format(value);
                              },
                          },
                      },
                  }
                : {},
    };

    // Chart-specific configurations
    const lineOptions = {
        ...defaultOptions,
        elements: {
            line: {
                tension: 0.4,
                borderWidth: 3,
            },
            point: {
                radius: 4,
                hoverRadius: 6,
                borderWidth: 2,
                backgroundColor: '#FFFFFF',
            },
        },
    };

    const barOptions = {
        ...defaultOptions,
        borderRadius: 8,
        borderSkipped: false,
    };

    const doughnutOptions = {
        ...defaultOptions,
        cutout: '70%',
        plugins: {
            ...defaultOptions.plugins,
            legend: {
                ...defaultOptions.plugins.legend,
                position: 'right',
            },
        },
    };

    const options = {
        line: lineOptions,
        bar: barOptions,
        doughnut: doughnutOptions,
    }[type];

    const ChartComponent = {
        line: Line,
        bar: Bar,
        doughnut: Doughnut,
    }[type];

    if (!data || !data.datasets || data.datasets.length === 0) {
        return (
            <Paper className={classes.container}>
                <div className={classes.header}>
                    <div>
                        <Typography className={classes.title}>{title}</Typography>
                        {subtitle && (
                            <Typography className={classes.subtitle}>{subtitle}</Typography>
                        )}
                    </div>
                </div>
                <div className={classes.empty}>
                    <Typography>Sem dados para exibir</Typography>
                </div>
            </Paper>
        );
    }

    return (
        <Paper className={classes.container}>
            <div className={classes.header}>
                <div>
                    <Typography className={classes.title}>{title}</Typography>
                    {subtitle && (
                        <Typography className={classes.subtitle}>{subtitle}</Typography>
                    )}
                </div>
            </div>

            <div className={classes.chartContainer} style={{ height }}>
                <ChartComponent data={data} options={options} />
            </div>

            {customLegend && data.datasets && (
                <div className={classes.legend}>
                    {data.datasets.map((dataset, index) => (
                        <div key={index} className={classes.legendItem}>
                            <div
                                className={classes.legendDot}
                                style={{
                                    backgroundColor: dataset.backgroundColor || dataset.borderColor,
                                }}
                            />
                            <span>{dataset.label}</span>
                        </div>
                    ))}
                </div>
            )}
        </Paper>
    );
};

export default ModernChart;
