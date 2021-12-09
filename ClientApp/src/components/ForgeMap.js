import React, { useState, useEffect, Fragment } from "react"
import { CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import connection from '../services/connection'

import TriError from '../assets/TriError.js'
import { launchViewer } from "../data/forge";

const useStyles = makeStyles(() => ({
    circularProgress: {
      //padding: '9em 0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    errorIcon: {
        color: 'red',
    },
    viewDiv: {
        height: '100%',
        width: '100%',
    }
}));

const ForgeMap = ({loading, objectKeys, connectionId, urn, error, setError}) => {
    const classes = useStyles();

    const [mapInfo, setMapInfo] = useState()
    const [didMount, setDidMount] = useState(false)
    
    useEffect(() => { 
        setDidMount(true)
    }, [])

    useEffect(() => {
        if (didMount) {
            connection.translateObject(objectKeys, connectionId)
            .then(
                response => {
                    console.log('Response', response)
                    setMapInfo(response)
                    setError()
                },
                error => {
                    console.log('Error:', error)
                    setError(error)
                }
            )
        }  
    }, [objectKeys]);

    useEffect(()=> {
        if(urn) {
            launchViewer(urn)
        }
    }, [urn])

    if (error) {
        return (
            <span className={classes.circularProgress}>
                <TriError className={classes.errorIcon} color={'rgb(245, 93, 110)'}/>
                <p></p>
            </span>
        )
    } else if (loading && !mapInfo)  {
        return (
            <span className={classes.circularProgress}>
                <CircularProgress size={48} />
            </span>
        )
    }  else return <div className={classes.viewDiv} id="forgeViewer"/>
}

export default ForgeMap