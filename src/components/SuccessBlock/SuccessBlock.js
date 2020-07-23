import React from 'react';
import {makeStyles} from '@material-ui/core';
import CheckIcon from '@material-ui/icons/CheckCircleOutlineOutlined';

const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        width: '100%',
    },
    icon: {
        marginRight: 8,
        fontSize: '1.15rem',
        color: '#107C10'
    },
    text: {
        fontSize: 14,
        lineHeight: '16px',
        fontWeight: 400,
        color: '#107C10'
    }
}))

const SuccessBlock = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <CheckIcon className={classes.icon}/>
            <span className={classes.text}>Success</span>
        </div>
    )
}

export default SuccessBlock;