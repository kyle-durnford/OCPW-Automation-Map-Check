import React, { useState, useEffect } from "react"
import { CircularProgress } from '@material-ui/core';
import connection from '../services/connection'

import TriError from '../assets/TriError.js'
import { launchViewer } from "../data/forge";

const ForgeMap = ({objectKeys, connectionId, urn, error, setError, mapInfo, setMapInfo}) => {

    const [restart, setRestart] = useState(0)

    useEffect(() => {
        if(objectKeys) {
            connection.translateObject(objectKeys, connectionId)
        .then(
            response => {
                console.log('Response', response)
                setError(null)
            },
            error => {
                console.log('Error:', error)
                setError('error')
                if (restart < 2) {
                    console.log('retrying' + restart)
                    setTimeout(() => {
                        setRestart(restart + 1)
                    }, 10000)
                } else {
                    console.log('fatal')
                    setError('fatal')
                }
            })
        }
    }, [objectKeys, restart]);

    useEffect(()=> {
        if(urn) {
            launchViewer(urn, setMapInfo)
        }
    }, [urn]) // wait for the translation to finish

    if (error == 'fatal') {
        return (
            <span className='forge__error forge__error--final' onClick={() => setRestart(0)}>
                <TriError color={'#842029'}/>
                <p>Map failed to load. Click to try again</p>
            </span>
        )
    } else if (error == 'error') {
        return (
            <span className='forge__error'>
                <TriError color={'#842029'}/>
                <p>Error: Retrying (Attempt {restart + 1}/3)</p>
            </span>
        )
    } else if (!mapInfo)  {
        return (
            <span className='spinner'>
                <CircularProgress size={48} />
            </span>
        )
    }  else return <div className='mapcanvas' id="forgeViewer"/>
}

export default ForgeMap