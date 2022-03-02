import React, { useEffect, useRef } from "react"
import { buildMap, createCityLayer, selectedLayer, selectedParcel } from '../data/esri'
import { CircularProgress } from '@material-ui/core';

const EsriMap = ({esriData, selected, setSelected, open, setOpen, zoomToggle}) => {
    const mapRef = useRef();

    useEffect(() => {
        if (esriData) {
            const cityLayer = createCityLayer()
            buildMap(esriData, mapRef.current, cityLayer, setSelected, selected, setOpen, open)
        }
    }, [esriData]);

    useEffect(() => {
        selectedLayer(selected, open, setOpen, zoomToggle)
    }, [selected, zoomToggle])

    useEffect(() => {
        selectedParcel(open, selected, zoomToggle)
    }, [open, selected, zoomToggle])

    if (esriData) {
        return (
            <div className="esri" ref={mapRef}/>
        )
    } else {
        return(
            <span className="spinner">
                <CircularProgress size={48} />
            </span>
        )
    }
    

}

export default EsriMap