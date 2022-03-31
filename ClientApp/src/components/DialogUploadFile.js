import React, { useState } from "react"
import Button from '@material-ui/core/Button';
import { createTheme, makeStyles, ThemeProvider } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useForm, Controller } from 'react-hook-form';
import Dropzone from './Dropzone'
import connection from '../services/connection'

const theme = createTheme({
    typography: {
        fontFamily: [
            'poppins',
            'sans-serif'
        ].join(',')
    }
})

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'poppins, sans-serif', 
    padding: theme.spacing(2),

    '& .MuiTextField-root': {
      margin: '.5rem 0',
      width: '100%',
    },
    '& .MuiButtonBase-root': {
      margin: theme.spacing(2),
    },
  },
  select: {
    padding: '1rem',
    fontSize: '1rem'
  }
}));

const dialogTitleProps = {
    style: {
        fontFamily: 'poppins, sans-serif',
        fontWeight: '600',
        fontSize: '1.5rem',
        padding: '1rem 0 0 2rem'
    }
}

const inputContProps = {
    style: {
        margin: 'calc(1rem - 8px) 0 1rem 0',
        width: '100%',
    }
} 

const buttonSolidProps = {
    style: {
        fontFamily: 'poppins, sans-serif',
        fontSize: '1rem',
        fontWeight: '600',
        color: '#fff',
        padding: '.25rem 1.5rem',
        background: '#fe805c',
        border: '2px solid #fe805c',
        borderRadius: '.5rem',
        cursor: 'pointer',
        textTransform: 'uppercase',
        transition: 'color .2s ease, background.2s ease',
        boxShadow: 'none',
        marginTop: '1.5rem',
        width: '100%'

    }
};

const DialogUploadFile = ({open, onClose, connectionId, isLoading, setSubmit, setEsriData, setTableInfo, setMapInfo, setParcelInfo, files, setFiles, setInputParcelCount, setInputMapType}) => {
    const classes = useStyles();  
    const { handleSubmit, control, reset } = useForm();

    const [parcels, setParcels] = useState()

  const onSubmit = data => {
    setEsriData(null)
    setTableInfo(null)
    setMapInfo(null)
    setParcelInfo(null)
    setInputParcelCount(null)
    setInputMapType(null)
    const formData = new FormData()
    formData.append('inputFile', data.files);
    formData.append('data', JSON.stringify({
        mapType: data.maptype,
        activityName: 'AMCActivity+dev',
        browerConnectionId: connectionId
    }));

    connection.startWorkItem(formData).then(
        response => {
            console.log('Work Started', response)
        },
        error => {
           console.log('Error:', error)        }
    )
    isLoading(true)
    onClose(false)
    setInputParcelCount(data.parcelNumber)
    setInputMapType(data.mapType)
    reset({parcelNumber: '', maptype: ''})
  };

  return (
    <ThemeProvider theme={theme}>
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth aria-labelledby="form-dialog-title">
            <div {...dialogTitleProps} id="form-dialog-title">Submit Map</div>
            <DialogContent className='scroll' style={{padding: '0 1rem', border: '2rem 1rem solid transparent'}}>
                <form className={classes.root} onSubmit={handleSubmit(onSubmit)}>
                    <Controller
                        control={control}
                        render={({ field: { onChange } , fieldState: { error }}) => (
                            <Dropzone onChange={(acceptedFiles) => {
                                    onChange(acceptedFiles[0])
                                    setFiles([acceptedFiles[0]])
                                }}
                                error={!!error}
                                helperText={error ? error.message : null}
                            />
                        )}
                        name="files"
                        control={control}
                        defaultValue=""
                        rules={{ required: 'File is required' }}
                    />
                        <Controller
                            name="maptype"
                            control={control}
                            defaultValue=""
                            render={({ field: { onChange, value }, fieldState: { error } }) => (
                                <FormControl style={{margin: '1rem 0 0 0'}} fullWidth>
                                    <TextField
                                        select
                                        value={value}
                                        label="Map Type"
                                        id="map"
                                        onChange={onChange}
                                        fullWidth
                                        error={!!error}
                                        helperText={error ? error.message : null}
                                        variant="outlined"
                                        onChange={(e) => {
                                            onChange(e.target.value)
                                        }}
                                    >
                                        <MenuItem value={'TractMap'} style={{fontFamily: 'poppins, sans-serif'}}>Tract Map</MenuItem>
                                        <MenuItem value={'RecordOfSurvey'} style={{fontFamily: 'poppins, sans-serif'}}>Record of Survey</MenuItem>
                                    </TextField>
                                    
                                </FormControl>
                            )}
                            rules={{ required: 'Map Type required' }}
                        />
                    <div {...inputContProps}>
                    <Controller
                        name="parcelNumber"
                        control={control}
                        defaultValue=""
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <TextField
                            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                            label="Number of Parcels"
                            variant="outlined"
                            type="number"
                            value={value}
                            onChange={e => {e.target.value < 0 ?
                                        onChange(e.target.value = 0) :
                                        onChange(e.target.value);
                                        setParcels(e.target.value)
                            }}
                            error={!!error}
                            helperText={error ? error.message : null}
                            fullWidth
                        />
                        )}
                        rules={{ required: 'Number of parcels required' }}
                    />
                    {parcels > 200 ? 
                        <div className="validation--warning">This file contains > 200 parcels. Please expect delayed response times.</div>
                    : null}
                    {/* <Controller
                        name="rsNumber"
                        control={control}
                        defaultValue=""
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <TextField
                            label="Issued RS Number"
                            variant="filled"
                            value={value}
                            onChange={onChange}
                            error={!!error}
                            helperText={error ? error.message : null}
                        />
                        )}
                    />
                    <Controller
                        name="legalDesc"
                        control={control}
                        defaultValue=""
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <TextField
                            label="Legal Description"
                            variant="filled"
                            value={value}
                            onChange={onChange}
                            error={!!error}
                            helperText={error ? error.message : null}
                        />
                        )}
                    />
                    <Controller
                        name="jurisdiction"
                        control={control}
                        defaultValue=""
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <TextField
                            label="Jurisdiction"
                            variant="filled"
                            value={value}
                            onChange={onChange}
                            error={!!error}
                            helperText={error ? error.message : null}
                        />
                        )}
                    />
                    <Controller
                        name="city"
                        control={control}
                        defaultValue=""
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <TextField
                            label="City"
                            variant="filled"
                            value={value}
                            onChange={onChange}
                            error={!!error}
                            helperText={error ? error.message : null}
                        />
                        )}
                    />
                    <Controller
                        name="surveyRecord"
                        control={control}
                        defaultValue=""
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <TextField
                            label="Survey Record"
                            variant="filled"
                            value={value}
                            onChange={onChange}
                            error={!!error}
                            helperText={error ? error.message : null}
                        />
                        )}
                    />
                    <Controller
                        name="surveyMapDetails"
                        control={control}
                        defaultValue=""
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <TextField
                            label="Survey Map Details"
                            variant="filled"
                            value={value}
                            onChange={onChange}
                            error={!!error}
                            helperText={error ? error.message : null}
                        />
                        )}
                    /> */}
                    <div> 
                        <button {...buttonSolidProps} type="submit">
                            Start Work Item
                        </button>
                    </div>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    </ThemeProvider>
  );
}

export default DialogUploadFile
