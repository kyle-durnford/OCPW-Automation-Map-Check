import React, {useState, useEffect, useCallback} from 'react'
import good from '../assets/check.svg'
import error from '../assets/error.svg'

const checklistCategory = {
    style: {
        fontWeight: '600',
        fontSize: '1.5rem',
        paddingBottom: '3rem'
    }
}

const categoryTitle = {
    style: {
        paddingBottom: '1rem'
    }
}

const checklistCont = {
    style: {
        padding: '3rem',
        fontFamily: 'poppins, sans-serif',

    }
}

const checklistCheckbox = {
    style: {
        fontWeight: '400',
        display: 'flex',
        fontSize: '1rem',
        padding: '.5rem 0',
        width: '80ch',
        alignItems: 'center'

    }
}

const checklistCheckboxCont = {
    style: {
        fontWeight: '400',
        display: 'flex',
        fontSize: '1rem',
        padding: '.5rem 0',
        width: '80ch',
        alignItems: 'center',
        flexDirection: 'column'
    }
}

const checklistCheckboxSub = {
    style: {
        fontWeight: '400',
        display: 'flex',
        fontSize: '1rem',
        padding: '.5rem 0 .5rem 2rem',
        width: '80ch',
        alignItems: 'center'
    }
}


const iconStyle = {
    style: {
        height: '24px',
        width: '24px',
        marginRight: '.5rem'
    }
}


const Checklist = ({data, section, setSection}) => {

    const [legalDesc, setLegalDesc] = useState(false);
    const [row, setRow] = useState(null)

    
    const categories = [
        [
            'The following must appear at the top of all sheets',
            [['Map Number', true], ['Date of Survey', true], ["Surveyor’s/Engineer's name and license number (Firm name may be shown)", false], ['Sheet 20 of 20', false]]
        ],
        [
            'The following must appear on the title sheets',
            [['Legal description near the top center, to include the words:', legalDesc, [['In the Unincorporated Territory of the County of Orange, State of California', legalDesc], ['"In the County of Orange, State of California"', legalDesc]]], ['Surveyor’s/ Engineer’s Statement (must be signed and sealed)', true], ['County Surveyor’s Statement', false], ['Clerk - Recorder’s Certificate (Top right corner only – Recorder requirement)', true], ['Statement of Purpose', true]]
        ],
        [
            'The following must appear on all map sheets', 
            [['Map must be legible – including size of fonts/letters (minimum text size is 0.08’’)', true]]
        ]
    ]

    const itemEl = useCallback(
        node => {
            if (node !== null) {
                setRow(node)
            }
        }, [],
    )

    //Scroll to the selected section
    if (row !== null) {
        row.scrollIntoView({
        scrollMode: 'if-needed',
        behavior: "smooth",
        block: 'center'
        })
    }

    // useEffect(() => {
    //     const catOneKey = data.Map_checkResults[1]['Layout1-Boundary Map Sht (Landscape)'][0]['title_sheets']
    //     //const legalDescCheck = catOneKey['legal_description_near_top_center']
    //     const legalDescMatchCheck = catOneKey['legal_description_near_top_center'][0]['match_word']
    //     console.log(legalDescMatchCheck)

    //     if (legalDescMatchCheck.toLowerCase().includes('county of orange') && legalDescMatchCheck.toLowerCase().includes('state of california')) {
    //         setLegalDesc(true)
    //     }

    // }, [data])
    
    if (data) {
        return (
            <div {...checklistCont}>
                <div>
                    {categories.map((e, i) => {
                        if (i === section) {
                            return(
                                <div {...checklistCategory} ref={itemEl}>
                                    <p {...categoryTitle}>{e[0]}</p>
                                    {e[1].map((el, il) => {
                                        if(!el[2]) {
                                            return (
                                                <li key={i + '-' + il} {...checklistCheckbox}>
                                                    {{
                                                        true: <><img src={good} alt="Pass" {...iconStyle}></img><p>{el[0]}</p></>,
                                                        false: <><img src={error} alt="Fail" {...iconStyle}></img><p>{el[0]}</p></>,
                                                    }[el[1]]}
                                                </li>
                                            )
                                        } else {
                                            return (
                                                <li key={i + '-' + il} {...checklistCheckboxCont}>
                                                    <div {...checklistCheckbox}>
                                                        {{
                                                            true: <><img src={good} alt="Pass" {...iconStyle}></img><p>{el[0]}</p></>,
                                                            false: <><img src={error} alt="Fail" {...iconStyle}></img><p>{el[0]}</p></>,
                                                        }[el[1]]}
                                                    </div>
                                                    <ul>
                                                        {el[2].map((ell, ill) => {
                                                            return (
                                                                <li key={i + '-' + il + '-' + ill} {...checklistCheckboxSub}>
                                                                    {{
                                                                        true: <><img src={good} alt="Pass" {...iconStyle}></img><p>{ell[0]}</p></>,
                                                                        false: <><img src={error} alt="Fail" {...iconStyle}></img><p>{ell[0]}</p></>,
                                                                    }[ell[1]]}
                                                                </li>
                                                            )
                                                        })}
                                                    </ul>
                                                </li>
                                            )
                                        } 
                                    })} 
                                </div>
                            )
                        } else {
                            return(
                                <div {...checklistCategory}>
                                    <p {...categoryTitle}>{e[0]}</p>
                                    {e[1].map((el, il) => {
                                        if(!el[2]) {
                                            return (
                                                <li key={i + '-' + il} {...checklistCheckbox}>
                                                    {{
                                                        true: <><img src={good} alt="Pass" {...iconStyle}></img><p>{el[0]}</p></>,
                                                        false: <><img src={error} alt="Fail" {...iconStyle}></img><p>{el[0]}</p></>,
                                                    }[el[1]]}
                                                </li>
                                            )
                                        } else {
                                            return (
                                                <li key={i + '-' + il} {...checklistCheckboxCont}>
                                                    <div {...checklistCheckbox}>
                                                        {{
                                                            true: <><img src={good} alt="Pass" {...iconStyle}></img><p>{el[0]}</p></>,
                                                            false: <><img src={error} alt="Fail" {...iconStyle}></img><p>{el[0]}</p></>,
                                                        }[el[1]]}
                                                    </div>
                                                    <ul>
                                                        {el[2].map((ell, ill) => {
                                                            return (
                                                                <li key={i + '-' + il + '-' + ill} {...checklistCheckboxSub}>
                                                                    {{
                                                                        true: <><img src={good} alt="Pass" {...iconStyle}></img><p>{ell[0]}</p></>,
                                                                        false: <><img src={error} alt="Fail" {...iconStyle}></img><p>{ell[0]}</p></>,
                                                                    }[ell[1]]}
                                                                </li>
                                                            )
                                                        })}
                                                    </ul>
                                                </li>
                                            )
                                        } 
                                    })} 
                                </div>
                            )
                        }
                        
                    })}
                </div>
            </div>
        )
    } else return null

   
}

export default Checklist