import React, {useState, useEffect} from 'react'; 

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

const Parcel = ({setSelected, selected, data, parcelNum, open, setOpen, opened}) => {

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
    

    const parcelInfo = data.parcel.map((e, i) => {
        if (i === active) {
            return <li className={`parcelInfo`} onClick={() => handleSelect(i)} {...parcelInfoSelectedProps} key={i}> {data.parcel[i].desc}</li>
        } else {
            return <li className={`parcelInfo`} onClick={() => handleSelect(i)} {...parcelInfoProps} key={i} > {data.parcel[i].desc}</li>
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