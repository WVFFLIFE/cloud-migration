import React from 'react';
import {
    makeStyles,
    Tabs as MuiTabs,
    Tab as MuiTab
} from '@material-ui/core';
import {CompleteList} from '../Icons';

const useStyles = makeStyles(() => ({
    tabRoot: {
        minWidth: 'auto',
        paddingLeft: 20,
        paddingRight: 20
    },
    wrapper: {
        flexDirection: 'row',
        fontSize: 14,
        fontFamily: 'Segoe UI',
        fontWeight: 400,
        lineHeight: 1,
        color: '#fff',
        textTransform: 'none'
    },
    labelIcon: {
        minHeight: 48,
        '& .MuiTab-wrapper > *:first-child': {
            marginBottom: 0,
            marginRight: 15
        }
    },
    indicator: {
        height: 4,
        background: '#E05D2A'
    }
}))

const Tabs = ({
    value,
    handleTabChange
}) => {
    const classes = useStyles();

    return (
        <MuiTabs
            value={value}
            onChange={handleTabChange}
            aria-label="tabs"
            classes={{
                indicator: classes.indicator
            }}
        >
            <MuiTab
                classes={{
                    root: classes.tabRoot,
                    wrapper: classes.wrapper,
                    labelIcon: classes.labelIcon
                }}
                label="Jobs list"
                icon={<CompleteList />}
            />
        </MuiTabs>
    )
}

export default Tabs;