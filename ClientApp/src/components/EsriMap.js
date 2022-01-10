import React, { useState, useEffect, useRef, Fragment } from "react"
import { buildMap, createCityLayer, selectedLayer } from '../data/esri'

const EsriMap = ({esriData, selected, setSelected}) => {
    const mapRef = useRef();

    useEffect(() => {
        const cityLayer = createCityLayer()
        buildMap(esriData, mapRef.current, cityLayer, setSelected, selected)
    }, []);

    useEffect(() => {
        selectedLayer(selected)
    }, [selected])

    return (
        <div className="esri" ref={mapRef}/>
    )

}

export default EsriMap