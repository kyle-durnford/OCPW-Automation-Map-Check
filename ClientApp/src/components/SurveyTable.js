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

const useStyles = makeStyles(() => ({
    circularProgress: {
      //padding: '9em 0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flex: "1",
      width: '100%',
      minHeight: '20vh'
    }
}));

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
    id: 'arcLength',
    label: 'Arc Length',
    align: 'left',
  },
  {
    id: 'bearingRadiusIn_DMS',
    label: 'Bearing Radius In',
    align: 'left',
  },
  {
    id: 'Labels_Check.ArcLength_Check.ArcLength_Label',
    label: 'Label Length',
    align: 'left',
  },
  {
    id: 'bearingRadiusOut_DMS',
    label: 'Bearing Radius Out',
    align: 'center',
  },
  {
    id: 'Labels_Check.ArcLength_Check.Difference',
    label: 'Difference',
    align: 'left',
  },
  {
    id: 'Labels_Check.ArcDelta_Check.SigFig_Check',
    label: 'Length Check',
    align: 'center',
  },
  {
    id: 'Labels_Check.ArcDelta_Check.SigFig_Check',
    label: 'Difference Bearing',
    align: 'center',
  },
  {
    id: 'Labels_Check.ArcDelta_Check.SigFig_Check',
    label: 'Bearing Check',
    align: 'center',
  },
  {
    id: 'northorientation',
    label: 'North Orientation',
    align: 'center',
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

//end of columns

const rowProps = {
  style: {
    fontFamily: 'poppins, sans-serif',
    fontSize: '.9rem',
    width: '100%',
    cursor: 'pointer'
  }
}

const dataProps = {
  style: {
    padding: '.5rem 0 .5rem 1rem',
    overflow: 'hidden',
    textOverflow: 'ellipses',
    whiteSpace: 'nowrap',
    width: 'calc(min-content + .5rem)'
  }
}

const dataTopProps = {
  style: {
    padding: '.5rem 0 .5rem 1rem',
    fontSize: '.75rem',
    lineHeight: '1.15',
    textAlign: 'left',
    cursor: 'pointer',
  }
}

const dataTopInner = {
  style: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  }
}

const tableContProps = {
  style: {
    width: 'auto', 
    overflow: 'auto', 
    height: '100%',
    margin: '0rem 1rem 0rem 1rem',
    padding: '0 1rem 0 0',
  }
}

const tableContainerProps = {
  style: {
    flex: "1",
    minHeight: '20vh',
    width: '100%'
  }
}

const tableProps = {
  style: {
    tableLayout: 'auto',
    width: '100%',
    borderCollaps: 'inherit',
    borderSpacing: '0px',
    position: 'relative',
    overflow: 'auto',
    display: 'table',
    borderCollapse: 'collapse',
    paddingRight: '1rem',
    textAlign: 'left',
  }
}

const tableHeadProps = {
  style: {
    textTransform: 'uppercase',
    fontWeight: '600',
    width: '100%',
    backgroundColor: '#fff',
    display: 'table-header-group',
    top: '0',
    position: 'sticky',
  }
}

const tableBodyProps = {
  style: {
    display: 'table-row-group',
    width: '100%',
  }
}

const tableTitleProps = {
  style: {
    fontFamily: 'poppins, sans-serif',
    fontSize: '1.25rem',
    fontWeight: '600',
    padding: '1rem 0 .5rem 2rem'
  }
}

const tableTabProps = {
  style: {
    fontFamily: 'poppins, sans-serif',
    fontWeight: '600',
    fontSize: '1rem',
    color: '#bbb',
    padding: '.25rem .5rem',
    borderTop: '.3rem solid #fff',
    transition: 'border-color .2s ease, color .2s ease',
    cursor: 'pointer'
  }
}

const tableTabSelectedProps = {
  style: {
    fontFamily: 'poppins, sans-serif',
    fontWeight: '600',
    fontSize: '1rem',
    color: 'rgb(87, 110, 239)',
    padding: '.25rem .5rem',
    borderTop: '.3rem solid rgb(87, 110, 239)',
    transition: 'border-color .2s ease, color .2s ease',
    cursor: 'pointer'
  }
}

const tableTabRowProps = {
  style: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'nowrap',
    textTransform: 'uppercase',
    margin: '0 2rem'
  }
}

const tabInner = {
  style: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexWrap: 'nowrap',
    textTransform: 'uppercase',
    margin: '0'
  }
}

const parcelErrorProps = {
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


const SurveyTable = ({loading, data, selected, setSelected, page}) => {
  const classes = useStyles();
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
  const [tableResults, setTableResults] = useState([])
  const [defaultTableResults, setDefaultTableResults] = useState([])
  const [contain, setContain] = useState(false)
  const [sortArrow, setSortArrow] = useState(['', 'default'])
  const [showError, setShowError] = useState('all')
  const [sortedResults, setSortedResults] = useState([])
  const [sortTerm, setSortTerm] = useState('parcelId')
  const [defaultSortedResults, setDefaultSortedResults] = useState([])

  useEffect(() => {
    if(data) {
      let lines = 0;
      let curves = 0;
      let results = []
      data.map((e, i) => {
        Object.entries(data[i][1][1][1][0]['Segments']).map((row, l) => {
          console.log(row[1])
          row[1] = {...row[1], ...{parcel: i+1}, ...{parcelId: (i+1) + ":" + (l+1)}}
          if (row.find(({ shapeType }) => shapeType === 'Line')) {
            let check1 = false
            let check2 = false
            console.log(Object.values(Object.values(Object.values(row[1].Labels_Check))))
            if(Object.values(Object.values(Object.values(row[1].Labels_Check))).includes('None')) {
              row[1] = {...row[1], ...{status: 'none'}}
            } else {
              Object.values(Object.values(row[1].Labels_Check)).map((el, il) => {
                if(Object.values(el).includes('Fail') && check1 === false) {
                    lines++
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
                  curves++
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

const handleFilterClick = () => {
  if(contain === true) {
    setContain(false)
  } else {
    setContain(true)
  }
}

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

  useEffect(() => {
    let filteredResults = defaultTableResults
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
        <Fragment>
            <span className={classes.circularProgress} {...tableContainerProps}>
                <CircularProgress size={48} />
            </span>
        </Fragment>
    )
 
    return (
      <div {...tableContainerProps}>
      <div {...tableTabRowProps}>
        <div {...tabInner}>
          {tabArray.map((e, i) => (
            <div 
            className={`tableTab`} 
            {...(active === i) ? {...tableTabSelectedProps} : {...tableTabProps}} 
            onClick={() => handleClick(i, e[1])}
            >{e[0]} 
            {(lineErrors > 0 && e[0] === "Line Check" ? 
            <span {...parcelErrorProps}>{lineErrors}</span> : 
            curveErrors > 0 && e[0] === "Curve Check" ? 
            <span {...parcelErrorProps}>{curveErrors}</span> 
            : null)}
            </div>
          ))}
        </div>
        <div {...tabInner}>
          <div className={`tableTab`} 
          {...(contain === true ? {...tableTabSelectedProps} : {...tableTabProps})}
          onClick={() => handleFilterClick()}>Sort By {(contain === true ? "All" : "Parcel")}
          </div>
          <div className={`tableTab`} 
          {...(showError === 'fail' || showError === 'pass' || showError === 'none' ? {...tableTabSelectedProps} : {...tableTabProps})}
          onClick={() => handleErrorClick()}>Filter {(showError === 'fail' ? 'Passing': showError === 'pass' ? "Unknown" : showError === 'none' ? 'All' : "Failing")}
          </div>
        </div>
      </div>
      {(page === 'legal' || page === 'project' ? <div {...tableTitleProps}>Dimension {(activeColumns === lineColumns) ? "Line" : "Curve"} Check</div> : null)}
      <div {...tableContProps} className={`scrollAlt`}>
        <table {...tableProps}>
          <thead {...tableHeadProps}>
            <tr {...rowProps}>
              {activeColumns.map((column, i) => (
                  <td
                    key={i}
                    align={column.align}
                    {...dataTopProps}
                    onClick={e => handleSortClick(column.id)}
                  >
                    <div {...dataTopInner}><span>{column.label}</span><span style={{padding: '0 .5rem'}}>{(column.id === sortArrow[0] ? (sortArrow[1] === 'down' ? '▼' : sortArrow[1] === 'up' ? "▲" : '▶' ) : '▶')}</span></div>
                  </td>
                ))}
            </tr>
          </thead>
          <tbody {...tableBodyProps}>
            {tableResults?.map((e, i) => {
              //Sort what dimension is displayed
              if ((Object.entries(e)[1][1] === 'Line' && activeColumns === lineColumns) || (Object.entries(e)[1][1] === 'Curve' && activeColumns === curveColumns) ) {
                  return(
                  <tr ref={(e['oid'] === selected ? itemEl : null)} className={(e['oid'] === selected ? 'rowSelectColor' : 'rowAltColor')} {...rowProps} role="checkbox" tabIndex={-1} key={i} onClick={() => e['oid'] !== selected ? setSelected(e['oid']) : setSelected()}>
                      {activeColumns.map((column, il) => {
                        const value = _.get(e, column.id);
                        return (
                          <td {...dataProps} key={il} align={column.align}>
                            {//https://stackoverflow.com/questions/46592833/how-to-use-switch-statement-inside-a-react-component
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
      </div>
      </div>
    )
}

export default SurveyTable