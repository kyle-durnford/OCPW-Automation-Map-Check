import React, { useState } from "react"
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core';
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

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
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
        padding: '1rem 0 0 1rem'
    }
}

const inputContProps = {
    style: {
        margin: 'calc(2rem - 8px) 0'
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
        margin: ' calc(2rem - 8px) 8px 0',
        width: '100%'

    }
};

const DialogUploadFile = ({open, onClose, connectionId, isLoading, setSubmit}) => {
  const classes = useStyles();  
  const [submitAttempted, setSubmitAttempted] = useState()
  const [files, setFiles] = useState([])
  const [mapType, setMapType] = useState('')

  const { handleSubmit, control, getValues } = useForm();

  const onSubmit = data => {
    const formData = new FormData()
    formData.append('inputFile', data.files);
    formData.append('data', JSON.stringify({
        mapType: data.mapType,
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
  };

  return (
    <div>
        <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
            <div {...dialogTitleProps} id="form-dialog-title">Submit Map</div>
            <DialogContent className={`scroll`} style={{padding: '0 1rem', border: '2rem 1rem solid transparent'}}>
                <form className={classes.root} onSubmit={handleSubmit(onSubmit)}>
                    <Controller
                        render={({ field: { onChange } }) => (
                            <Dropzone onChange={(e, index) => {
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
                                <FormControl style={{marginTop: '2rem'}} fullWidth>
                                    <label htmlFor="mapType">Map Type</label>
                                    <select
                                        className={classes.select}
                                        value={value}
                                        name="mapType"
                                        onChange={(e) => {
                                            onChange(e.target.value)
                                            setMapType(e.target.value)
                                        }}
                                    >
                                        <option value="" disabled hidden>Select...</option>
                                        <option value={'TractMap'}>Tract Map</option>
                                        <option value={'RecordOfSurvey'}>Record of Survey</option>
                                    </select>
                                </FormControl>
                            )}
                            rules={{ required: 'Map Type required' }}
                        />
                    }    
                    {mapType &&
                    <div {...inputContProps}>
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
                            fullWidth
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
                        <Button {...buttonSolidProps} type="submit" variant="contained" color="primary">
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
