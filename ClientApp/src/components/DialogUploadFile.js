import React, { useState, useEffect } from "react"
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useForm, Controller } from 'react-hook-form';
import Dropzone from './Dropzone'
import BuildTables from './SurveyTable'
import connection from '../services/connection'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(2),

    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '300px',
    },
    '& .MuiButtonBase-root': {
      margin: theme.spacing(2),
    },
  },
}));

const DialogUploadFile = ({open, onClose, connectionId, isLoading}) => {
  const classes = useStyles();  
  const [submitAttempted, setSubmitAttempted] = useState()
  const [files, setFiles] = useState([])
  const [mapType, setMapType] = useState('')

  const { handleSubmit, control, getValues } = useForm();

  const onSubmit = data => {
    console.log('Data:', data, connectionId)
    const formData = new FormData()
    formData.append('inputFile', data.files);
    formData.append('data', JSON.stringify({
        mapType: data.mapType,
        activityName: 'AMCActivity_dev',
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
  };

  return (
    <div>
        <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Submit Map</DialogTitle>
            <DialogContent>
                <form className={classes.root} onSubmit={handleSubmit(onSubmit)}>
                    <Controller
                        render={({ field: { onChange } }) => (
                            <Dropzone onChange={(e) => {
                                    onChange(e.target.files[0])
                                    setFiles([e.target.files[0]])
                                }} 
                            />
                        )}
                        name="files"
                        control={control}
                        defaultValue=""
                        rules={{ required: 'File is required' }}
                    />
                    {files.length > 0 &&
                        <Controller
                            name="mapType"
                            control={control}
                            defaultValue=""
                            render={({ field: { onChange, value }, fieldState: { error } }) => (
                                <FormControl fullWidth>
                                    <InputLabel>Map Type</InputLabel>
                                    <Select
                                        value={value}
                                        label="mapType"
                                        onChange={(e) => {
                                            onChange(e.target.value)
                                            setMapType(e.target.value)
                                        }}
                                    >
                                        <MenuItem value={'TractMap'}>Tract Map</MenuItem>
                                        <MenuItem value={'RecordOfSurvey'}>Record of Survey</MenuItem>
                                    </Select>
                                </FormControl>
                            )}
                            rules={{ required: 'Map Type required' }}
                        />
                    }    
                    {mapType &&
                    <div>
                    <Controller
                        name="parcelNumber"
                        control={control}
                        defaultValue=""
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <TextField
                            label="Number of Parcels"
                            variant="filled"
                            value={value}
                            onChange={onChange}
                            error={!!error}
                            helperText={error ? error.message : null}
                        />
                        )}
                        rules={{ required: 'Number of parcels required' }}
                    />
                    <Controller
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
                    />
                    <div>
                        <Button variant="contained" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button type="submit" variant="contained" color="primary">
                            Start Work Item
                        </Button>
                    </div>
                    </div>
                    }
                </form>
            </DialogContent>
        </Dialog>
    </div>
  );
}

export default DialogUploadFile
