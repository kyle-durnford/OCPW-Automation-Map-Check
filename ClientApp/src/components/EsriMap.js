import React, { useState, useEffect, Fragment } from "react"
import { CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    circularProgress: {
      padding: '9em 0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
}));

const EsriMap = () => {
    const classes = useStyles();
    if (true) 
    return (
        <Fragment>
            <span className={classes.circularProgress}>
                <CircularProgress size={48} />
            </span>
        </Fragment>
    )
}

export default EsriMap