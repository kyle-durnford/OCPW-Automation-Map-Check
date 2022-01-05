import React, { useState, useEffect, useRef, Fragment } from "react"
import { CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { buildMap, createCityLayer, selectedLayer } from '../data/esri'

const EsriMap = ({esriData, selected, setSelected}) => {
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
        <div className="esri" ref={mapRef}/>
    )

}

export default EsriMap