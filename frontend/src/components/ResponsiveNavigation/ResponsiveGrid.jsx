import React from 'react';
import { Grid, useMediaQuery, useTheme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    container: {
        width: '100%',
        margin: 0,
    },

    item: {
        display: 'flex',
        flexDirection: 'column',
    },

    // Layout fluido para diferentes breakpoints
    fullWidth: {
        width: '100%',
    },
}));

/**
 * Grid responsivo que se adapta automaticamente aos breakpoints
 *
 * Breakpoints:
 * - xs (0-600px): Mobile portrait
 * - sm (600-960px): Mobile landscape / Tablet portrait
 * - md (960-1280px): Tablet landscape
 * - lg (1280-1920px): Desktop
 * - xl (1920px+): Large desktop
 */
const ResponsiveGrid = ({
    children,
    spacing = 3,
    xs = 12,
    sm,
    md,
    lg,
    xl,
    container = false,
    item = false,
    className,
    ...props
}) => {
    const classes = useStyles();
    const theme = useTheme();

    // Auto-detectar valores padrão baseados em breakpoint
    const getDefaultGridSize = () => {
        const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
        const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
        const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));

        return {
            xs: xs || 12,
            sm: sm || (isMobile ? 12 : 6),
            md: md || (isTablet ? 6 : 4),
            lg: lg || (isDesktop ? 3 : 4),
            xl: xl || 3,
        };
    };

    const gridSizes = getDefaultGridSize();

    return (
        <Grid
            container={container}
            item={item}
            spacing={spacing}
            xs={gridSizes.xs}
            sm={gridSizes.sm}
            md={gridSizes.md}
            lg={gridSizes.lg}
            xl={gridSizes.xl}
            className={`${container ? classes.container : ''} ${item ? classes.item : ''} ${className || ''}`}
            {...props}
        >
            {children}
        </Grid>
    );
};

/**
 * Grid Container pré-configurado
 */
export const ResponsiveContainer = ({ children, spacing = 3, ...props }) => {
    return (
        <ResponsiveGrid container spacing={spacing} {...props}>
            {children}
        </ResponsiveGrid>
    );
};

/**
 * Grid Item pré-configurado
 */
export const ResponsiveItem = ({ children, xs, sm, md, lg, xl, ...props }) => {
    return (
        <ResponsiveGrid item xs={xs} sm={sm} md={md} lg={lg} xl={xl} {...props}>
            {children}
        </ResponsiveGrid>
    );
};

/**
 * Grid com layout comum de dashboard
 * - Mobile: 1 coluna
 * - Tablet: 2 colunas
 * - Desktop: 3-4 colunas
 */
export const DashboardGrid = ({ children, columns = 4, spacing = 3, ...props }) => {
    const gridSize = {
        1: { xs: 12, sm: 12, md: 12, lg: 12, xl: 12 },
        2: { xs: 12, sm: 6, md: 6, lg: 6, xl: 6 },
        3: { xs: 12, sm: 6, md: 4, lg: 4, xl: 4 },
        4: { xs: 12, sm: 6, md: 6, lg: 3, xl: 3 },
        6: { xs: 12, sm: 6, md: 4, lg: 2, xl: 2 },
    }[columns] || { xs: 12, sm: 6, md: 4, lg: 3, xl: 3 };

    return (
        <ResponsiveContainer spacing={spacing} {...props}>
            {React.Children.map(children, (child) => (
                <ResponsiveItem {...gridSize}>
                    {child}
                </ResponsiveItem>
            ))}
        </ResponsiveContainer>
    );
};

/**
 * Grid para stat cards
 * - Mobile: 1 coluna (100%)
 * - Tablet: 2 colunas (50%)
 * - Desktop: 4 colunas (25%)
 */
export const StatsGrid = ({ children, spacing = 3, ...props }) => {
    return (
        <ResponsiveContainer spacing={spacing} {...props}>
            {React.Children.map(children, (child) => (
                <ResponsiveItem xs={12} sm={6} md={6} lg={3} xl={3}>
                    {child}
                </ResponsiveItem>
            ))}
        </ResponsiveContainer>
    );
};

/**
 * Grid para gráficos
 * - Mobile: 1 coluna (100%)
 * - Tablet: 1 coluna (100%)
 * - Desktop: 2 colunas (50%)
 */
export const ChartsGrid = ({ children, spacing = 3, ...props }) => {
    return (
        <ResponsiveContainer spacing={spacing} {...props}>
            {React.Children.map(children, (child) => (
                <ResponsiveItem xs={12} sm={12} md={12} lg={6} xl={6}>
                    {child}
                </ResponsiveItem>
            ))}
        </ResponsiveContainer>
    );
};

/**
 * Grid para tabelas
 * - Sempre 100% de largura em todos breakpoints
 */
export const TableGrid = ({ children, spacing = 3, ...props }) => {
    return (
        <ResponsiveContainer spacing={spacing} {...props}>
            {React.Children.map(children, (child) => (
                <ResponsiveItem xs={12} sm={12} md={12} lg={12} xl={12}>
                    {child}
                </ResponsiveItem>
            ))}
        </ResponsiveContainer>
    );
};

/**
 * Grid sidebar + content
 * - Mobile: Stack vertical (sidebar full width)
 * - Desktop: Sidebar 280px / Content flex
 */
export const SidebarLayoutGrid = ({ sidebar, content, spacing = 3, ...props }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <ResponsiveContainer spacing={spacing} {...props}>
            <ResponsiveItem xs={12} sm={12} md={3} lg={2} xl={2}>
                {sidebar}
            </ResponsiveItem>
            <ResponsiveItem xs={12} sm={12} md={9} lg={10} xl={10}>
                {content}
            </ResponsiveItem>
        </ResponsiveContainer>
    );
};

export default ResponsiveGrid;
