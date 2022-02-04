import React, { useEffect, useRef } from "react"
import { buildMap, createCityLayer, selectedLayer, selectedParcel } from '../data/esri'

const EsriMap = ({esriData, selected, setSelected, open, setOpen}) => {
    const mapRef = useRef();

    useEffect(() => {
        console.log('esriData', esriData)
        const cityLayer = createCityLayer()
        buildMap(esriData, mapRef.current, cityLayer, setSelected, selected, setOpen)
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