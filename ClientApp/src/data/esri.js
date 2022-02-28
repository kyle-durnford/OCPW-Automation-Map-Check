import Map from "@arcgis/core/Map"
import MapView from "@arcgis/core/views/MapView";
import Polyline from "@arcgis/core/geometry/Polyline"
import Graphic from "@arcgis/core/Graphic"
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer"
import FeatureLayer from "@arcgis/core/layers/FeatureLayer"
import SpatialReference from"@arcgis/core/geometry/SpatialReference"
import config from "@arcgis/core/config"
import MapImageLayer from "@arcgis/core/layers/MapImageLayer"
import TileLayer from "@arcgis/core/layers/TileLayer"
import BasemapToggle from "@arcgis/core/widgets/BasemapToggle"
import Basemap from "@arcgis/core/Basemap"
import Point from "@arcgis/core/geometry/Point"
import Polygon from "@arcgis/core/geometry/Polygon"
import Attribution from "@arcgis/core/widgets/Attribution";
import Zoom from "@arcgis/core/widgets/Zoom";
import _ from "lodash";
import Popup from "@arcgis/core/widgets/Popup";
import { LevelFormat } from "docx";
import { viewer, viewerDbIds, fitToViewerHandleId } from '../data/forge'

import ImageryTileLayer from "@arcgis/core/layers/ImageryTileLayer";

let polylist = []
let par2poly = {}
let lblgroup = {}
let lblgroupstart = {}
let lblgroupend = {}
let dict = {}
let dict2 = {}
let hiddict = {}
let oid2line = {}
let oid2lbl = {}

const lods = [
    {
        "level": 0,
        "resolution": 217.01388888888889,
        "scale": 250000
    },
    {
        "level": 1,
        "resolution": 108.50694444444444,
        "scale": 125000
    },
    {
        "level": 2,
        "resolution": 55.55555555555555,
        "scale": 64000
    },
    {
        "level": 3,
        "resolution": 27.777777777777775,
        "scale": 32000
    },
    {
        "level": 4,
        "resolution": 13.888888888888888,
        "scale": 16000
    },
    {
        "level": 5,
        "resolution": 6.944444444444444,
        "scale": 8000
    },
    {
        "level": 6,
        "resolution": 3.472222222222222,
        "scale": 4000
    },
    {
        "level": 7,
        "resolution": 1.736111111111111,
        "scale": 2000
    },
    {
        "level": 8,
        "resolution": 0.8680555555555555,
        "scale": 1000
    },
    {
        "level": 9,
        "resolution": 0.43402777777777773,
        "scale": 500
    },
    {
        "level": 10,
        "resolution": 0.21701388888888887,
        "scale": 250
    },
    {
        "level": 11,
        "resolution": 0.066145965625264591,
        "scale": 100
    },
    {
        "level": 12,
        "resolution": 0.026458386250105836,
        "scale": 50
    },
    {
        "level": 13,
        "resolution": 0.016458386250105836,
        "scale": 25
    },
    {
        "level": 14,
        "resolution": 0.016458386250105836,
        "scale": 12
    },
    {
        "level": 15,
        "resolution": 0.006,
        "scale": 6
    }
]

//Creating new layers to overlay on the map


const parcellayer = new GraphicsLayer({ //Invisible: allows the ability to click on parcels
    id: 'parcellayer'
})

const graphicslayer2 = new GraphicsLayer({ //Base segment drawing layer
    id: 'graphicslayer2'
})

const selectedParcelGraphic = new GraphicsLayer({
    id: 'selectedparcelgraphic'
})

const lblgraphicslayer = new GraphicsLayer({ //Labels for segments
    id: 'lblgraphicslayer'
})

const selectedgraphicslayer = new GraphicsLayer({ //Highlights selected layer
    id: 'selectedgraphicslayer'
})

const radgraphicslayer = new GraphicsLayer({
    id: 'radgraphicslayer'
})

let selectedLayers = [] //Stores each graphic so it's easy to select the index of the selected segment
let segmentLayers = [] //Stores segment layers
let parcelLayers = []
let parcelLabels = [] //Stores segment labels by parcel
let segmentLabels = [] //Stores segments labels for a parcel
let sParcelLayers = []
let radLayers = []

const lineSymbol = {
    type: "simple-line", // autocasts as new SimpleLineSymbol()
    color: 'cyan', // RGB color values as an array
    width: 4
};



export const createCityLayer = () => {
    return (new MapImageLayer({
        url: "https://www.ocgis.com/arcpub/rest/services/Map_Layers/City_Boundaries/MapServer",
        popupEnabled: false
    }))
}
// const citylayers = new MapImageLayer({
//     url: "https://www.ocgis.com/arcpub/rest/services/Map_Layers/City_Boundaries/MapServer",
//     popupEnabled: false
// })


//https://www.ocgis.com/arcpub/rest/services/Eagle_Aerial_1ft_2021/ImageServer
//https://gis.ocgov.com/arcimg/rest/services/Aerial_Imagery_Countywide/Eagle_2020/ImageServer

const OCbasemapLayer = new ImageryTileLayer({
    url: "https://gis.ocgov.com/arcimg/rest/services/Aerial_Imagery_Countywide/Eagle_2020/ImageServer"
})

// const eagleLayer = new TileLayer({
//     url: "https://gis.ocgov.com/arcimg/rest/services/Aerial_Imagery_Countywide/Eagle_2017/MapServer"
// })

const publicLayer = new ImageryTileLayer({
    url: 'https://www.ocgis.com/arcpub/rest/services/Eagle_Aerial_1ft_2021/ImageServer'
})

const streetlayers = new MapImageLayer({
    url: "https://www.ocgis.com/survey/rest/services/WebApps/Streets/MapServer",
    popupEnabled: false
})

const OCB = new Basemap({
    baseLayers: [OCbasemapLayer],
    title: "Orange County",
    id: "ocbasemap",
})

// const oceagle = new Basemap({
//     baseLayers: [eagleLayer],
//     title: "Eagle",
//     id: "eagle",
// })

const publicB = new Basemap({
    baseLayers: [publicLayer],
    title: "Public",
    id: 'public'
})


const parcelimagelayer = new MapImageLayer({
    url: "https://www.ocgis.com/survey/rest/services/WebApps/Map_Layers_Associated_Documents/MapServer",
    sublayers: [
        {
            id: 66,
            visible: true,
        }, {
            id: 67,
            visible: false
        }, {
            id: 68,
            visible: false
        }
    ]
})

const map = new Map({
    basemap: OCB
})

const polygonSymbol = {
    type: "simple-fill",
    color: [0,0,0,0],
    outline: {
        color: 'red',
        width: 3
    }
}

const selectedPolygonSymbol = {
    type: "simple-fill",
    color: [0,0,0,0],
    outline: {
        color: 'black',
        width: 3
    }
}

const clearup = (view) => {
    selectedLayers = []
    segmentLayers = [] 
    parcelLabels = [] 
    segmentLabels = []

    dict = {};
    dict2 = {};
    oid2lbl = {}
    par2poly = {}
    oid2line = {}

    lblgroup = {}
    lblgroupstart = {}
    lblgroupend = {}
    lblgraphicslayer.graphics.removeAll();
    parcellayer.graphics.removeAll();
    graphicslayer2.graphics.removeAll();
    selectedgraphicslayer.graphics.removeAll()
    radgraphicslayer.removeAll();
    view.graphics.removeAll();
}

const createFeature = (path, words, hid, oid, oidlist, pnum)  => {
    //Creates polylines and adds them to the selectedLayer Graphic and parcelLayer graphic

    const myAtt = {
        legal: words,
        oid: oid,
        hid: hid,
        pnum: pnum
    };

    var myline = new Polyline({
        paths: path,
        spatialReference: { wkid: 2230 }
    });

    dict2[oid] = myline;
    dict[oid] = words;
    hiddict[oid] = hid;

    var baseGraphic = new Graphic({ //
        geometry: myline,
        attributes: myAtt,
        symbol: {
            type: "simple-line",
            color: 'red',
            width: 3
        }
    });

    var selectedGraphic = new Graphic({
        geometry: myline,
        attributes: myAtt,
        symbol: {
            type: "simple-line",
            color: 'blue',
            width: 3
        }, 
        visible: false
    });

    segmentLayers.push(baseGraphic)
    selectedLayers.push(selectedGraphic)

    oid2line[oid] = baseGraphic //For attaching a label to this segment
}

const ericJson = (jsonData, view) => {
    //clearup(view)
    // const dict = jsonData;
    let pnum = 0;
    let mkey = 'Parcel'
    const parcels = jsonData.Parcels
    
    _.forEach(parcels, (value, key) => {
        segmentLayers = []
        pnum += 1
        mkey = 'Parcel' + pnum
        const dictionary = value[0]['Segments'];
        const centroid = value[2]['Centroid'];
        const oidlist = value[4]['Oidlist'];
        oid2lbl[mkey] = oidlist
        const centerx = Number(centroid[0]);
        const centery = Number(centroid[1]);
        const ring = value[3]['Polygon'];
        const poly = new Polygon({
            rings: ring,
            spatialReference: view.spatialReference
        });
        polylist.push(poly)
        par2poly[mkey] = poly

        const pAtt = {
            apn: '#apnresults' + pnum,
            tid: "#tabp" + pnum,
            ppid: '#tabapn' + pnum,
            pnum: 'Parcel' + pnum,
            pstring: 'Parcel ' + pnum,
            hid: pnum
        };
        
        let parcelGraphic = new Graphic({ //Create a polygon of a parcel
            geometry: poly,
            attributes: pAtt,
            symbol: polygonSymbol
        });

        let sParcelGraphic = new Graphic({ //Create a polygon of a parcel
            geometry: poly,
            attributes: pAtt,
            symbol: selectedPolygonSymbol
        });

        
        graphicslayer2.graphics.add(parcelGraphic)
        sParcelLayers.push(sParcelGraphic)

        let lblGraphics = []
        let radParcelLayers = []

        _.forEach(dictionary, (value, key) => {

            const shapetype = value.shapeType;
            const radtangentstart = value.radtangent_start;
            const radtangentend = value.radtangent_end;
            const bearingRadiusInDMSstart = value.annweb_grid_radTanStart;
            const bearingRadiusInDMSend = value.annweb_grid_radTanEnd;
            const startx = value.startx;
            const starty = value.starty;
            const endx = value.endx;
            const endy = value.endy;
            const centerx = value.centerx
            const centery = value.centery
            const words = value.desc_ground;
            const oid = value.oid;
            const wkt = value.wkt;
            const bdlabel = value.annweb_ground;
            let midx = Number(value.midx);
            let midy = Number(value.midy);
            const hid = value.HandleId;


            const signx = Math.sign(centerx - midx);
            const signy = Math.sign(centery - midy)
            const offx = 0;
            const offy = 0;
            if (signx === -1) {
                //console.log('x is positve')
                midx = midx + 3;
            } else {
                //console.log('x is negative')
                midx = midx - 3;
            }
            if (signy === -1) {
                //console.log('y is positve')
                midy = midy + 3;
            } else {
                //console.log('y is negative')
                midy = midy - 3;
            }

            let point = new Point(midx, midy, view.spatialReference);
            const lblGraphic = new Graphic({ //Create label for segment
                geometry: point,
                symbol: {
                    type: "text", // autocasts as SimpleFillSymbol
                    color: "black",
                    haloColor: "white",
                    haloSize: "1px",
                    text: bdlabel,
                    xoffset: 0,
                    yoffset: 0,
                    font: {  // autocast as new Font()
                        size: 9,
                        family: "sans-serif",
                        weight: "bold"
                    }

                }
            });
            segmentLabels.push(lblGraphic) //Individual labels for a selected segment
            lblGraphics.push(lblGraphic) //Array of labels for selected parcel

            lblgroup[oid] = lblGraphic;

            if ((shapetype == 'Curve') && (radtangentstart == "Non-Tangent")) {

                point = new Point(startx, starty, view.spatialReference);
                const lblGraphic = new Graphic({
                    geometry: point,
                    symbol: {
                        type: "text", // autocasts as SimpleFillSymbol
                        color: "black",
                        haloColor: "white",
                        haloSize: "1px",
                        text: bearingRadiusInDMSstart + "\n(Non-Tangent)",
                        xoffset: 0,
                        yoffset: 0,
                        font: {  // autocast as new Font()
                            size: 9,
                            family: "sans-serif",
                            weight: "bold"
                        }

                    }
                });

                lblgroupstart[oid] = lblGraphic;

            }

            if ((shapetype == 'Curve') && (radtangentend == "Non-Tangent")) {

                point = new Point(endx, endy, view.spatialReference);
                const lblGraphic = new Graphic({
                    geometry: point,
                    symbol: {
                        type: "text", // autocasts as SimpleFillSymbol
                        color: "black",
                        haloColor: "white",
                        haloSize: "1px",
                        text: bearingRadiusInDMSend + "\n(Non-Tangent)",
                        xoffset: 0,
                        yoffset: 0,
                        font: {  // autocast as new Font()
                            size: 9,
                            family: "sans-serif",
                            weight: "bold"
                        }

                    }
                });

                lblgroupend[oid] = lblGraphic;
            }

            let str = wkt
            //console.log('Str1', str)
            str = str.replace("MULTILINESTRING Z ((", "").replace('))', '')
            //console.log('str2', str, shapetype)

            if (shapetype == 'Line') {
                //console.log('Line')
                const x = str.split(',')[0].split(' ')[0]
                const y = str.split(',')[0].split(' ')[1]
                const x2 = str.split(',')[1].split(' ')[1]
                const y2 = str.split(',')[1].split(' ')[2]
                const path = [[x, y, 0], [x2, y2, 0]]

                createFeature(path, words, hid, oid, oidlist, pnum);
            } 
            else if (shapetype == 'Curve') {
                const cstr = str.split(', ')
                //console.log('Curve', cstr)
                let item1 = []
                cstr.forEach(function (item) {
                    let item2 = []
                    let item3 = item.split(' ')
                    //console.log('item3', item3)
                    item3.forEach(function (itemx) {
                        const num = Number(itemx)
                        //console.log(itemx, num)
                        item2.push(num)

                    })
                    item1.push(item2)
                })

                const rad = new Polyline({
                    paths: [[startx, starty], [centerx, centery], [endx, endy]],
                    spatialReference: { wkid: 2230 }
                })

                const radgraphic = new Graphic({
                    geometry: rad,
                    attributes: {oid: oid},
                    symbol: {
                        type: 'simple-line',
                        color: 'blue',
                        width: 1,
                        style: 'dash'
                    }
                })
                radParcelLayers.push(radgraphic)
                createFeature(item1, words, hid, oid, oidlist, pnum);
            }
        })
        radLayers.push(radParcelLayers)
        parcelLayers.push(segmentLayers)
        parcelLabels.push(lblGraphics) //Gather array of labels per parcel for selected parcels
    })
    segmentLayers = [].concat.apply([], parcelLayers)
    parcellayer.graphics.removeAll()
    parcellayer.graphics.addMany(segmentLayers);
    parcellayer.when(function () { //zoom to area of interest on load
        view.goTo({
            target: parcellayer.graphics
        });
    });
}

export const buildMap = (json, mapRef, cityLayers, setSelected, selected, setOpen) => {

    config.request.trustedServers.push("https://gis.ocgov.com")
    config.request.timeout = 300000

    //Add baselayers to map
    map.add(cityLayers)
    map.add(parcelimagelayer)
    map.add(streetlayers)

    const view = new MapView({
        container: mapRef,
        map: map,
        constraints: {
            lods: lods
        },
        spatialReference: new SpatialReference({
            wkid: 2230
        })
    })

    clearup(view)

    const btoggle = new BasemapToggle({
        titleVisible: true,
        view: view,
        nextBasemap: publicB
    })

    view.ui.add(btoggle, "bottom-left")
    view.ui.move("zoom", "bottom-right")
    // view.ui.add("reset-map", "top-left")

    //Display parcel number when clicked on
    view.popup = {
        dockEnabled: true,
        position: 'top-right',
        autoOpenEnabled: false,
        dockOptions: {
            buttonEnabled: false,
            breakpoint: false
        }
    }

    //Add layers to map
    
    map.add(graphicslayer2)
    map.add(selectedParcelGraphic)
    map.add(selectedgraphicslayer)
    map.add(parcellayer)
    map.add(radgraphicslayer)
    map.add(lblgraphicslayer)

    

    // view.when(function () {
    //     //myUpload()
    // })

    ericJson(json, view)

    //Check if cursor is hovering a segment. If it is, highlight the segment
    view.on("pointer-move", e => {
        try {
            view.hitTest(e).then(response => {
                if(response.results.length > 0){
                    try {
                        const graphic = response.results.filter(result => {
                            if (result.graphic.layer === parcellayer){
                               document.body.style.cursor = 'pointer'
                               return result.graphic.layer
                           }
                       })[0].graphic

                       let i = 0

                        segmentLayers.forEach(e => {
                            i++
                            if (i == graphic.attributes.oid) {
                                e.symbol = {
                                    type: "simple-line",
                                    color: 'blue',
                                    width: 3
                                }
                            } else {
                                e.symbol = {
                                    type: "simple-line",
                                    color: [0,0,0,0],
                                    width: 3
                                }
                            }

                            parcellayer.graphics.removeAll()
                            parcellayer.graphics.addMany(segmentLayers)
                            //console.log(graphic.attributes.oid)
                        })
                    } catch {
                        document.body.style.cursor = 'default'

                        segmentLayers.forEach(e => {
                            e.symbol = {
                                type: "simple-line",
                                color: [0,0,0,0],
                                width: 3
                            }
                        })
                        parcellayer.graphics.removeAll()
                        parcellayer.graphics.addMany(segmentLayers)
                    }

                } else if (selected){
                    document.body.style.cursor = 'default'
                    selectedLayer(selected)

                } else {
                    document.body.style.cursor = 'default'
                    
                    segmentLayers.forEach(e => {
                        e.symbol = {
                            type: "simple-line",
                            color: [0,0,0,0],
                            width: 3
                        }
                    })
                    parcellayer.graphics.removeAll()
                    parcellayer.graphics.addMany(segmentLayers)
                }
            })
        } catch {
            console.log('none')
        }
    })

    //Check if segment has been clicked on. If it has been, select that segment and highlight it throughout the app
    view.on("pointer-down", e => {
        try {
            view.hitTest(e).then(response => {
                if(response.results.length > 0){
                    try {
                        let check = 0
                        const graphic = response.results.filter(result => {
                            if (result.graphic.layer === selectedgraphicslayer) {
                                //Unselect the selected layer
                                selectedLayers.forEach(e => e.visible = false)
                                selectedgraphicslayer.graphics.removeAll()
                                selectedgraphicslayer.graphics.addMany(selectedLayers);
                                check = 1
                                return result.graphic.layer
                            } else if (result.graphic.layer === parcellayer){
                                return result.graphic.layer
                            }
                        })[0].graphic
                        if (check == 1) {
                            setSelected(null)
                        } else {
                            setSelected(graphic.attributes.oid)
                            setOpen(graphic.attributes.pnum - 1)
                            fitToViewerHandleId(graphic.attributes.hid)
                        }
                    } catch {
                        console.log('unselected')
                    }
                }
            })
        } catch {
        }
    })


    //Check if parcel exists where mouse is long clicked. If one does, select that parcel and display the selected parcel
    view.on("hold", function (event) {
        let lastgeo = ''
        view.hitTest(event).then(function (response) {
            try {
                const graphic = response.results.filter(function (result) {
                    if (result.graphic.layer === graphicslayer2) {
                        return result.graphic.layer === graphicslayer2;
                    }
                    
                })[0].graphic;
                view.popup.open({
                    title: graphic.attributes.pstring,
                })
                
                const attribute = graphic.attributes;
                const hid = attribute.hid;
                setOpen(hid - 1)
                setSelected(null)
                // if (hid) {
                    
                //     const overLayGeometryExtension = viewer.getExtension('OverLayGeometry')
                //     // Call Function to zoom in to object on viewer.
                //     console.log('Extension found')
                //     //executeFitToViewHandleId(hid);
    
                //     overLayGeometryExtension.searchSelectedObj(hid, viewerDbIds)
                // }
            } catch {
                view.popup.open({
                    title: "No Parcel Found",
                })
            }
        })
    })

    // view.on("pointer-down", function (event) {
    //     let lastgeo = ''
    //     try {
    //         view.hitTest(event).then(function (response) {
    //             const graphic = response.results.filter(function (result) {
    //                 if (result.graphic.layer === selectedgraphicslayer) {
    //                     console.log('Mapbe poly')
    //                 }
    //                 return result.graphic.layer === selectedgraphicslayer;
    //             })[0].graphic;
    //             const attribute = graphic.attributes;
    //             const hid = attribute.hid;
    //             console.log(graphic.attributes.hid)
    //             // const overLayGeometryExtension = viewer.getExtension('OverLayGeometry')
    //             // if (hid) {
    //             //     // Call Function to zoom in to object on viewer.
    //             //     executeFitToViewHandleId(hid);
    
    //             //     overLayGeometryExtension.searchSelectedObj(hid, viewerDbIds)
    //             // }
    
    //             const geo = graphic.geometry;
    //             //view.graphics.removeAll();
    //             // $(".lblclass").css("background-color", "white");
    //             // $(".ptab").css("background-color", "white");
    //             // $(".atab").removeClass("show");
    //             // $(".headtab").addClass("collapsed");
    
    
    //             if (lastgeo !== geo) {
    //                 lastgeo = geo;
    //                 //lineSymbol
    
    //                 var graphic3 = new Graphic({
    //                     geometry: geo,
    //                     symbol: lineSymbol
    //                 });
    
    //                 ////*[@id="87"]
    
    //                 view.graphics.add(graphic3);
    
    //                 // $("#" + attribute.oid).css("background-color", "cyan");
    //                 // var pid = $("#" + attribute.oid).attr("pid");
    //                 // $(pid).css("background-color", "cyan");
    //                 // var ppid = $(pid).attr("ppid");
    //                 // var tid = $(pid).attr("tid");
    //                 // $(ppid).addClass("show");
    //                 // $(tid).removeClass("collapsed");
    //                 // $(tid).attr("aria-expanded", "true")
    //                 // $(pid)[0].scrollIntoView({
    //                 //     behavior: "smooth", // or "auto" or "instant"
    //                 //     block: "start" // or "end"
    //                 // });
    //                 // $("#" + attribute.oid)[0].scrollIntoView({
    //                 //     behavior: "smooth", // or "auto" or "instant"
    //                 //     block: "start" // or "end"
    //                 // });
    //             } else {
    //                 //console.log('Same');
    //             }
    
    //         })
    //     } catch {
    //         console.log('out of bounds')
    //     }
        
    // })
}

//Handles highlighting selected segment
export const selectedLayer = (selected, open) => {
    selectedLayers.forEach(e => e.visible = false)
    if (selected) {
        let select = selected - 1
        selectedLayers[select].visible = true
        let radselect = [].concat.apply([], radLayers).findIndex(e => e.attributes.oid == selectedLayers[select].attributes.oid)
        radgraphicslayer.removeAll()
        radgraphicslayer.add([].concat.apply([], radLayers)[radselect])
        console.log(radgraphicslayer)
        selectedgraphicslayer.graphics.removeAll()
        selectedgraphicslayer.graphics.addMany(selectedLayers);
        lblgraphicslayer.graphics.removeAll()
        lblgraphicslayer.graphics.add(segmentLabels[select]);
        fitToViewerHandleId(selectedLayers[select].attributes.hid)
    } else if (open !== 0){
        selectedgraphicslayer.graphics.removeAll()
        selectedgraphicslayer.graphics.addMany(selectedLayers);
        lblgraphicslayer.graphics.removeAll()
        lblgraphicslayer.graphics.addMany(parcelLabels[open]);
    }
}

//Handles adding labels to selected parcel
export const selectedParcel = (open, selected) => {
    if(open !== null) {
        selectedParcelGraphic.graphics.removeAll()
        selectedParcelGraphic.graphics.add(sParcelLayers[open])
        if (!selected) {
            lblgraphicslayer.graphics.removeAll()
            lblgraphicslayer.graphics.addMany(parcelLabels[open]);
            radgraphicslayer.graphics.removeAll()
            radgraphicslayer.graphics.addMany(radLayers[open])
        }
    } else {
        selectedParcelGraphic.graphics.removeAll()
        if(!selected) {
            radgraphicslayer.removeAll()
            lblgraphicslayer.removeAll()
        }
    }
}

export default {
  buildMap,
  createCityLayer,
  selectedLayer
}