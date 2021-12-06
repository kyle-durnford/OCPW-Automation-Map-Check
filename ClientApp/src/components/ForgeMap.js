import React, { useState, useEffect, Fragment } from "react"
import { CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import connection from '../services/connection'
import { launchViewer } from "../data/forge";

const useStyles = makeStyles(() => ({
    circularProgress: {
      //padding: '9em 0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    viewDiv: {
        height: '100%',
        width: '100%',
    }
}));

const ForgeMap = ({loading, objectKeys, connectionId}) => {
    const classes = useStyles();

    const [mapInfo, setMapInfo] = useState()
    const [didMount, setDidMount] = useState(false)
    
    useEffect(() => { 
        setDidMount(true)
    }, [])

    useEffect(() => {
        if (didMount) {
            connection.translateObject(objectKeys, connectionId).then(
                response => {
                    console.log('Response', response)
                    setMapInfo(response.urn)
                },
                error => {
                    console.log('Error:', error)
                }
            )
        }  
    }, [objectKeys]);

    useEffect(() => {
        console.log(mapInfo);
        if(mapInfo){
            launchViewer(mapInfo)
        }
    }, [mapInfo])

    if (loading && !mapInfo) {
        return (
            <Fragment>
                <span className={classes.circularProgress}>
                    <CircularProgress size={48} />
                </span>
            </Fragment>
        )
    } else {
        return (
            <div className={classes.viewDiv} id='forgeViewer'/>
        )
    }
}

export default ForgeMap