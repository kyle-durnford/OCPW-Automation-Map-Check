import React, {useState, useEffect, Fragment} from 'react';
import { CircularProgress } from '@material-ui/core'; 
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    circularProgress: {
      padding: '9em 0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
}));

const parcelSelectedProps = {
    style: {
        backgroundColor: '#fff',
        borderRadius: '1rem',
        border: '2px solid #a0acf0',
        boxShadow: '0px 0px 10px 0px #7f90f330',
        margin: '.5rem 0'
    }
};

const parcelProps = {
    style: {
        backgroundColor: '#fff',
        borderRadius: '1rem',
        border: '2px solid #fff',
        boxShadow: '0px 0px 10px 0px #7f90f330',
        margin: '.5rem 0'
    }
};

const parcelTopProps = {
    style: {
        padding: '1rem 1rem .5rem 1rem',
        fontSize: '1.25rem',
        display: 'flex',
        justifyContent: 'space-between',
        cursor: 'pointer'
    }
};

const parcelButtonProps = {
    style: {
        cursor: 'pointer'
    }
}

const parcelInfoProps = {
    style: {
        listStyle: 'none',
        fontSize: '1rem',
        fontWeight: '400',
        padding: '.5rem',
        cursor: 'pointer',
        width: '100%',
        borderRadius: '.5rem',
        transition: 'background .2s ease',
    }
}

const parcelInfoSelectedProps = {
    style: {
        listStyle: 'none',
        fontSize: '1rem',
        fontWeight: '400',
        padding: '.5rem',
        cursor: 'pointer',
        width: '100%',
        borderRadius: '.5rem',
        transition: 'background .2s ease',
        background: '#a0acf0'
    }
}

const parcelInfoContProps = {
    style: {
        padding: '0 .5rem .5rem .5rem'
    }
}

const Parcel = ({loading, setSelected, selected, data, parcelNum, open, setOpen, opened}) => {

    const classes = useStyles();

    const [active, setActive] = useState();


    const handleSelect = (i) => {
        const compare = [parcelNum, i];
        if (selected.every((e, i) => e === compare[i]) === true && active === i) {
            setOpen(null)
            setActive(null);
            setSelected([]);
        } else {
            setOpen(null)
            setActive(null);
            setActive(i);
            setSelected([parcelNum, i]);
        }
    }

    const handleClick = (e) => {
        if (opened !== true) {
            setActive(null);
            setOpen(null);
            setSelected([parcelNum, null]);
        } else {
            setOpen(null);
            setActive(null);
            setSelected([]);
        }
    };

    useEffect(() => {
        setActive(null)
        setOpen(null)
        setActive(selected[1])
    }, [selected])
    
    if (loading || !data) 
        return (
            <Fragment>
                <span className={classes.circularProgress}>
                    <CircularProgress size={48} />
                </span>
            </Fragment>
        )

       
    const parcelInfo = Object.entries(data[0]['Segments']).map((e, i) => {
        if (i === active) {
            return <li className={`parcelInfo`} onClick={() => handleSelect(i)} {...parcelInfoSelectedProps} key={i}> {Object.entries(data[0]['Segments'])[i][1].desc_grid}</li>
        } else {
            return <li className={`parcelInfo`} onClick={() => handleSelect(i)} {...parcelInfoProps} key={i}> {Object.entries(data[0]['Segments'])[i][1].desc_grid}</li>
        }
    
    }); 

    return (
        <div key={parcelNum} {...(opened === true) ? {...parcelSelectedProps} : {...parcelProps}}>
            <div {...parcelTopProps} onClick={e => handleClick(e)}>
                <div>Parcel {parcelNum + 1}</div>
                <div></div>
                <div {...parcelButtonProps}>{opened ? '-' : '+'}</div>
            </div>
            <div {...parcelInfoContProps}>{opened ? parcelInfo : null}</div>
           
        </div>
    )
}

export default Parcel