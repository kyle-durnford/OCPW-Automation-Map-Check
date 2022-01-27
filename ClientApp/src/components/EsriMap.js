import React, { useState, useEffect, useRef, Fragment } from "react"
import { buildMap, createCityLayer, selectedLayer, selectedParcel } from '../data/esri'

const EsriMap = ({esriData, selected, setSelected, open}) => {
    const mapRef = useRef();

    useEffect(() => {
        const cityLayer = createCityLayer()
        buildMap(esriData, mapRef.current, cityLayer, setSelected, selected)
    }, []);

    useEffect(() => {
        selectedLayer(selected, open)
    }, [selected])

    useEffect(() => {
        selectedParcel(open)
    }, [open])

    return (
        <div className="esri" ref={mapRef}/>
    )

}

export default EsriMap