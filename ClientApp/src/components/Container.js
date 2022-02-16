import React, { useState, useEffect, createRef, Fragment } from "react"
import { HubConnectionBuilder } from "@microsoft/signalr";
import DialogUploadFile from './DialogUploadFile'
import SurveyTable from './SurveyTable'
import EsriMap from './EsriMap'
import ForgeMap from './ForgeMap'
import NavMenu from './NavMenu'
import Drawer from './Drawer'
import AppBar from './AppBar'
import planImage from "../assets/plan_drawing.svg"
import connection from '../services/connection'
// import { buildMap } from '../data/esri'
//import Checklist from "./Checklist";
import TriError from '../assets/TriError.js'
import { viewer } from '../data/forge'
import { display } from "@mui/system";

const Container = () => {
  const [page, setPage] = useState('project')
  const [submit, setSubmit] = useState(false);
  const [openDialog, setOpenDialog] = useState(false)
  const [tableInfo, setTableInfo] = useState(null)
  const [parcelInfo, setParcelInfo] = useState(null)
  const [loading, setLoading] = useState(false)
  const [loadingTable, setLoadingTable] = useState(true)
  const [mapInfo, setMapInfo] = useState()
  const [loadingEsri, setLoadingEsri] = useState(true)
  const [loadingForge, setLoadingForge] = useState(true)
  const [designAutomationId, setDesignAutomationId] = useState()
  const [modelDerivativeId, setModelDerivativeId] = useState()
  const [designAutomationConnect, setDesignAutomationConnect] = useState(null)
  const [modelDerivativeConnect, setModelDerivativeConnect] = useState(null)
  const [designAutomationUrl, setDesignAutomationUrl] = useState()
  const [objectKeys, setObjectKeys] = useState()
  const [selected, setSelected] = useState()
  const [didMount, setDidMount] = useState(false)
  const [leftWidth, setLeftWidth] = useState();
  const [separatorXPosition, setSeparatorXPosition] = useState(undefined);
  const [dragging, setDragging] = useState(false);
  const [bar, setBar] = useState()
  const [topHeight, setTopHeight] = useState()
  const [separatorYPosition, setSeparatorYPosition] = useState(undefined);
  const [splitPaneHeightRef, setSplitPaneHeightRef] = useState();
  const [topRef, setTopRef] = useState();
  const [section, setSection] = useState(1);
  const [esriData, setEsriData] = useState()
  const [hideDrawer, setHideDrawer] = useState(false)
  const [urn, setUrn] = useState(null)
  const [forgeError, setForgeError] = useState()
  const [appError, setAppError] = useState()
  const [lineErrors, setLineErrors] = useState(0)
  const [curveErrors, setCurveErrors] = useState(0)
  const [lineMissing, setLineMissing]  = useState(0)
  const [curveMissing, setCurveMissing] = useState(0)
  const [restart, setRestart] = useState(0)
  const [open, setOpen] = useState(null);
  const [files, setFiles] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const [mapSplit, setMapSplit] = useState(2)
  const [activeMaps, setActiveMaps] = useState(['esri', 'forge'])

  const leftRef = createRef();
  const splitPaneRef = createRef();
  const drawerContRef = createRef();

  useEffect(() => {
    console.log('EsriDataCheck', esriData)
  }, [esriData])

  useEffect(() => {
    if(!mapInfo) {
      const designAutomation = new HubConnectionBuilder().withUrl("/api/signalr/designautomation").withAutomaticReconnect().build();
    setDesignAutomationConnect(designAutomation)

    const modelDerivative = new HubConnectionBuilder().withUrl("/api/signalr/modelderivative").withAutomaticReconnect().build();
    setModelDerivativeConnect(modelDerivative)

    // connection.clearAccount().then(
    //     response => {
    //         console.log('clearAccount: ', response)
    //     },
    //     error => {
    //        console.log('Error:', error)        }
    // )

    // if(urn) {
    //   connection.deleteManifest(urn)
    //   console.log("Urn Deleted")
    // }

    connection.createAppBundle().then(
        response => {
            console.log('AppBundle: ', response)
        },
        error => {
           console.log('Error:', error)        }
    )

    connection.createActivity().then(
        response => {
            console.log('Activity: ', response)
        },
        error => {
           console.log('Error:', error)        }
    )

    connection.getAppBundle().then(
        response => {
            console.log('AppBundle: ', response)
        },
        error => {
           console.log('Error:', error)        }
    )

    connection.getActivity().then(
        response => {
            console.log('Activity: ', response)
        },
        error => {
           console.log('Error:', error)        }
    )

    setDidMount(true)
    }
  }, [mapInfo])


  useEffect(() => {
    if (designAutomationConnect) {

      console.log('designAutomationConnect changed')
      
      designAutomationConnect.start().then(() => {
          designAutomationConnect.invoke('getConnectionId').then((id) => {
              console.log("getConnectionId DesignAutomation result: " , id)
              setDesignAutomationId(id)
          })

          designAutomationConnect.on("downloadResult", (url) => {
            console.log('downloadResult:', url)
            setDesignAutomationUrl(url)
            setLoadingTable(false)
          })

          designAutomationConnect.on("onComplete", (message) => {
            console.log('onComplete:', message)
            if(JSON.parse(message).status === 'failedDownload') {
              setAppError('Unable to download data from Autodesk. Please try again.');
            } else if(JSON.parse(message).status === 'failedInstructions') {
              setAppError('There is a problem with the uploaded file. Please try again.');
            } else {
              setAppError(null)
            }
          })

          designAutomationConnect.on("objKeysInputFile", (objectKeys) => {
            console.log('objKeysInputFile:', objectKeys)
            setObjectKeys(objectKeys)
          })

      }).catch(e => console.log('Connection failed: ', e));
    

    }
  }, [designAutomationConnect]);

  useEffect(() => {
    if (modelDerivativeConnect) {

      console.log('modelDerivativeConnect changed')

      modelDerivativeConnect.start().then(() => {
          modelDerivativeConnect.invoke('getConnectionId').then((id) => {
            console.log("getConnectionId ModelDerivative result: " , id)
              if (id.indexOf('_') !== -1) {
                console.log('Restarting...');
                modelDerivativeConnect.stop();
                const md = new HubConnectionBuilder().withUrl("/api/signalr/modelderivative").withAutomaticReconnect().build();
                setModelDerivativeConnect(md)
                // startConnection();
                return;
              }
              setModelDerivativeId(id)
          }) 

          modelDerivativeConnect.on("extractionFinished", (extractionFinished) => {
            console.log('extractionFinished:', extractionFinished)

            setUrn(extractionFinished.resourceUrn)
          });
      }).catch(e => console.log('Connection failed: ', e));

    }
  }, [modelDerivativeConnect, restart]);


  useEffect(() => {
    if (didMount) {
      // console.log('Url:', designAutomationUrl)
      connection.getTableInfo(designAutomationUrl).then(
          response => {
              // console.log('Response', response)

              const keys = Object.keys(response)
              const values = keys.map((key) => {
                  return(response[key])
              })
              const tableData = Object.entries(Object.entries(Object.entries(values[1])));

              setTableInfo(tableData)
              setParcelInfo(response)
              setLoadingTable(false)

              // buildMap(response, container)
              setLoadingEsri(false)
              setEsriData(response)
              
              setLeftWidth(topRef?.clientWidth/2 - 8)
          },
          error => {
            console.log('Error:', error)        }
      )
    }  
  }, [designAutomationUrl, didMount]);

  // if (modelDerivativeConnect && modelDerivativeConnect.connectionState) {

  //   console.log('modelDerivativeConnect State:', modelDerivativeConnect.connectionState)

  //   modelDerivativeConnect.on('extractionFinished', (extractionFinished) => {
  //     console.log('extractionFinished:', extractionFinished)
  //   });
  // }

  const handleClickOpen = () => {
    setFiles([])
    console.log(files.length)
    setOpenDialog(true);
  };

  const onDialogClose = () => {
    setOpenDialog(false)
  }

  const handleLoading = (isLoading) => {
    setAppError(null)
    setSubmit(isLoading)
  }

  //Handling resizable map containers
  //There is a vertical bar and a horizontal bar
  //TODO:
    //1. Add the ability to choose between 1-4 map containers (depending on how many maps we will need)
    //2. Add handles for the additional maps when necessary

  const onMouseDown = (e, bar) => {
    setBar(bar)
    setSeparatorYPosition(e.clientY);
    setSeparatorXPosition(e.clientX);
    setDragging(true);
  };

  //Making sure the maps don't get too small. Theres is also a min-width in the css as a backup
  const MIN_WIDTH = 150;
  const MIN_HEIGHT = 150;

  const onResize = e => {
    setWindowWidth(e.target.innerWidth)
  }


  const onMouseMove = e => {

    if (dragging && bar === "horz") {
      const newLeftWidth = leftWidth + e.clientX - separatorXPosition; //Current width of left panel + mouse position - current handle bar position
      setSeparatorXPosition(e.clientX);

      if (newLeftWidth < MIN_WIDTH) {
        setLeftWidth(MIN_WIDTH);
        return;
      }

      if (splitPaneRef.current) {
        const splitPaneWidth = splitPaneRef.current.clientWidth;

        if (newLeftWidth > splitPaneWidth - MIN_WIDTH) {
          setLeftWidth(splitPaneWidth - MIN_WIDTH);
          return;
        }
      }
      setLeftWidth(newLeftWidth);

    } else if (dragging && bar === 'vert'){
      const newTopHeight = topHeight + e.clientY - separatorYPosition
      setSeparatorYPosition(e.clientY);

      if (splitPaneHeightRef) {
        const splitPaneHeight = splitPaneHeightRef.clientHeight;
        if (newTopHeight > splitPaneHeight - MIN_HEIGHT) {
          setTopHeight(splitPaneHeight - MIN_HEIGHT);
          return;
        }
      }
      setTopHeight(newTopHeight);
    }
  };

  const onMouseUp = () => {
    setDragging(false);
    setBar('');
    if(viewer) {
      viewer.resize() //Resize forge map when finished resizing container.
    }
  };

  useEffect(() => {
    if (leftRef.current) {
      if (!leftWidth) {
        setLeftWidth(leftRef.current?.clientWidth);
      }
      leftRef.current.style.width = `${leftWidth}px`;
    }
  }, [leftRef, leftWidth, setLeftWidth])

  useEffect(() => {
    if (topRef) {
      if (!topHeight) {
        setTopHeight(topRef?.clientHeight);
      }
      topRef.style.height = `${topHeight}px`;
    }
  }, [topRef, topHeight, setTopHeight])

  useEffect(() => {
    console.log(mapSplit)
    if ((mapSplit === 1 || mapSplit === 3) && leftRef.current) {
      leftRef.current.style.width = '100%'
    } else if(mapSplit === 2 && leftRef.current) {
      setLeftWidth('calc(50% - 1rem)')
      leftRef.current.style.width = 'calc(50% - 1rem)'
    }
    if(viewer) {
      viewer.resize() //Resize forge map when finished resizing container.
    }
  }, [mapSplit])

  useEffect(() => {
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
    window.addEventListener('resize', onResize)

      return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('resize', onResize)
      };
  });

  //TODO: Create a component for the loading spinners and create an orange county themed loading spinner.
  //Also probably want to create a component for the error displays (TriError)

  return (
    <>
    {windowWidth <= 1024 ?
      <div className="size-error">
        <h1 className="size-error__title">Please open this app on a larger screen</h1>
      </div>
      : null}
    <div className='root'>
      <div className='drawercont' ref={drawerContRef}>
        <div className="drawercont__navcont">
          <NavMenu setPage={setPage} page={page} hideDrawer={hideDrawer} setHideDrawer={setHideDrawer}/>
        </div>
        <Drawer hideDrawer={hideDrawer} loading={loading} page={page} data={parcelInfo} setSelected={setSelected} selected={selected} section={section} setSection={setSection} lineErrors={lineErrors} curveErrors={curveErrors} lineMissing={lineMissing} curveMissing={curveMissing} open={open} setOpen={setOpen}/>
      </div>
      <div className='mapcont'>
        <AppBar handleClickOpen={handleClickOpen} setMapSplit={setMapSplit} mapSplit={mapSplit}/>
        <DialogUploadFile open={openDialog} onClose={onDialogClose} connectionId={designAutomationId} isLoading={handleLoading} setEsriData={setEsriData} setTableInfo={setTableInfo} setMapInfo={setMapInfo} setParcelInfo={setParcelInfo} files={files} setFiles={setFiles}/>
        <div className="mapcont__view">
        {/* {page === 'check' && submit ?  
          <Checklist data={parcelInfo} section={section} setSection={setSection}/> */}
        { submit && !appError ?
          <div ref={e => setSplitPaneHeightRef(e)} className="mapcont__view__cont">
            <div className="splitpane" ref={splitPaneRef} ref={e => setTopRef(e)}>
              <div className='splitpane__map splitpane__map--left' ref={leftRef} style={mapSplit === 3 ? {display: 'none'} : {display: 'block'}}>
                  <EsriMap esriData={esriData} selected={selected} setSelected={setSelected} open={open} setOpen={setOpen}/>
              </div>
              <div className="splitpane__divider splitpane__divider--ver" onMouseDown={e => onMouseDown(e, 'horz')} style={mapSplit === 1 || mapSplit === 3 ? {display: 'none'} : {display: 'block'}}>
                <div className="splitpane__divider__handle splitpane__divider__handle--ver">
                  <span className="splitpane__divider__handle__bar splitpane__divider__handle__bar--ver"></span>
                  <span className="splitpane__divider__handle__bar splitpane__divider__handle__bar--ver"></span>
                </div>
              </div>
              <div className={(forgeError ? 'splitpane__map splitpane__map--error' : 'splitpane__map splitpane__map--right')} style={mapSplit === 1 ? {display: 'none'} : {display: 'block'}}>
                <ForgeMap objectKeys={objectKeys} connectionId={modelDerivativeId} urn={urn} setError={setForgeError} error={forgeError} mapInfo={mapInfo} setMapInfo={setMapInfo}/>
              </div>
            </div>
            <div className="splitpane__divider splitpane__divider--hor" onMouseDown={(e) => onMouseDown(e, 'vert')}>
            <div className="splitpane__divider__handle splitpane__divider__handle--hor">
                  <span className="splitpane__divider__handle__bar splitpane__divider__handle__bar--hor"></span>
                  <span className="splitpane__divider__handle__bar splitpane__divider__handle__bar--hor"></span>
                </div>
              </div>
            <SurveyTable page={page} loading={loadingTable} data={tableInfo} selected={selected} setSelected={setSelected} lineErrors={lineErrors} setLineErrors={setLineErrors} curveErrors={curveErrors} setCurveErrors={setCurveErrors} lineMissing={lineMissing} setLineMissing={setLineMissing} curveMissing={curveMissing} setCurveMissing={setCurveMissing}/>
          </div>

        : appError ?

            <div className="upload">
              <div className="upload__zone upload__zone--error" onClick={() => setOpenDialog(true)}>
                  <TriError color={'#842029'}/>
                  <div className='upload__text upload__text--error'>{appError}</div>
              </div>
            </div>

        : 
        
          <div className="upload">
            <div className="upload__zone" onClick={() => setOpenDialog(true)}>
                <img src={planImage} height='150px' width='150px' alt=""/>
                <div className='upload__text'>Upload a map to get started</div>
            </div>
          </div>
        }
        </div>
      </div>
    </div>
    </>
    )
}

export default Container
