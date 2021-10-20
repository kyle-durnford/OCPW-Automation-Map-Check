import React, { useState, useEffect } from "react"
import { makeStyles } from '@material-ui/core/styles';

import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
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


const drawerWidth = 100;

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

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
    width: '100%'
  },
  flex: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '1rem',
    background: '#F4F5FC',
    height: 'calc(100vh - 4rem - 69px)',
    cursor: 'pointer'
  },
  mapUploadText: {
    fontFamily: 'poppins, sans-serif',
    fontWeight: '600',
    fontSize: '1.5rem',
    color: '#6E7998',
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

const defaultProps = {
  style: {
    width: '100%', 
    height: '60vh', 
    background: '#eee',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
};

const defaultAltProps = {
  style: {
    width: '100%', 
    height: '60vh', 
    background: '#dff0eb',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
};

const dividerProps = {
  style: {
    width: '20px',
    height: '60vh',
    content: '""',
    backgroundColor: "#fff",
    cursor: 'col-resize'
  }
}

const mapContProps = {
  style: {
    display: "flex", 
    flexDirection: "row", 
    flex: "1 1 0px", 
    flexWrap: "nowrap", 
    justifyContent: "center"
  }
}

const dummyData = [
  { parcel: [
    { dimension: 'line', desc: 'Lorem ipsum dolor sit amet, consec adipiscing elit.', status: 'good', name: 'Property: 1', length: '6', bearing: 'S 43 12 48.56 E', label: 'N43 12 41.56W', diff: "0 00 0", sources: "good", lengthcheck: "good", bearingcheck: "good", northorientation: "good"},
    { dimension: 'line', desc: 'Lorem ipsum dolor sit amet, consec adipiscing elit. Nulla enim dolor, facilisis quis venenatis quis.', status: 'good', name: 'Property: 1', length: '8', bearing: 'S 58 12 21.56 E', label: 'N58 12 41.56W', diff: "1 00 0", sources: "good", lengthcheck: "good", bearingcheck: "good", northorientation: "good"},
    { dimension: 'line', desc: 'Lorem ipsum dolor sit amet, consec adipiscing elit.', status: 'warn', name: 'Property: 1', length: '3', bearing: 'S 23 12 31.56 E', label: 'N23 12 41.56W', diff: "2 00 0", sources: "warn", lengthcheck: "warn", bearingcheck: "good", northorientation: "good"},
    { dimension: 'line', desc: 'Lorem ipsum dolor sit amet, consec adipiscing elit. Mauris tincidunt bibendum leo, sed fermentum tellus. In posuere mi mauris, nec tincidunt justo dapibus quis. Praesent dapibus, dolor nec tristique pharetra, magna elit viverra nunc, in faucibus mi odio sed ipsum.', status: 'error', name: 'Property: 1', length: '9', bearing: 'S 73 12 11.56 E', label: 'N73 12 41.56W', diff: "3 00 0", sources: "warn", lengthcheck: "good", bearingcheck: "error", northorientation: "error"},
  ]},
  { parcel: [
    { dimension: 'line', desc: 'Lorem ipsum dolor sit amet, consec adipiscing elit. Nulla enim dolor, facilisis quis venenatis quis.', status: 'good', name: 'Property: 3', length: '8', bearing: 'S 58 12 21.56 E', label: 'N58 12 41.56W', diff: "1 00 0", sources: "good", lengthcheck: "good", bearingcheck: "good", northorientation: "good"},
    { dimension: 'line', desc: 'Lorem ipsum dolor sit amet, consec adipiscing elit.', status: 'good', name: 'Property: 3', length: '6', bearing: 'S 43 12 48.56 E', label: 'N43 12 41.56W', diff: "0 00 0", sources: "good", lengthcheck: "good", bearingcheck: "good", northorientation: "good"},
    { dimension: 'line', desc: 'Lorem ipsum dolor sit amet, consec adipiscing elit.', status: 'warn', name: 'Property: 3', length: '3', bearing: 'S 23 12 31.56 E', label: 'N23 12 41.56W', diff: "2 00 0", sources: "warn", lengthcheck: "warn", bearingcheck: "good", northorientation: "good"},
    { dimension: 'line', desc: 'Lorem ipsum dolor sit amet, consec adipiscing elit. Mauris tincidunt bibendum leo, sed fermentum tellus. In posuere mi mauris, nec tincidunt justo dapibus quis. Praesent dapibus, dolor nec tristique pharetra, magna elit viverra nunc, in faucibus mi odio sed ipsum.', status: 'error', name: 'Property: 3', length: '9', bearing: 'S 73 12 11.56 E', label: 'N73 12 41.56W', diff: "3 00 0", sources: "warn", lengthcheck: "good", bearingcheck: "error", northorientation: "error"},
  ]},
  { parcel: [
    { dimension: 'curve', desc: 'Lorem ipsum dolor sit amet, consec adipiscing elit. Mauris tincidunt bibendum leo, sed fermentum tellus. In posuere mi mauris, nec tincidunt justo dapibus quis. Praesent dapibus, dolor nec tristique pharetra, magna elit viverra nunc, in faucibus mi odio sed ipsum.', status: 'error', name: 'Property: 4', length: '9', bearing: 'S 73 12 11.56 E', label: 'N73 12 41.56W', diff: "3 00 0", sources: "warn", lengthcheck: "good", bearingcheck: "error", northorientation: "error"},
    { dimension: 'curve', desc: 'Lorem ipsum dolor sit amet, consec adipiscing elit.', status: 'good', name: 'Property: 4', length: '6', bearing: 'S 43 12 48.56 E', label: 'N43 12 41.56W', diff: "0 00 0", sources: "good", lengthcheck: "good", bearingcheck: "good", northorientation: "good"},
    { dimension: 'curve', desc: 'Lorem ipsum dolor sit amet, consec adipiscing elit. Nulla enim dolor, facilisis quis venenatis quis.', status: 'good', name: 'Property: 4', length: '8', bearing: 'S 58 12 21.56 E', label: 'N58 12 41.56W', diff: "1 00 0", sources: "good", lengthcheck: "good", bearingcheck: "good", northorientation: "good"},
    { dimension: 'curve', desc: 'Lorem ipsum dolor sit amet, consec adipiscing elit.', status: 'warn', name: 'Property: 4', length: '3', bearing: 'S 23 12 31.56 E', label: 'N23 12 41.56W', diff: "2 00 0", sources: "warn", lengthcheck: "warn", bearingcheck: "good", northorientation: "good"},
  ]},
  { parcel: [
    { dimension: 'curve', desc: 'Lorem ipsum dolor sit amet, consec adipiscing elit.', status: 'warn', name: 'Property: 2', length: '3', bearing: 'S 23 12 31.56 E', label: 'N23 12 41.56W', diff: "2 00 0", sources: "warn", lengthcheck: "warn", bearingcheck: "good", northorientation: "good"},
    { dimension: 'curve', desc: 'Lorem ipsum dolor sit amet, consec adipiscing elit.', status: 'good', name: 'Property: 2', length: '6', bearing: 'S 43 12 48.56 E', label: 'N43 12 41.56W', diff: "0 00 0", sources: "good", lengthcheck: "good", bearingcheck: "good", northorientation: "good"},
    { dimension: 'curve', desc: 'Lorem ipsum dolor sit amet, consec adipiscing elit. Nulla enim dolor, facilisis quis venenatis quis.', status: 'good', name: 'Property: 2', length: '8', bearing: 'S 58 12 21.56 E', label: 'N58 12 41.56W', diff: "1 00 0", sources: "good", lengthcheck: "good", bearingcheck: "good", northorientation: "good"},
    { dimension: 'curve', desc: 'Lorem ipsum dolor sit amet, consec adipiscing elit. Mauris tincidunt bibendum leo, sed fermentum tellus. In posuere mi mauris, nec tincidunt justo dapibus quis. Praesent dapibus, dolor nec tristique pharetra, magna elit viverra nunc, in faucibus mi odio sed ipsum.', status: 'error', name: 'Property: 2', length: '9', bearing: 'S 73 12 11.56 E', label: 'N73 12 41.56W', diff: "3 00 0", sources: "warn", lengthcheck: "good", bearingcheck: "error", northorientation: "error"},
    ]},
]


const Container = () => {
  const classes = useStyles();
  const [submit, setSubmit] = useState(false);
  const [open, setOpen] = useState(false)
  const [data, setData] = useState(null)
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
  const [selected, setSelected] = useState([])
  const [didMount, setDidMount] = useState(false)

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
          })

          designAutomationConnect.on("objKeysInputFile", (objectKeys) => {
            console.log('objKeysInputFile:', objectKeys)
            // setObjectKeys(objectKeys)
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
          });
      }).catch(e => console.log('Connection failed: ', e));

    }
  }, [modelDerivativeConnect]);


  useEffect(() => {
    if (didMount) {
      console.log('Url:', designAutomationUrl)
      connection.getTableInfo(designAutomationUrl).then(
          response => {
              console.log('Response', response)

              const keys = Object.keys(response)
              const values = keys.map((key) => {
                  return(response[key])
              })
              const tableData = Object.entries(Object.entries(Object.entries(values[1])));

              setTableInfo(tableData)
              setParcelInfo(response)
              setLoadingTable(false)
          },
          error => {
            console.log('Error:', error)        }
      )
    }  
  }, [designAutomationUrl]);

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
    console.log('Close Dialog')
  }

  const handleLoading = (isLoading) => {
    setSubmit(isLoading)
  }

  return (
    <div className={classes.root}>
      <div className={classes.drawerCont}>
        <div style={{position:'relative', width: 'calc(82px + .5rem)'}}>
          <NavMenu />
        </div>
        <Drawer loading={loading} data={parcelInfo} setSelected={setSelected} selected={selected}/>
      </div>
      <div className={classes.mapView}>
        <AppBar handleClickOpen={handleClickOpen} />
        <DialogUploadFile open={open} onClose={onDialogClose} connectionId={designAutomationId} isLoading={handleLoading} setSubmit={setSubmit}/>
        <div className={classes.mapCont}>
        {submit ?  
          <div>
            <div {...mapContProps}>
              <div {...defaultAltProps}>
                <EsriMap loading={loadingEsri} />
              </div>
              <div {...dividerProps}></div>
              <div {...defaultProps}>
                <ForgeMap loading={loadingForge} objectKeys={objectKeys} connectionId={modelDerivativeId}/>
              </div>
            </div>
            <SurveyTable loading={loadingTable} data={tableInfo} selected={selected} setSelected={setSelected}/>

          </div>
          :
          <div>
            <div {...boxProps}>
              <div className={classes.flex} onClick={() => setOpen(true)}>
                  <img src={planImage} height='150px' width='150px'/>
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
