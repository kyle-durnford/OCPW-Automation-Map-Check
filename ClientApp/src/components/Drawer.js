import React, {useState, useEffect} from 'react';
import Parcel from './Parcel.js'
import ProjectDrawer from './ProjectDrawer.js';
import ReportDrawer from './ReportDrawer.js';
import CheckDrawer from './CheckDrawer.js'

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

const Drawer = ({loading, data, setSelected, selected, page, setSection, section, hideDrawer}) => {

    const [open, setOpen] = useState(null);
    const [drawerData, setDrawerData] = useState();
    const [parcelCount, setParcelCount] = useState();
    const [segmentCount, setSegmentCount] = useState([0,0])
    const [parcelData, setParcelData] = useState()

    //if no data is loaded, return null

    useEffect(() => {
        if (data !== null) {

            const keys = Object.keys(data)
            const values = keys.map((key) => {
                return(data[key])
            })

            setParcelData(Object.entries(Object.entries(Object.entries(values[1]))))
        }
    }, [data])

    useEffect(() => {
        if (parcelData) {
            setParcelCount(parcelData.length)
            let lines = 0
            let curves = 0
            parcelData.map((e, i) => {
            Object.entries(parcelData[i][1][1][1][0]['Segments']).map((row, l) => {
                if (row.find(({ shapeType }) => shapeType === 'Line')) {
                    lines++
                } else if (row.find(({ shapeType }) => shapeType === 'Curve')) {
                    curves++
                }
            })
            setSegmentCount([lines, curves])
            })
        }
    }, [parcelData])

    useEffect(() => {
        if (parcelData !== null) {
   
            if (page === 'report') {
                setDrawerData(() => { return (<ReportDrawer data={parcelData}/>)})
            } else if (page === 'legal' || page === 'monument' || page === 'reference') {
                const parcels = parcelData.map((e, i) => {
                    console.log(open, selected)
                    return <Parcel loading={loading} page={page} data={parcelData[i][1][1][1]} setSelected={setSelected} selected={selected} key={i} parcelNum={i} page={page} open={open} setOpen={setOpen} /> 
                })
                setDrawerData(parcels)
            } else if (page === 'project') {
                setDrawerData(() => {return (<ProjectDrawer lines={segmentCount[0]} curves={segmentCount[1]} parcelCount={parcelCount}/>)})
            } else if (page === 'check') {
                setDrawerData(() => {return (<CheckDrawer setSection={setSection} section={section}/>)})
            }
        }
    }, [page, selected, segmentCount, section, open])
   

        if (data !== null && hideDrawer === false) {
        return (
            <div {...drawerProps} className={`scroll`}>
                <div style={{paddingBottom: '1rem'}}> 
                {//https://stackoverflow.com/questions/46592833/how-to-use-switch-statement-inside-a-react-component
                    {
                    'project': <p>Project Summary</p>,
                    'legal': <p>Parcel Closure Report</p>,
                    'monument': <p>Monuments Description</p>,
                    'reference': <p>Reference Description</p>,
                    'check': <p>Check List - RoS</p>,
                    'report': <p>Generate Report</p>
                    }[page]}
                </div>
                {drawerData}
            </div>
        )
    } else return null;
}

export default Drawer