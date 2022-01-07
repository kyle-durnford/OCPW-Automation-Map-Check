import React, { useState, useEffect, useCallback, Fragment} from "react"
import { CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import good from '../assets/check.svg'
import error from '../assets/error.svg'
import Filter from '../assets/Filter.js'
import warn from '../assets/warning.svg'
import missing from '../assets/missing.svg'
import _ from "lodash";
import { number } from "prop-types";
import TriError from '../assets/TriError.js'

const lineColumns = [
  {
    id: 'parcelId',
    label: 'Parcel ID',
    align: 'left',
  },
  {
    id: 'length',
    label: 'Length',
    align: 'left',
  },
  {
    id: 'bearing_DMS',
    label: 'Bearing',
    align: 'left',
  },
  {
    id: 'Labels_Check.LineLength_Check.SegmentLength_Label',
    label: 'Label Length',
    align: 'left',
  },
  {
    id: 'Labels_Check.LineBearing_Check.Bearing_Label',
    label: 'Label Bearing',
    align: 'left',
  },
  {
    id: 'Labels_Check.LineLength_Check.Difference',
    label: 'Length Diff.',
    align: 'left',
  },
  {
    id: 'Labels_Check.LineBearing_Check.Difference',
    label: 'Bearing Diff.',
    align: 'left',
  },
  {
    id: 'Labels_Check.LineLength_Check.SigFig_Check',
    label: 'Length Sig Figs',
    align: 'center',
  },
  {
    id: 'Labels_Check.LineBearing_Check.SigFig_Check',
    label: 'Bearing Sig Figs',
    align: 'center',
  },
  {
    id: 'Labels_Check.LineLength_Check.SegmentLength_Check',
    label: 'Length Check',
    align: 'center',
  },

  {
    id: 'Labels_Check.LineBearing_Check.SegmentBearing_Check',
    label: 'Bearing Check',
    align: 'center',
  },
  {
    id: 'northorientation',
    label: 'North Orientation',
    align: 'center',
  },
];

const curveColumns = [
  {
    id: 'parcelId',
    label: 'Parcel ID',
    align: 'left',
  },
  {
    id: 'radtangent_start',
    label: 'Start Tangency',
    align: 'left',
  },
  {
    id: 'arcDelta_DD',
    label: 'Total Angle',
    align: 'left',
  },
  {
    id: 'arcRadius',
    label: 'Arc Radius',
    align: 'left',
  },
  {
    id: 'arcLength',
    label: 'Arc Length',
    align: 'left',
  },
  {
    id: 'radtangent_end',
    label: 'End Tangency',
    align: 'left',
  },
  {
    id: 'Labels_Check.Arc_StartPoint_Check.StartPoint_Label',
    label: 'Label Start Tangency',
    align: 'left',
  },
  {
    id: 'Labels_Check.ArcDelta_Check.CurveTotalAngle_Label',
    label: 'Label Total Angle',
    align: 'left',
  },
  {
    id: 'Labels_Check.ArcLength_Check.ArcLength_Label',
    label: 'Label Arc Length',
    align: 'left',
  },
  {
    id: 'Labels_Check.Arc_EndPoint_Check.EndPoint_Label',
    label: 'Label End Tangency',
    align: 'left',
  },
  {
    id: 'Labels_Check.Arc_StartPoint_Check.Difference',
    label: 'Difference Start Tangency',
    align: 'left',
  },
  {
    id: 'Labels_Check.ArcDelta_Check.Difference',
    label: 'Difference Total Angle',
    align: 'left',
  },
  {
    id: 'Labels_Check.ArcLength_Check.Difference',
    label: 'Difference Arc Length',
    align: 'left',
  },
  {
    id: 'Labels_Check.Arc_EndPoint_Check.Difference',
    label: 'Difference End Tangency',
    align: 'left',
  },
  {
    id: 'Labels_Check.Arc_StartPoint_Check.Arc_StartPoint_Check',
    label: 'Start Tangency Check',
    align: 'left',
  },
  {
    id: 'Labels_Check.ArcDelta_Check.CurveTotalAngle_Check',
    label: 'Total Angle Check',
    align: 'left',
  },
  {
    id: 'Labels_Check.ArcLength_Check.ArcLength_Check',
    label: 'Arc Length Check',
    align: 'left',
  },
  {
    id: 'Labels_Check.Arc_EndPoint_Check.Arc_EndPoint_Check',
    label: 'End Tangency Check',
    align: 'left',
  },
]

const referenceColumns = [
  {
    id: 'oid',
    label: 'Parcel ID',
    align: 'left',
  },
  {
    id: 'oid',
    label: 'Conveyance/Map type',
    align: 'left',
  },
  {
    id: 'oid',
    label: 'NO.',
    align: 'left',
  },
  {
    id: 'oid',
    label: 'Document Reference',
    align: 'left',
  },
  {
    id: 'oid',
    label: 'Recorded/Survey Date',
    align: 'left',
  },
  {
    id: 'oid',
    label: 'LS/RE#',
    align: 'left',
  },
  {
    id: 'oid',
    label: 'Certificate of Correction',
    align: 'left',
  },
]

const timelineColumns = [
  {
    id: 'oid',
    label: 'Parcel ID',
    align: 'left',
  },
]

const monumentsColumns = [
  {
    id: 'oid',
    label: 'Parcel ID',
    align: 'left',
  },
  {
    id: 'oid',
    label: 'Map No.',
    align: 'left',
  },
  {
    id: 'oid',
    label: 'Reference',
    align: 'left',
  },
  {
    id: 'oid',
    label: 'Project Name',
    align: 'left',
  },
  {
    id: 'oid',
    label: 'GPS Name',
    align: 'left',
  },
  {
    id: 'oid',
    label: 'Point ID',
    align: 'left',
  },
  {
    id: 'oid',
    label: 'Monument',
    align: 'left',
  },
]

const historyColumns = [
  {
    id: 'oid',
    label: 'Parcel ID',
    align: 'left',
  },
]

const monumentTimelineColumns = [
  {
    id: 'oid',
    label: 'Parcel ID',
    align: 'left',
  },
]

const relativedColumns = [
  {
    id: 'oid',
    label: 'Parcel ID',
    align: 'left',
  },
]

const SurveyTable = ({loading, data, selected, setSelected, page}) => {
  const referenceTabs = [['References', referenceColumns], [ 'Timeline', timelineColumns]];
  const legalTabs = [['Line Check', lineColumns], ['Curve Check', curveColumns]];
  const monumentTabs = [['Monuments', monumentsColumns], ['History', historyColumns], ['Timeline', monumentTimelineColumns], ['Relatived', relativedColumns]];

  const [active, setActive] = useState(0);
  const [activeColumns, setActiveColumns] = useState(lineColumns)
  const [row, setRow] = useState(null)
  const [lineErrors, setLineErrors] = useState(0)
  const [curveErrors, setCurveErrors] = useState(0)
  const [tabArray, setTabArray] = useState(legalTabs)
  const [sortName, setSortName] = useState()
  const [contain, setContain] = useState(false)
  const [sortArrow, setSortArrow] = useState(['', 'default'])
  const [showError, setShowError] = useState('all')
  const [sortTerm, setSortTerm] = useState('parcelId')
  const [resultCheck, setResultCheck] = useState(false)

  //Storing parsed table data. Defaults contain the original state before any modifying happens from sort functions.
  const [tableResults, setTableResults] = useState([])
  const [defaultTableResults, setDefaultTableResults] = useState([])
  const [defaultSortedResults, setDefaultSortedResults] = useState([])
  const [sortedResults, setSortedResults] = useState([])

  //Things get a liiiiittle complicated here...


  //When the data loads, we need to see which segments are passing and failing
  useEffect(() => {
    if(data) {
      let lines = 0;
      let curves = 0;
      let results = []
      data.map((e, i) => {
        Object.entries(data[i][1][1][1][0]['Segments']).map((row, l) => {
          row[1] = {...row[1], ...{parcel: i+1}, ...{parcelId: (i+1) + ":" + (l+1)}}
          if (row.find(({ shapeType }) => shapeType === 'Line')) {
            let check1 = false //Checking for failing segments. if one fail is detected, we add a new key to the object with a failing value
            let check2 = false //Same as above for passing but if a fail is detected, the success status is overwritten
            if(Object.values(Object.values(Object.values(row[1].Labels_Check))).includes('None')) {
              row[1] = {...row[1], ...{status: 'none'}}
            } else {
              Object.values(Object.values(row[1].Labels_Check)).map((el, il) => {
                if(Object.values(el).includes('Fail') && check1 === false) {
                    lines++ //Adding up all failing line segments to report later on
                    check1 = true
                    row[1] = {...row[1], ...{status: 'fail'}}
                } else if (Object.values(el).includes('Pass') && !Object.values(el).includes('Fail') && check2 === false) {
                   check2 = true
                   row[1] = {...row[1], ...{status: 'pass'}}
                }
              })
            }
          } else if (row.find(({ shapeType }) => shapeType === 'Curve')) {
            let check1 = false
            let check2 = false
            console.log(Object.values(Object.values(Object.values(row[1].Labels_Check))))
            if(Object.values(Object.values(Object.values(row[1].Labels_Check)))[0] === 'None') {
              row[1] = {...row[1], ...{status: 'none'}}
            } else {
              Object.values(Object.values(row[1].Labels_Check)).map((el, il) => {
                if(Object.values(el).includes('Fail') && check1 === false) {
                  curves++ //Adding up all failing curve segments to report later on
                  check1 = true
                  row[1] = {...row[1], ...{status: 'fail'}}
                } else if (Object.values(el).includes('Pass') && !Object.values(el).includes('Fail') && check2 === false) {
                  check2 = true
                  row[1] = {...row[1], ...{status: 'pass'}}
                }
              })
            }
          }
          results.push(row[1])
        })
      })
      setLineErrors(lines)
      setCurveErrors(curves)
      setDefaultTableResults(results)
      setTableResults(results)
    }
  }, [data])

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

  //Changes the table view to line/curve depending on what table the selected row is in
  useEffect(() => {
    if (selected) {
      let row = tableResults.find(({oid}) => oid === selected)
      if (row && row['shapeType'] === 'Line') {
        setActive(0);
        setActiveColumns(lineColumns);
      } else if (row && row['shapeType'] === 'Curve') {
        setActive(1);
        setActiveColumns(curveColumns);
      }
    }
  }, [selected])

  //switch between line and curve view
  const handleClick = (num, column) => {
    setActive(num);
    setActiveColumns(column);
};

//Handle click to sort by parcel or by all
const handleFilterClick = () => {
  if(contain === true) {
    setContain(false)
  } else {
    setContain(true)
  }
}

//Toggle through all filter functions
const handleErrorClick = () => {
  if(showError === 'all') {
    setShowError('fail')
  } else if (showError === 'fail'){
    setShowError('pass')
  } else if(showError === 'pass') {
    setShowError('none')
  } else {
    setShowError('all')
  }
}

//Change tabs depending on page
useEffect(() => {

  switch(page) {
    case 'reference': 
      setTabArray(referenceTabs)
      break
    case 'legal':
      setTabArray(legalTabs)
      break
    case 'details':
      setTabArray(legalTabs)
      break
    case 'monument':
      setTabArray(monumentTabs)
      break
    default:
      setTabArray(legalTabs)
  }
}, [page])


useEffect(() => {
  setActiveColumns(tabArray[0][1])
  setActive(0)
}, [tabArray])

  //Sorts table when a heading is clicked. Multiple clicks on the same heading will toggle 
  //between sorting alphabetically/numerically and reverse alphabetically/numerically

  const handleSortClick = e => {
    setSortTerm(e)
    if(!sortName || (e !== sortName && e + 'Alt' !== sortName)) {
      setSortArrow([e, 'down'])
      setSortName(e +'Alt')
    } else if(sortName === e + 'Alt') {
      setSortArrow([e, 'up'])
      setSortName(e)
    } else {
      setSortArrow([e, 'default'])
      setSortName()
    }
  }

  useEffect(() => {
    let filteredResults = defaultTableResults //reset the sort every time. This makes it a billion times easier to handle
    if(showError !== 'all') {
       filteredResults = defaultTableResults.filter(e => e?.status === showError)
    }

    if(sortTerm) {
      let e = sortTerm
      let results = []
      if (contain === true) {
        if (sortArrow[1] === 'down') {
          setSortName(e.toString() +'Alt')
          for(let i = 1; filteredResults.find(el => el.parcel === i); i++) {
            let sort = filteredResults.slice().filter(ell => ell.parcel === i).sort((a, b) => {
              
              let textA = _.get(a, e);
              let textB = _.get(b, e);

              if (e.toString() === 'parcelId') {
                return (textA===undefined)-(textB===undefined) || textA.localeCompare(textB, 'en', { numeric: true, sensitivity: 'base' });
              } else {
                return (textA===undefined)-(textB===undefined) || -(textA<textB)||+(textA>textB);
              }
            })
            results = results.concat(sort)
          }
        } else if(sortArrow[1] === 'up') {
          for(let i = 1; filteredResults.find(el => el.parcel === i); i++) {
            let sort = filteredResults.slice().filter(ell => ell.parcel === i).sort((a, b) => {
              let textA = _.get(a, e);
              let textB = _.get(b, e);
              if (e.toString() === 'parcelId') {
                return (textA===undefined)-(textB===undefined) || textB.localeCompare(textA, 'en', { numeric: true, sensitivity: 'base' });
              } else {
                return (textA===undefined)-(textB===undefined) || -(textA>textB)||+(textA<textB);
              }
            })
            results = results.concat(sort)
          }
        } else {
          results = results.concat(filteredResults)
        }
      } else {
        if(sortArrow[1] === 'down') {
          let sort = filteredResults.slice().sort((a, b) => {
            let textA = _.get(a, e);
            let textB = _.get(b, e);
            if (e.toString() === 'parcelId') {
              return (textA===undefined)-(textB===undefined) || textA.localeCompare(textB, 'en', { numeric: true, sensitivity: 'base' });
            } else {
              return (textA===undefined)-(textB===undefined) || +(textA>textB)||-(textA<textB);
            }
          })
          results = results.concat(sort)
          console.log(sortName)
        } else if(sortArrow[1] === 'up'){
          let sort = filteredResults.slice().sort((a, b) => {
            let textA = _.get(a, e);
            let textB = _.get(b, e);
            if (e.toString() === 'parcelId') {
              return (textA===undefined)-(textB===undefined) || textB.localeCompare(textA, 'en', { numeric: true, sensitivity: 'base' });
            } else {
              return (textA===undefined)-(textB===undefined) || -(textA>textB)||+(textA<textB);
            }
          })
          results = results.concat(sort)
        } else {
          results = results.concat(filteredResults)
        }
      }
      setTableResults(results)
      setDefaultSortedResults(results)
    } else {
      setTableResults(filteredResults)
      setDefaultSortedResults(filteredResults)
    }

  }, [sortArrow, showError, contain])
    
  if (loading || !data) 
    return (
      <div className="survey">
        <div className="spinner">
            <CircularProgress size={48} />
        </div>
      </div>
    )
 
    return (
      <div className="survey">
      <div className='noselect survey__tab-row'>
        <div className='survey__tab-col'>
          {/* Creating tabs for selected page */}
          {tabArray.map((e, i) => (
            <div 
            className={(active === i) ? 'survey__tab survey__tab--selected' : 'survey__tab'} 
            onClick={() => handleClick(i, e[1])}
            >{e[0]}  
            {(lineErrors > 0 && e[0] === "Line Check" ? 
            <span className="error-icon">{lineErrors}</span> : 
            curveErrors > 0 && e[0] === "Curve Check" ? 
            <span className="error-icon">{curveErrors}</span> 
            : null)}
            </div>
          ))}
        </div>
        <div className="survey__tab-col">
          {/* Adding tabs to handle filters */}
          <div
          className={(showError === 'fail' || showError === 'pass' || showError === 'none' ? 'survey__tab survey__tab--selected' : 'survey__tab')}
          onClick={() => handleFilterClick()}>Sort By {(contain === true ? "All" : "Parcel")}
          </div>
          <div
          className={(showError === 'fail' || showError === 'pass' || showError === 'none' ? 'survey__tab survey__tab--selected' : 'survey__tab')}
          onClick={() => handleErrorClick()}>Filter {(showError === 'fail' ? 'Passing': showError === 'pass' ? "Unknown" : showError === 'none' ? 'All' : "Failing")}
          </div>
        </div>
      </div>
      <div className="survey__title">Dimension {(activeColumns === lineColumns) ? "Line" : "Curve"} Check</div>
      <div className='scroll scroll--alt table-cont'>
        <table className="table">
          <thead className="table__head">
            <tr className="table__head__row">
              {/* Create columns for selected table data */}
              {activeColumns.map((column, i) => (
                  <td
                    key={i}
                    align={column.align}
                    onClick={e => handleSortClick(column.id)}
                  >
                    <div className="table__head__cell">
                      <span>{column.label}</span>
                      <span style={{padding: '0 .5rem', flex: '1'}}>{(column.id === sortArrow[0] ? (sortArrow[1] === 'down' ? '▼' : sortArrow[1] === 'up' ? "▲" : '▶' ) : '▶')}</span>
                    </div>
                  </td>
                ))}
            </tr>
          </thead>
          <tbody className="table__body">
            {/* Create rows for each segment */}
            {tableResults?.map((e, i) => {
              //Sort what dimension is displayed
              if ((Object.entries(e)[1][1] === 'Line' && activeColumns === lineColumns) || (Object.entries(e)[1][1] === 'Curve' && activeColumns === curveColumns) ) {
                  return(
                  <tr ref={(e['oid'] === selected ? itemEl : null)} className={(e['oid'] === selected ? 'table__row table__row--selected' : 'table__row')} role="checkbox" tabIndex={-1} key={i} onClick={() => e['oid'] !== selected ? setSelected(e['oid']) : setSelected()}>
                      {activeColumns.map((column, il) => {
                        const value = _.get(e, column.id);
                        return (
                          <td className='table__cell' key={il} align={column.align}>
                            {//Adding icons for passing/failing/unkown values: https://stackoverflow.com/questions/46592833/how-to-use-switch-statement-inside-a-react-component
                            {
                              'Pass': <img src={good} alt="Pass"></img>,
                              'Fail': <img src={error} alt="Fail"></img>,
                              undefined: <img src={missing} alt="Missing"></img>,
                            }[value] || (isNaN(Number(value)) === false ? Number(value).toFixed(2) : value )}
                          </td>
                        );
                      })}
                    </tr>
                  );
              }
            })}
          </tbody>
        </table>
        {tableResults.filter(e => (Object.entries(e)[1][1] === 'Line' && activeColumns === lineColumns) || (Object.entries(e)[1][1] === 'Curve' && activeColumns === curveColumns)).length === 0 ?
        //Display warning if no rows are in the table
          <div className="empty-results">
              <TriError color={'#664d03'}/>
              <div>No data returned. Try adjusting your filters</div>
          </div> : null}
      </div>
      </div>
    )
}

export default SurveyTable