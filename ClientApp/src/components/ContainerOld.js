import React, { useState, useEffect, Fragment } from "react"
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import * as signalR from "@microsoft/signalr";
import DialogUploadFile from './DialogUploadFile'
import SurveyTable from './SurveyTable'
import EsriMap from './EsriMap'
import ForgeMap from './ForgeMap'
import NavMenu from './NavMenu'
import planImage from "../assets/plan_drawing.svg"
import iconLegal from "../assets/icon_legal.svg"
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
  flex: {
    height: '40rem',
    width: '60rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
}
}));

const columnProps = {
  bgcolor: '#576EEF',
  borderColor: 'text.primary',
  m: 1,
  border: 1,
  style: { width: '5rem', height: '40rem' },
};

const tabProps = {
  display: 'flex',
  bgcolor: '#3E52BB',
  borderColor: 'text.primary',
  m: 1,
  border: 1,
  style: { width: '4rem', height: '4rem' },
  justifyContent: 'center',
};

const boxProps = {
  bgcolor: 'grey.100',
  m: 1,
  style: { width: '60rem', height: '40rem' },
};

const defaultProps = {
  bgcolor: 'background.paper',
  borderColor: 'text.primary',
  m: 1,
  border: 1,
  style: { width: '35rem', height: '35rem' },
};


const Container = () => {
  const classes = useStyles();

  const [open, setOpen] = useState(false)
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

  const message = ''

  useEffect(() => {
    let designAutomation = new signalR.HubConnectionBuilder().withUrl("/api/signalr/designautomation").withAutomaticReconnect().build();
    setDesignAutomationConnect(designAutomation)

    designAutomation.start().then(() => {
        designAutomation.invoke('getConnectionId').then((id) => {
            console.log("getConnectionId result: " , id)
            setDesignAutomationId(id)
        })

    });

    let modelDerivative = new signalR.HubConnectionBuilder().withUrl("/api/signalr/modelderivative").withAutomaticReconnect().build();
    setModelDerivativeConnect(modelDerivative)

    modelDerivative.start().then(() => {
        modelDerivative.invoke('getConnectionId').then((id) => {
            console.log("getConnectionId result: " , id)
            setModelDerivativeId(id)
        })

    });
  }, [])

  useEffect(() => {
    if (designAutomationConnect) {
      designAutomationConnect.on("downloadResult", (url) => {
        console.log('downloadResult:', url)
        setDesignAutomationUrl(url)
        setLoadingTable(false)
      });

      designAutomationConnect.on("onComplete", (message) => {
        console.log('onComplete:', message)
      });

      designAutomationConnect.on("objKeysInputFile", (objectKeys) => {
        console.log('objKeysInputFile:', objectKeys)
        setObjectKeys(objectKeys)
      });
    }
  }, [designAutomationConnect]);

  useEffect(() => {
    if (modelDerivativeConnect) {
      modelDerivativeConnect.on("extractionFinished", (extractionFinished) => {
        console.log('extractionFinished:', extractionFinished)
      });
    }
  }, [modelDerivativeConnect]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const onDialogClose = () => {
    setOpen(false)
  }

  const handleLoading = (isLoading) => {
    setLoading(isLoading)
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <section className={classes.rightToolbar}>
            <Button variant="outlined" className={classes.button} onClick={handleClickOpen}>UPLOAD</Button>
          </section>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        anchor="left"
      >
        <NavMenu />
      </Drawer>
      <div className={classes.content}>
        <DialogUploadFile open={open} onClose={onDialogClose} connectionId={designAutomationId} isLoading={handleLoading}/>
        {loading ?  
          <div>
            <Box display="flex" justifyContent="center">
              <Box borderRadius="borderRadius" {...defaultProps}>
                <EsriMap loading={loading}/>
              </Box>
              <Box borderRadius="borderRadius" {...defaultProps}>
                <ForgeMap loading={loading} objectKeys={objectKeys} connectionId={modelDerivativeId}/>
              </Box>
            </Box>
            <SurveyTable loading={loading} designAutomationUrl={designAutomationUrl}/>
          </div>
          :
          <div>
            <Box {...boxProps}>
              <div className={classes.flex}>
                  <img src={planImage} height='80px' width='80px'/>
              </div>
            </Box>
          </div>
        }
      </div>
    </div> 
    ) 
}

export default Container
