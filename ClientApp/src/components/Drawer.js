import React, {useState, useEffect} from 'react';
import Parcel from './Parcel.js'

const drawerProps = {
    style: {
        padding: '1rem .5rem 1rem 1rem',
        fontFamily: 'poppins',
        fontWeight: 600,
        fontSize: '1.5rem',
        margin: '.5rem 0',
        width: '20vw',
        maxHeight: 'calc(100vh - 1rem)',
        overflow: 'auto',
        borderRight: '.5rem solid #F4F5FC'
    }
};

const Drawer = ({data, setSelected, selected}) => {

    

    const [open, setOpen] = useState(null);

    useEffect(() => {
        setOpen(null);
        setOpen(selected[0]);
    }, [selected])

    //if no data is loaded, return null
    if (data !== null) {
        const keys = Object.keys(data)
        const values = keys.map((key) => {
            return(data[key])
        })
        const parcelData = Object.entries(Object.entries(Object.entries(values[1])));
        console.log(parcelData);
        const parcels = parcelData.map((e, i) => { 
            return ((i === open || i === selected[0])  ? <Parcel data={parcelData[i][1][1][1]} setSelected={setSelected} selected={selected} key={i} parcelNum={i} setOpen={setOpen} opened={true} /> : <Parcel data={parcelData[i][1][1][1]} setSelected={setSelected} setOpen={setOpen} selected={selected} key={i} parcelNum={i} />)})
    
        return (
            <div {...drawerProps} className={`scroll`}>
                <div style={{paddingBottom: '1rem'}}>Parcel Closure Report</div>
                <div>
                    {parcels}
                </div>
            </div>
        )
    } else return null;
}

export default Drawer