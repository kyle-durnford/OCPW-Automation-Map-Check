import React, { useState, useEffect, useRef, Fragment } from "react"
import { CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { buildMap, createCityLayer, selectedLayer } from '../data/esri'

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

const EsriMap = ({esriData, selected, setSelected}) => {
    const classes = useStyles();
    const mapRef = useRef();

    useEffect(() => {
        const cityLayer = createCityLayer()
        buildMap(esriData, mapRef.current, cityLayer, setSelected)
    }, []);

    useEffect(() => {
        selectedLayer(selected)
    }, [selected])

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