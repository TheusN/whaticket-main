import React from 'react';
import { Container, useMediaQuery, useTheme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
        width: '100%',

        // Mobile
        [theme.breakpoints.down('xs')]: {
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2),
            paddingTop: theme.spacing(2),
            paddingBottom: theme.spacing(2),
        },

        // Tablet
        [theme.breakpoints.between('sm', 'md')]: {
            paddingLeft: theme.spacing(3),
            paddingRight: theme.spacing(3),
            paddingTop: theme.spacing(3),
            paddingBottom: theme.spacing(3),
        },

        // Desktop
        [theme.breakpoints.up('lg')]: {
            paddingLeft: theme.spacing(4),
            paddingRight: theme.spacing(4),
            paddingTop: theme.spacing(4),
            paddingBottom: theme.spacing(4),
        },
    },

    fluid: {
        maxWidth: '100%',
        padding: theme.spacing(2),

        [theme.breakpoints.up('sm')]: {
            padding: theme.spacing(3),
        },

        [theme.breakpoints.up('lg')]: {
            padding: theme.spacing(4),
        },
    },

    compact: {
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),

        [theme.breakpoints.up('sm')]: {
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2),
            paddingTop: theme.spacing(2),
            paddingBottom: theme.spacing(2),
        },
    },

    spacious: {
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3),
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),

        [theme.breakpoints.up('sm')]: {
            paddingLeft: theme.spacing(4),
            paddingRight: theme.spacing(4),
            paddingTop: theme.spacing(5),
            paddingBottom: theme.spacing(5),
        },

        [theme.breakpoints.up('lg')]: {
            paddingLeft: theme.spacing(6),
            paddingRight: theme.spacing(6),
            paddingTop: theme.spacing(6),
            paddingBottom: theme.spacing(6),
        },
    },

    // Suporte para landscape/portrait
    landscape: {
        '@media (orientation: landscape) and (max-height: 600px)': {
            paddingTop: theme.spacing(1),
            paddingBottom: theme.spacing(1),
        },
    },

    // Safe areas (iOS notch, home indicator)
    withSafeArea: {
        paddingTop: 'max(env(safe-area-inset-top), 16px)',
        paddingBottom: 'max(env(safe-area-inset-bottom), 16px)',
        paddingLeft: 'max(env(safe-area-inset-left), 16px)',
        paddingRight: 'max(env(safe-area-inset-right), 16px)',
    },
}));

/**
 * Container responsivo que se adapta aos breakpoints
 *
 * Props:
 * - maxWidth: xs, sm, md, lg, xl, false (fluid)
 * - variant: default, fluid, compact, spacious
 * - disableGutters: Remove padding
 * - landscape: Otimiza para orientação landscape
 * - safeArea: Adiciona suporte para safe areas (iOS)
 */
const ResponsiveContainer = ({
    children,
    maxWidth = 'lg',
    variant = 'default',
    disableGutters = false,
    landscape = false,
    safeArea = false,
    className,
    ...props
}) => {
    const classes = useStyles();
    const theme = useTheme();

    const getClassName = () => {
        const classNames = [className];

        if (!disableGutters) {
            if (variant === 'fluid') {
                classNames.push(classes.fluid);
            } else if (variant === 'compact') {
                classNames.push(classes.compact);
            } else if (variant === 'spacious') {
                classNames.push(classes.spacious);
            } else {
                classNames.push(classes.root);
            }
        }

        if (landscape) {
            classNames.push(classes.landscape);
        }

        if (safeArea) {
            classNames.push(classes.withSafeArea);
        }

        return classNames.filter(Boolean).join(' ');
    };

    return (
        <Container
            maxWidth={maxWidth}
            disableGutters={disableGutters}
            className={getClassName()}
            {...props}
        >
            {children}
        </Container>
    );
};

/**
 * Hook para detectar breakpoint atual
 */
export const useBreakpoint = () => {
    const theme = useTheme();

    const xs = useMediaQuery(theme.breakpoints.only('xs'));
    const sm = useMediaQuery(theme.breakpoints.only('sm'));
    const md = useMediaQuery(theme.breakpoints.only('md'));
    const lg = useMediaQuery(theme.breakpoints.only('lg'));
    const xl = useMediaQuery(theme.breakpoints.only('xl'));

    const mobile = useMediaQuery(theme.breakpoints.down('sm'));
    const tablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
    const desktop = useMediaQuery(theme.breakpoints.up('lg'));

    const current = xs ? 'xs' : sm ? 'sm' : md ? 'md' : lg ? 'lg' : 'xl';

    return {
        xs,
        sm,
        md,
        lg,
        xl,
        mobile,
        tablet,
        desktop,
        current,
        isMobile: mobile,
        isTablet: tablet,
        isDesktop: desktop,
    };
};

/**
 * Hook para detectar orientação (portrait/landscape)
 */
export const useOrientation = () => {
    const [orientation, setOrientation] = React.useState(
        typeof window !== 'undefined' && window.matchMedia('(orientation: portrait)').matches
            ? 'portrait'
            : 'landscape'
    );

    React.useEffect(() => {
        const mediaQuery = window.matchMedia('(orientation: portrait)');

        const handleChange = (e) => {
            setOrientation(e.matches ? 'portrait' : 'landscape');
        };

        // Modern browsers
        if (mediaQuery.addEventListener) {
            mediaQuery.addEventListener('change', handleChange);
        } else {
            // Older browsers
            mediaQuery.addListener(handleChange);
        }

        return () => {
            if (mediaQuery.removeEventListener) {
                mediaQuery.removeEventListener('change', handleChange);
            } else {
                mediaQuery.removeListener(handleChange);
            }
        };
    }, []);

    return {
        orientation,
        isPortrait: orientation === 'portrait',
        isLandscape: orientation === 'landscape',
    };
};

/**
 * Hook para viewport dimensions
 */
export const useViewport = () => {
    const [viewport, setViewport] = React.useState({
        width: typeof window !== 'undefined' ? window.innerWidth : 0,
        height: typeof window !== 'undefined' ? window.innerHeight : 0,
    });

    React.useEffect(() => {
        const handleResize = () => {
            setViewport({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return viewport;
};

export default ResponsiveContainer;
