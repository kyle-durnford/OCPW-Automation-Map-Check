import React, { useState, useEffect, useRef, Fragment } from "react"
import { CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { buildMap, createCityLayer } from '../data/esri'

const useStyles = makeStyles(() => ({
    circularProgress: {
      //padding: '9em 0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    viewDiv: {
        height: 'calc(50vh - 65px)',
        width: '100%' 
    }
}));

const EsriMap = ({loading, esriData}) => {
    const classes = useStyles();
    const mapRef = useRef();

    console.log('esriData', esriData)

    useEffect(() => {
        console.log('Build Map')
        const cityLayer = createCityLayer()
        buildMap(esriData, mapRef.current, cityLayer)
    }, []);

    // esri.buildMap(json, mapRef)
    // if (loading) 
    //     return (
    //         <Fragment>
    //             <span className={classes.circularProgress}>
    //                 <CircularProgress size={48} />
    //             </span>
    //         </Fragment>
    //     )


    return (
        <div className={classes.viewDiv} ref={mapRef}/>
    )

}

export default EsriMap