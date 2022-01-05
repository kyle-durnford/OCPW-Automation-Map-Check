import React, { useState, useEffect } from "react"
import { CircularProgress } from '@material-ui/core';
import connection from '../services/connection'

import TriError from '../assets/TriError.js'
import { launchViewer } from "../data/forge";

const ForgeMap = ({loading, objectKeys, connectionId, urn, error, setError}) => {

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
    }, [urn]) // wait for the translation to finish

    if (error) {
        return (
            <span className='spinner'>
                <TriError color={'rgb(245, 93, 110)'}/>
                <p></p>
            </span>
        )
    } else if (loading && !mapInfo)  {
        return (
            <span className='spinner'>
                <CircularProgress size={48} />
            </span>
        )
    }  else return <div className='mapcanvas' id="forgeViewer"/>
}

export default ForgeMap