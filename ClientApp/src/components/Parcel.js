import React, {useState, useEffect, useCallback} from 'react';
import { CircularProgress } from '@material-ui/core'; 

const Parcel = ({loading, setSelected, selected, data, parcelNum, open, setOpen, page}) => {
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

  //Scroll to the selected segment
  if (row !== null) {
    setTimeout(() => {
      row.scrollIntoView({
        scrollMode: 'if-needed',
        behavior: "smooth",
        block: 'center'
      })
    }, 100)
  }
      
    if (loading || !data) 
        return (
            <span className='spinner'>
                <CircularProgress size={48} />
            </span>
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

    const parcelMissing = Object.entries(data[0]['Segments']).map((e, i) => {
        let parcelMissingCount = 0;
        
        Object.values(e[1].Labels_Check).map((el, il) => {
            if(el == 'None') {
                parcelMissingCount++
            }
        })

        return parcelMissingCount
    });
       
    const parcelInfo = Object.entries(data[0]['Segments']).map((e, i) => {
        if (selected === e[1]['oid'] && (!Object.values(Object.values(e[1].Labels_Check)[0]).includes('Fail') && !Object.values(Object.values(e[1].Labels_Check)).includes('None')) && (!Object.values(Object.values(e[1].Labels_Check)[1]).includes('Fail') && !Object.values(Object.values(e[1].Labels_Check)).includes('None'))) {
            return <li ref={itemEl} onClick={() => handleSelect(e[1]['oid'])} className="parcel__data parcel__data--selected" key={i}> {Object.entries(data[0]['Segments'])[i][1].desc_grid}</li>
        } else if ((selected === e[1]['oid'] && Object.values(Object.values(e[1].Labels_Check)[0]).includes('Fail')) || (selected === e[1]['oid'] && Object.values(Object.values(e[1].Labels_Check)[1]).includes('Fail'))) {
            return <li ref={itemEl} onClick={() => handleSelect(e[1]['oid'])} className='parcel__data parcel__data--selected parcel__data--selected--error' key={i}> {Object.entries(data[0]['Segments'])[i][1].desc_grid}</li>
        } else if (Object.values(Object.values(e[1].Labels_Check)[0]).includes('Fail') || Object.values(Object.values(e[1].Labels_Check)[1]).includes('Fail')){
            return <li onClick={() => handleSelect(e[1]['oid'])} className='parcel__data parcel__data--error' key={i}> {Object.entries(data[0]['Segments'])[i][1].desc_grid}</li>
        } else if ((selected === e[1]['oid'] && Object.values(Object.values(e[1].Labels_Check)).includes('None')) || (selected === e[1]['oid'] && Object.values(Object.values(e[1].Labels_Check)).includes('None'))) {
                return <li ref={itemEl} onClick={() => handleSelect(e[1]['oid'])} className='parcel__data parcel__data--selected parcel__data--selected--warning' key={i}> {Object.entries(data[0]['Segments'])[i][1].desc_grid}</li>
        } else if (Object.values(Object.values(e[1].Labels_Check)).includes('None') || Object.values(Object.values(e[1].Labels_Check)).includes('None')) {
            return <li onClick={() => handleSelect(e[1]['oid'])} className='parcel__data parcel__data--warning' key={i}> {Object.entries(data[0]['Segments'])[i][1].desc_grid}</li>
        } else {
            return <li onClick={() => handleSelect(e[1]['oid'])} className='parcel__data parcel__data--success' key={i}> {Object.entries(data[0]['Segments'])[i][1].desc_grid}</li>
        }
    }); 

    return (
        <div key={parcelNum} className={(opened === true) ? "parcel parcel--selected" : "parcel"}>
            <div className="parcel__top" onClick={e => handleClick()}>
                <div> 
                    {{
                    'legal': <p>Parcel {parcelNum + 1}{(parcelErrors.filter(e => e > 0).length > 0 ? <span className="error-icon error-icon--error">{parcelErrors.filter(e => e > 0).length}</span>: null)}{(parcelMissing.filter(e => e > 0).length > 0 ? <span className="error-icon error-icon--warning">{parcelMissing.filter(e => e > 0).length}</span>: null)}</p>,
                    'monument': <p>Point {parcelNum + 1}</p>,
                    'reference': <p>Reference {parcelNum + 1}</p>,
                    }[page]}
                </div>
                <div></div>
                <div className="parcel__handle">{opened ? '-' : '+'}</div>
            </div>
            <div className="parcel__cont">{opened ? parcelInfo : null}</div>
           
        </div>
    )
}

export default Parcel