import React from 'react';
import { Fade, Slide, Zoom, Grow } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    container: {
        width: '100%',
        minHeight: '100%',
    },
}));

const PageTransition = ({
    children,
    type = 'fade', // fade, slide, zoom, grow
    direction = 'up', // up, down, left, right (for slide)
    timeout = 300,
    in: inProp = true,
    unmountOnExit = true,
}) => {
    const classes = useStyles();

    const transitions = {
        fade: (
            <Fade in={inProp} timeout={timeout} unmountOnExit={unmountOnExit}>
                <div className={classes.container}>{children}</div>
            </Fade>
        ),
        slide: (
            <Slide
                in={inProp}
                direction={direction}
                timeout={timeout}
                unmountOnExit={unmountOnExit}
            >
                <div className={classes.container}>{children}</div>
            </Slide>
        ),
        zoom: (
            <Zoom in={inProp} timeout={timeout} unmountOnExit={unmountOnExit}>
                <div className={classes.container}>{children}</div>
            </Zoom>
        ),
        grow: (
            <Grow in={inProp} timeout={timeout} unmountOnExit={unmountOnExit}>
                <div className={classes.container}>{children}</div>
            </Grow>
        ),
    };

    return transitions[type] || transitions.fade;
};

export default PageTransition;
