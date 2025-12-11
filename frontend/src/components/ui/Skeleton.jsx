import React from 'react';
import { Skeleton as MuiSkeleton } from '@material-ui/lab';
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

    // Variants
    text: {
        borderRadius: 4,
    },

    circular: {
        borderRadius: '50%',
    },

    rectangular: {
        borderRadius: 8,
    },

    rounded: {
        borderRadius: 12,
    },

    // Animation speeds
    slow: {
        '&::after': {
            animationDuration: '2.5s',
        },
    },

    fast: {
        '&::after': {
            animationDuration: '1s',
        },
    },
}));

const Skeleton = ({
    variant = 'text', // text, circular, rectangular, rounded
    width,
    height,
    animation = 'pulse', // pulse, wave, false
    speed = 'normal', // slow, normal, fast
    className = '',
    ...props
}) => {
    const classes = useStyles();

    const skeletonClasses = [
        classes.skeleton,
        classes[variant],
        speed !== 'normal' && classes[speed],
        className,
    ].filter(Boolean).join(' ');

    return (
        <MuiSkeleton
            className={skeletonClasses}
            variant={variant}
            width={width}
            height={height}
            animation={animation}
            {...props}
        />
    );
};

// Pre-built skeleton components
export const SkeletonText = ({ lines = 3, width = '100%', ...props }) => {
    return (
        <div style={{ width }}>
            {[...Array(lines)].map((_, index) => (
                <Skeleton
                    key={index}
                    variant="text"
                    height={20}
                    width={index === lines - 1 ? '60%' : '100%'}
                    style={{ marginBottom: 8 }}
                    {...props}
                />
            ))}
        </div>
    );
};

export const SkeletonCard = ({ width = '100%', height = 200, ...props }) => {
    return (
        <div style={{ width }}>
            <Skeleton variant="rounded" height={height} {...props} />
        </div>
    );
};

export const SkeletonAvatar = ({ size = 40, ...props }) => {
    return (
        <Skeleton
            variant="circular"
            width={size}
            height={size}
            {...props}
        />
    );
};

export const SkeletonButton = ({ width = 120, height = 40, ...props }) => {
    return (
        <Skeleton
            variant="rectangular"
            width={width}
            height={height}
            {...props}
        />
    );
};

export const SkeletonListItem = ({ avatarSize = 40, ...props }) => {
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
            <SkeletonAvatar size={avatarSize} {...props} />
            <div style={{ flex: 1 }}>
                <Skeleton variant="text" width="60%" height={20} style={{ marginBottom: 8 }} {...props} />
                <Skeleton variant="text" width="40%" height={16} {...props} />
            </div>
        </div>
    );
};

export default Skeleton;
