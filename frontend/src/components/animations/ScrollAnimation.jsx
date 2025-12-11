import React, { useEffect, useRef, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    fadeIn: {
        opacity: 0,
        transform: 'translateY(20px)',
        transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',

        '&.visible': {
            opacity: 1,
            transform: 'translateY(0)',
        },
    },

    slideUp: {
        opacity: 0,
        transform: 'translateY(40px)',
        transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',

        '&.visible': {
            opacity: 1,
            transform: 'translateY(0)',
        },
    },

    slideLeft: {
        opacity: 0,
        transform: 'translateX(40px)',
        transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',

        '&.visible': {
            opacity: 1,
            transform: 'translateX(0)',
        },
    },

    slideRight: {
        opacity: 0,
        transform: 'translateX(-40px)',
        transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',

        '&.visible': {
            opacity: 1,
            transform: 'translateX(0)',
        },
    },

    scale: {
        opacity: 0,
        transform: 'scale(0.9)',
        transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',

        '&.visible': {
            opacity: 1,
            transform: 'scale(1)',
        },
    },

    rotate: {
        opacity: 0,
        transform: 'rotate(-5deg) scale(0.95)',
        transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',

        '&.visible': {
            opacity: 1,
            transform: 'rotate(0deg) scale(1)',
        },
    },
}));

const ScrollAnimation = ({
    children,
    animation = 'fadeIn', // fadeIn, slideUp, slideLeft, slideRight, scale, rotate
    delay = 0,
    threshold = 0.1,
    triggerOnce = true,
    className = '',
}) => {
    const classes = useStyles();
    const elementRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        setIsVisible(true);
                    }, delay);

                    if (triggerOnce) {
                        observer.unobserve(entry.target);
                    }
                } else if (!triggerOnce) {
                    setIsVisible(false);
                }
            },
            {
                threshold,
                rootMargin: '0px 0px -50px 0px',
            }
        );

        const currentElement = elementRef.current;
        if (currentElement) {
            observer.observe(currentElement);
        }

        return () => {
            if (currentElement) {
                observer.unobserve(currentElement);
            }
        };
    }, [delay, threshold, triggerOnce]);

    return (
        <div
            ref={elementRef}
            className={`${classes[animation]} ${isVisible ? 'visible' : ''} ${className}`}
        >
            {children}
        </div>
    );
};

// Componentes pré-configurados
export const FadeIn = ({ children, ...props }) => (
    <ScrollAnimation animation="fadeIn" {...props}>
        {children}
    </ScrollAnimation>
);

export const SlideUp = ({ children, ...props }) => (
    <ScrollAnimation animation="slideUp" {...props}>
        {children}
    </ScrollAnimation>
);

export const SlideLeft = ({ children, ...props }) => (
    <ScrollAnimation animation="slideLeft" {...props}>
        {children}
    </ScrollAnimation>
);

export const SlideRight = ({ children, ...props }) => (
    <ScrollAnimation animation="slideRight" {...props}>
        {children}
    </ScrollAnimation>
);

export const ScaleIn = ({ children, ...props }) => (
    <ScrollAnimation animation="scale" {...props}>
        {children}
    </ScrollAnimation>
);

export const RotateIn = ({ children, ...props }) => (
    <ScrollAnimation animation="rotate" {...props}>
        {children}
    </ScrollAnimation>
);

export default ScrollAnimation;
