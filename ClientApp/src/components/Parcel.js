import React, {useState, useEffect, Fragment, useCallback} from 'react';
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
        background: '#a0acf0',
        margin: '.5rem 0'
    }
}

const parcelErrorIconProps = {
    style: {
        fontSize: '.65rem',
        backgroundColor: '#f55d6e',
        marginLeft: '1rem',
        color: '#fff',
        padding: '.35rem',
        borderRadius: '100%',
        width: '24px',
        height: '24px',
        display: 'inline-block',
        lineHeight: '1.2',
        textAlign: 'center',
        verticalAlign: 'middle'
    }
}

const parcelErrorProps = {
    style: {
        listStyle: 'none',
        fontSize: '1rem',
        fontWeight: '400',
        padding: '.5rem',
        cursor: 'pointer',
        width: '100%',
        borderRadius: '.5rem',
        transition: 'background .2s ease',
        background: '#f55d6e50',
        margin: '.5rem 0'
    }
}

const parcelInfoContProps = {
    style: {
        padding: '0 .5rem .5rem .5rem'
    }
}

const Parcel = ({loading, setSelected, selected, data, parcelNum, open, setOpen, page}) => {

    const classes = useStyles();
    const [row, setRow] = useState(null);
    const [opened, setOpened] = useState(false)


    const handleSelect = (e) => {
        if (selected === e) {
            setSelected();
        } else {
            setSelected(e);
        }
    }

    const handleClick = () => {
        if (opened === true) {
            setOpen(null)
            setSelected()
            setOpened(false)
        } else {
            setOpen(parcelNum)
            setOpened(true)
            setSelected()
        }
    };

    useEffect(() => {
       if(Object.values(data[0]['Segments']).find(({oid}) => oid === selected) || (open === parcelNum && !selected)) {
        setOpened(true)
       } else {
        setOpened(false)
       }
    }, [selected, open])

    //Get the selected row when it renders
  const itemEl = useCallback(
    node => {
      if (node !== null) {
        setRow(node)
      }
    },
    [],
  )

  //Scroll to the selected row in the table
  if (row !== null) {
    row.scrollIntoView({
      scrollMode: 'if-needed',
      behavior: "smooth",
      block: 'center'
    })
  }
      
    if (loading || !data) 
        return (
            <Fragment>
                <span className={classes.circularProgress}>
                    <CircularProgress size={48} />
                </span>
            </Fragment>
        )

    const parcelErrors = Object.entries(data[0]['Segments']).map((e, i) => {
        let parcelErrorCount = 0;
         Object.values(e[1].Labels_Check).map((el, il) => {
            if(Object.values(el).includes('Fail')) {
                parcelErrorCount++
            }
        })
        return parcelErrorCount
    });
       
    const parcelInfo = Object.entries(data[0]['Segments']).map((e, i) => {
        if (selected === e[1]['oid']) {
            return <li ref={itemEl} className={`parcelInfo`} onClick={() => handleSelect(e[1]['oid'])} {...parcelInfoSelectedProps} key={i}> {Object.entries(data[0]['Segments'])[i][1].desc_grid}</li>
        } else {
            return <li className={`parcelInfo`} onClick={() => handleSelect(e[1]['oid'])} {...(Object.values(Object.values(e[1].Labels_Check)[0]).includes('Fail') || Object.values(Object.values(e[1].Labels_Check)[1]).includes('Fail') ? {...parcelErrorProps} : {...parcelInfoProps})} key={i}> {Object.entries(data[0]['Segments'])[i][1].desc_grid}</li>
        }
    }); 

    return (
        <div key={parcelNum} {...(opened === true) ? {...parcelSelectedProps} : {...parcelProps}}>
            <div {...parcelTopProps} onClick={e => handleClick()}>
                <div> 
                    {{
                    'legal': <p>Parcel {parcelNum + 1}{(parcelErrors.filter(e => e > 0).length > 0 ? <span {...parcelErrorIconProps}>{parcelErrors.filter(e => e > 0).length}</span>: null)}</p>,
                    'monument': <p>Point {parcelNum + 1}</p>,
                    'reference': <p>Reference {parcelNum + 1}</p>,
                    }[page]}
                </div>
                <div></div>
                <div {...parcelButtonProps}>{opened ? '-' : '+'}</div>
            </div>
            <div {...parcelInfoContProps}>{opened ? parcelInfo : null}</div>
           
        </div>
    )
}

export default Parcel