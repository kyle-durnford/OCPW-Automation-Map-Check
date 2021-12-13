import React, { useState, useEffect, createRef, Fragment } from "react"
import { makeStyles } from '@material-ui/core/styles';
import { HubConnectionBuilder } from "@microsoft/signalr";
import { CircularProgress } from '@material-ui/core';
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
import Checklist from "./Checklist";
import TriError from '../assets/TriError.js'
import { viewer } from '../data/forge'


const drawerWidth = 100;

// const Item = styled(Paper)(({ theme }) => ({
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: 'center',
//   color: theme.palette.text.secondary,
// }));

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    height: '100vh'
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    background : 'white',
    border: 0,
    
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    backgroundColor: '#F4F5FC',
    '& .MuiDrawer-paperAnchorLeft': {
      backgroundColor: '#F4F5FC',
      border: 0
    }
  },
  drawerCont: {
    display: 'flex',
    justifyContent: 'flex-start',
    background: '#F4F5FC',
    position: 'relative'
  },
  drawerPaper: {
    width: drawerWidth,
  },
  button: {
    float: 'right',
    color: '#FE805C'
  },
  imgContainer: {
    height: '10rem',
  },
  box: {
    bgcolor: '#3E52BB',
    borderColor: 'grey.500',
    m: 1,
    border: 1,
    style: { width: '30rem', height: '30rem' },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
  rightToolbar: {
    marginLeft: "auto",
    marginRight: -12
  },
  mapView: {
    width: '100%'
  },
  mapCont: {
    width: '100%',
    height: 'calc(100% - 4.4rem)'
  },
  flex: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '1rem',
    background: '#F4F5FC',
    height: 'calc(100vh - 4rem - 69px)',
    cursor: 'pointer'
  },
  flexError: {
    background: '#ed8c9540',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '1rem',
    height: 'calc(100vh - 4rem - 69px)',
    cursor: 'pointer'
  },
  mapUploadText: {
    fontFamily: 'poppins, sans-serif',
    fontWeight: '600',
    fontSize: '1.5rem',
    color: '#6E7998',
    marginTop: '1rem'
  },
  mapUploadTextError: {
    fontFamily: 'poppins, sans-serif',
    fontWeight: '600',
    fontSize: '1.5rem',
    color: 'rgb(245, 93, 110)',
    marginTop: '1rem'
  }
}));

const boxProps = {
  style: {
    background: '#FFF',
    width: '100%', 
    height: '40rem',
    padding: '2rem'
  }
};

const defaultPropsRight = {
  style: {
    background: '#eee',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: "1 1 auto",
    height: '100%',
    overflow: 'hidden',
    position: 'relative'
  },
};

const defaultAltProps = {
  style: {
    background: '#dff0eb',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 'calc(50% - .5rem)',
    maxWidth: '85%',
    height: '100%',
    overflow: 'hidden'
  },
};

const mapErrorProps = {
  style: {
    background: '#ed8c9540',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: "1 1 auto",
    height: '100%',
    overflow: 'hidden',
    position: 'relative'
  }
}

const dividerProps = {
  style: {
    width: '1rem',
    content: '""',
    backgroundColor: "#f4f5fc",
    cursor: 'col-resize',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }
}

const horizontalDividerProps = {
  style: {
    width: '100%',
    height: '1rem',
    content: '""',
    backgroundColor: "#f4f5fc",
    cursor: 'row-resize',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }
}

const mapContProps = {
  style: {
    display: "flex", 
    flexDirection: "row",  
    flexWrap: "nowrap", 
    alignItems: 'flex-start',
    height: '50%',
    width: '100%',
    minHeight: '20vh'
  }
}

const rightContProps = {
  style: {
    display: "flex",
    flexDirection: "column",
    flexWrap: 'nowrap',
    alignItems: 'flex-start',
    height: '84vh',
  }
}

const dividerHandle = {
  style: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }
}

const dividerHandleHorz = {
  style: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  }
}

const dividerHandleBarHorz = {
  style: {
    height: '2px',
    width: '20px',
    backgroundColor: '#a0acf0',
    content: '"',
    margin: '1px'
  }
}

const dividerHandleBarVert = {
  style: {
    height: '20px',
    width: '2px',
    backgroundColor: '#a0acf0',
    content: '"',
    margin: '1px'
  }
}

const Container = () => {
  const classes = useStyles();
  const [page, setPage] = useState('project')
  const [submit, setSubmit] = useState(false);
  const [open, setOpen] = useState(false)
  const [tableInfo, setTableInfo] = useState(null)
  const [parcelInfo, setParcelInfo] = useState(null)
  //const [data, setData] = useState(dummyData)
  const [loading, setLoading] = useState(false)
  const [loadingTable, setLoadingTable] = useState(true)
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
  const [container, setContainer] = useState()
  const [hideDrawer, setHideDrawer] = useState(false)
  const [urn, setUrn] = useState(null)
  const [forgeError, setForgeError] = useState()
  const [appError, setAppError] = useState()

  const leftRef = createRef();
  const splitPaneRef = createRef();
  const drawerContRef = createRef();

  // const getData = () => {
  //   fetch('437oc.json', {
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Accept': 'application/json'
  //     }
  //   })
  //   .then(response => {
  //     return response.json();
  //   })
  //   .then(myData => {
  //     // console.log(myData);
  //     setData(myData);
      
  //   })
  // }

  // useEffect(()=> {
  //   getData()
  // },[])

  // useEffect(() => {
  //   if (submit === true) {
  //     getData()
  //     // setData(dummyData);
  //   }
  // },[submit])

  // useEffect(() => {
  //   if (data === null) {
  //     setLoading(false);
  //   } else {
  //     setLoading(true);
  //   }
  // }, [data])

      
  // const setMapRef = (mapRef) => {
  //   setContainer(mapRef)
  // }

  useEffect(() => {
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
  }, [])


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
              setTimeout(() => {
                setAppError()
              }, 5000)
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
              setModelDerivativeId(id)
          }) 

          modelDerivativeConnect.on("extractionFinished", (extractionFinished) => {
            console.log('extractionFinished:', extractionFinished)
            setUrn(extractionFinished.resourceUrn)
          });
      }).catch(e => console.log('Connection failed: ', e));

    }
  }, [modelDerivativeConnect]);


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
    setOpen(true);
  };

  const onDialogClose = () => {
    setOpen(false)
  }

  const handleLoading = (isLoading) => {
    setSubmit(isLoading)
  }

  const onMouseDown = (e, bar) => {
    setBar(bar)
    setSeparatorYPosition(e.clientY);
    setSeparatorXPosition(e.clientX);
    setDragging(true);
  };

  const MIN_WIDTH = 150;
  const MIN_HEIGHT = 150;

  const onMouseMove = (e) => {

    if (dragging && bar === "horz") {
      const newLeftWidth = leftWidth + e.clientX - separatorXPosition;
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
      viewer.resize()
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
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

      return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      };
  });


  return (
    <div className={classes.root}>
      <div className={classes.drawerCont} ref={drawerContRef}>
        <div style={{position:'relative', width: 'calc(82px + .5rem)'}}>
          <NavMenu setPage={setPage} page={page} hideDrawer={hideDrawer} setHideDrawer={setHideDrawer}/>
        </div>
        <Drawer hideDrawer={hideDrawer} loading={loading} page={page} data={parcelInfo} setSelected={setSelected} selected={selected} section={section} setSection={setSection}/>
      </div>
      <div className={classes.mapView}>
        <AppBar handleClickOpen={handleClickOpen} />
        <DialogUploadFile open={open} onClose={onDialogClose} connectionId={designAutomationId} isLoading={handleLoading}/>
        <div className={classes.mapCont}>
        {/* {page === 'check' && submit ?  
          <Checklist data={parcelInfo} section={section} setSection={setSection}/> */}
        { submit && !appError ?
          <div ref={e => setSplitPaneHeightRef(e)} {...rightContProps}>
          <div {...mapContProps} ref={splitPaneRef} className={"splitPane", 'noselect'} ref={e => setTopRef(e)}>
            <div {...defaultAltProps} ref={leftRef}>
              {esriData ?
                <EsriMap loading={loadingEsri} esriData={esriData} selected={selected}/>   
                :
                <Fragment>
                    <span className={classes.circularProgress}>
                        <CircularProgress size={48} />
                    </span>
                </Fragment>                
              }
            </div>
            <div {...dividerProps} onMouseDown={e => onMouseDown(e, 'horz')}>
              <div {...dividerHandle}>
                <span {...dividerHandleBarVert}></span>
                <span {...dividerHandleBarVert}></span>
              </div>
            </div>
            <div {...(forgeError ? {...mapErrorProps} : {...defaultPropsRight})}>
              <ForgeMap loading={loadingForge} objectKeys={objectKeys} connectionId={modelDerivativeId} urn={urn} setError={setForgeError} error={forgeError}/>
            </div>
          </div>
          <div {...horizontalDividerProps} onMouseDown={(e) => onMouseDown(e, 'vert')}>
          <div {...dividerHandleHorz}>
                <span {...dividerHandleBarHorz}></span>
                <span {...dividerHandleBarHorz}></span>
              </div>
            </div>
          <SurveyTable page={page} loading={loadingTable} data={tableInfo} selected={selected} setSelected={setSelected}/>
        </div>
         : appError ?
          <div>
            <div {...boxProps}>
              <div className={classes.flexError} onClick={() => setOpen(true)}>
                  <TriError color={'rgb(245, 93, 110)'}/>
                  <div className={classes.mapUploadTextError}>{appError}</div>
              </div>
            </div>
          </div>
        : 
        <div>
          <div {...boxProps}>
            <div className={classes.flex} onClick={() => setOpen(true)}>
                <img src={planImage} height='150px' width='150px' alt=""/>
                <div className={classes.mapUploadText}>Upload a map to get started</div>
            </div>
          </div>
        </div>
        }
        </div>
      </div>
    </div> 
    ) 
}

export default Container
