import React, { useState, useEffect, useCallback} from "react"
import { makeStyles } from '@material-ui/core/styles';
import connection from '../services/connection'
import good from '../assets/check.svg'
import error from '../assets/error.svg'
import warn from '../assets/warning.svg'

const useStyles = makeStyles(() => ({
    circularProgress: {
      padding: '9em 0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
}));

const columns = [
  {
    id: 'status',
    label: 'Status',
    align: 'center',
  },
  {
    id: 'name',
    label: 'Parcel Name',
    align: 'left',
  },
  {
    id: 'length',
    label: 'Length',
    align: 'left',
  },
  {
    id: 'bearing',
    label: 'Bearing',
    align: 'left',
  },
  {
    id: 'label',
    label: 'Label Length',
    align: 'left',
  },
  {
    id: 'diff',
    label: 'Difference',
    align: 'left',
  },
  {
    id: 'sources',
    label: 'Significant Sources',
    align: 'center',
  },
  {
    id: 'lengthcheck',
    label: 'Length Check',
    align: 'center',
  },

  {
    id: 'bearingcheck',
    label: 'Bearing Check',
    align: 'center',
  },
  {
    id: 'northorientation',
    label: 'North Orientation',
    align: 'center',
  },
];

const rowProps = {
  style: {
    fontFamily: 'poppins, sans-serif',
    fontSize: '1rem',
    width: '100%'
  }
}

const dataProps = {
  style: {
    padding: '.5rem 1rem .5rem 1rem',
    maxWidth: 'max-content'
  }
}

const dataTopProps = {
  style: {
    padding: '.5rem 1rem .5rem 1rem',
    fontSize: '.75rem',
    lineHeight: '1.15',
    textAlign: 'left'
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
    tableLayout: '100%',
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


const SurveyTable = ({loading, url, data, selected, setSelected}) => {
  const [tableInfo, setTableInfo] = useState()
  const [didMount, setDidMount] = useState(false)
  const [active, setActive] = useState(true);
  const [active1, setActive1] = useState(false);
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
      if (data[select[0]].parcel[select[1]].dimension === 'line') {
        setActive1(false);
        setActive(true);
      } else if (data[select[0]].parcel[select[1]].dimension === 'curve') {
        setActive(false);
        setActive1(true);
      }
    }
  }, [select])

  //switch between line and curve view
  const handleClick = (e) => {
      if (active === false) {
          setActive1(false);
          setActive(true);
      }
  };

  const handleClickAlt = (e) => {
    if (active1 === false) {
        setActive(false);
        setActive1(true);
    }
};

  useEffect(() => {
    setSelect(selected);
  }, [selected])

  useEffect(() => { 
    setDidMount(true)
  }, [])

  useEffect(() => {
    if (didMount) {
      console.log('Url:', url)
      connection.getTableInfo(url).then(
          response => {
              console.log('Response', response)
              setTableInfo(response.data)
          },
          error => {
            console.log('Error:', error)        }
      )
    }  
  }, [url]);

  // if (loading && !tableInfo) 
  //   return (
  //       <Fragment>
  //           <span className={classes.circularProgress}>
  //               <CircularProgress size={48} />
  //           </span>
  //       </Fragment>
  //   )

  return (
    <>
    <div {...tableTabRowProps}>
      <div className={`tableTab`} {...(active === true) ? {...tableTabSelectedProps} : {...tableTabProps}} onClick={e => handleClick(e)}>Line Check</div>
      <div className={`tableTab`} {...(active1 === true) ? {...tableTabSelectedProps} : {...tableTabProps}} onClick={e => handleClickAlt(e)}>Curve Check</div>
    </div>
    <div {...tableTitleProps}>Dimension {(active === true) ? "Line" : "Curve"} Check</div>
    <div {...tableContProps} className={`scrollAlt`}>
      <table {...tableProps}>
        <thead {...tableHeadProps}>
          <tr {...rowProps}>
            {columns.map((column) => (
                <td
                  key={column.id}
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
              return (
                data[i].parcel.map((row, l) => {
                  //Sort what dimension is displayed
                  if ((data[i].parcel[l].dimension === 'line' && active === true) || (data[i].parcel[l].dimension === 'curve' && active1 === true) ) {
                    //get the selected row
                    if (select.length > 0 && select[0] === i && select[1] === l) {
                      return(
                      <tr ref={itemEl} className={'rowSelectColor'} {...rowProps} role="checkbox" tabIndex={-1} key={row.code} onClick={() => setSelected([])}>
                          {columns.map((column, i) => {
                            const value = row[column.id];
                            return (
                              <td {...dataProps} key={i} align={column.align}>
                                {//https://stackoverflow.com/questions/46592833/how-to-use-switch-statement-inside-a-react-component
                                {
                                  'good': <img src={good} alt="Good"></img>,
                                  'error': <img src={error} alt="Error"></img>,
                                  'warn': <img src={warn} alt="Warning"></img>, 
                                }[value] || value}
                              </td>
                            );
                          })}
                        </tr>
                      );
                    } else {
                      return (
                        <tr className={'rowAltColor'} {...rowProps} role="checkbox" tabIndex={-1} key={row.code} onClick={() => setSelected([i,l])}>
                          {columns.map((column, i) => {
                            const value = row[column.id];
                            return (
                              <td {...dataProps} key={i} align={column.align}>
                                
                                {//https://stackoverflow.com/questions/46592833/how-to-use-switch-statement-inside-a-react-component
                                {
                                  'good': <img src={good} alt="Good"></img>,
                                  'error': <img src={error} alt="Error"></img>,
                                  'warn': <img src={warn} alt="Warning"></img>, 
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
  );
}

export default SurveyTable