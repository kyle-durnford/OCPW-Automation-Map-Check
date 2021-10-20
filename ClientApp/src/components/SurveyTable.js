import React, { useState, useEffect, useCallback, Fragment} from "react"
import { CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import good from '../assets/check.svg'
import error from '../assets/error.svg'
import warn from '../assets/warning.svg'
import _ from "lodash";

const useStyles = makeStyles(() => ({
    circularProgress: {
      padding: '9em 0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
}));

const lineColumns = [
  {
    id: 'status',
    label: 'Status',
    align: 'center',
  },
  {
    id: 'oid',
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
    id: 'Labels_Check.LineLength_Check.Difference',
    label: 'Difference',
    align: 'left',
  },
  {
    id: 'sources',
    label: 'Significant Sources',
    align: 'center',
  },
  {
    id: 'Labels_Check.LineLength_Check.SigFig_Check',
    label: 'Length Check',
    align: 'center',
  },

  {
    id: 'Labels_Check.LineBearing_Check.SigFig_Check',
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
    id: 'status',
    label: 'Status',
    align: 'center',
  },
  {
    id: 'oid',
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
    id: 'bearingRadiusOut_DMS',
    label: 'Bearing Radius Out',
    align: 'center',
  },
  {
    id: 'Labels_Check.ArcLength_Check.ArcLength_Label',
    label: 'Label Length',
    align: 'left',
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
    label: 'Bearing Check',
    align: 'center',
  },
  {
    id: 'northorientation',
    label: 'North Orientation',
    align: 'center',
  },
]

const rowProps = {
  style: {
    fontFamily: 'poppins, sans-serif',
    fontSize: '.9rem',
    width: '100%'
  }
}

const dataProps = {
  style: {
    padding: '.5rem 1rem .5rem 1rem',
    maxWidth: 'min-content',
    overflow: 'hidden',
    textOverflow: 'ellipses',
    whiteSpace: 'nowrap'
  }
}

const dataTopProps = {
  style: {
    padding: '.5rem 1rem .5rem 1rem',
    fontSize: '.75rem',
    lineHeight: '1.15',
    textAlign: 'left',
    maxWidth: '2rem'
  }
}

const tableContProps = {
  style: {
    width: 'auto', 
    overflow: 'auto', 
    height: 'calc(40vh - 131px - 2rem)',
    margin: '0rem 1rem 0rem 2rem',
    padding: '0 1rem 2rem 0'
  }
}

const tableProps = {
  style: {
    tableLayout: 'fixed',
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
    width: '100%'
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
    justifyContent: 'flex-start',
    flexWrap: 'nowrap',
    textTransform: 'uppercase',
    margin: '0 2rem'
  }
}


const SurveyTable = ({loading, data, selected, setSelected}) => {
  const classes = useStyles();

  const [active, setActive] = useState(true);
  const [activeColumns, setActiveColumns] = useState(lineColumns)
  const [select, setSelect] = useState([]);
  const [row, setRow] = useState(null)

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
    if (select.length > 0 && select[1] !== null) {
      if (Object.entries(Object.entries(data[select[0]][1][1][1][0]['Segments']))[select[1]][1][1]['shapeType'] === 'Line') {
        setActive(true);
        setActiveColumns(lineColumns);
      } else if (Object.entries(Object.entries(data[select[0]][1][1][1][0]['Segments']))[select[1]][1][1]['shapeType'] === 'Curve') {
        setActive(false);
        setActiveColumns(curveColumns);
      }
    }
  }, [select])

  //switch between line and curve view
  const handleClick = (e) => {
      if (active === false) {
          setActive(true);
          setActiveColumns(lineColumns);
      }
  };

  const handleClickAlt = (e) => {
    if (active === true) {
        setActive(false);
        setActiveColumns(curveColumns);
    }
};

  useEffect(() => {
    setSelect(selected);
  }, [selected])



  if (loading || !data) 
    return (
        <Fragment>
            <span className={classes.circularProgress}>
                <CircularProgress size={48} />
            </span>
        </Fragment>
    )
 
    return (
      <>
      <div {...tableTabRowProps}>
        <div className={`tableTab`} {...(active === true) ? {...tableTabSelectedProps} : {...tableTabProps}} onClick={e => handleClick(e)}>Line Check</div>
        <div className={`tableTab`} {...(active === false) ? {...tableTabSelectedProps} : {...tableTabProps}} onClick={e => handleClickAlt(e)}>Curve Check</div>
      </div>
      <div {...tableTitleProps}>Dimension {(active === true) ? "Line" : "Curve"} Check</div>
      <div {...tableContProps} className={`scrollAlt`}>
        <table {...tableProps}>
          <thead {...tableHeadProps}>
            <tr {...rowProps}>
              {activeColumns.map((column, i) => (
                  <td
                    key={i}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                    {...dataTopProps}
                  >
                    {column.label}
                  </td>
                ))}
            </tr>
          </thead>
          <tbody {...tableBodyProps}>
            {data.map((e, i) => {
              console.log();
                return (
                  Object.entries(data[i][1][1][1][0]['Segments']).map((row, l) => {
                    //Sort what dimension is displayed
                    //console.log(row[1].length)
                    if ((Object.entries(row[1])[1][1] === 'Line' && active === true) || (Object.entries(row[1])[1][1] === 'Curve' && active === false) ) {
                      //get the selected row
                      if (select.length > 0 && select[0] === i && select[1] === l) {
                        return(
                        <tr ref={itemEl} className={'rowSelectColor'} {...rowProps} role="checkbox" tabIndex={-1} key={l} onClick={() => setSelected([])}>
                            {activeColumns.map((column, i) => {
                              const value = _.get(row[1], column.id);
                              return (
                                <td {...dataProps} key={i} align={column.align}>
                                  {//https://stackoverflow.com/questions/46592833/how-to-use-switch-statement-inside-a-react-component
                                  {
                                    'Pass': <img src={good} alt="Pass"></img>,
                                    'Fail': <img src={error} alt="Fail"></img>,
                                    default: <p>None</p>,
                                  }[value] || value}
                                </td>
                              );
                            })}
                          </tr>
                        );
                      } else {
                        return (
                          <tr className={'rowAltColor'} {...rowProps} role="checkbox" tabIndex={-1} key={l} onClick={() => setSelected([i,l])}>
                            {activeColumns.map((column, i) => {
                              const value = _.get(row[1], column.id);
                              return (
                                <td {...dataProps} key={i} align={column.align}>
                                  
                                  {//https://stackoverflow.com/questions/46592833/how-to-use-switch-statement-inside-a-react-component
                                  {
                                    'Pass': <img src={good} alt="Pass"></img>,
                                    'Fail': <img src={error} alt="Fail"></img>,
                                    default: <p>None</p>, 
                                  }[value] || value}
                                </td>
                              );
                            })}
                          </tr>
                        );
                      }
                    }
                  }));
              })}
          </tbody>
        </table>
      </div>
      </>
    )
}

export default SurveyTable