import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Nav, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import iconLegal from "../assets/icon_legal.svg"
import Project from "../assets/Project.js"
import monument from "../assets/monument.svg"
import reference from "../assets/reference.svg"
import checklist from "../assets/checklist.svg"
import report from "../assets/report.svg"
import './NavMenu.css';

const drawerWidth = 100;

const useStyles = makeStyles((theme) => ({
  navbar: {
    display: 'flex',
    backgroundColor: '#576EEF',
    width: `calc(100% - ${drawerWidth}px)`,
  },
  list: {
    bgcolor: '#3E52BB',
    margin: '1rem 0'
  },
  flex: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  tab: {
    border: 0,
    width: '64px',
    height:'4rem',
    borderRadius: 8,
    marginBottom: ".75rem",
    cursor: 'pointer'
  },
  title: {
    marginTop: '-1rem',
    fontFamily: 'poppins, sans-serif',
    color: '#fff',
    fontSize: ".65rem",
    fontWeight: '600'
  },
  icon: {
    marginTop: '-.5rem'
  },
  link: {
    textDecoration: 'none'
  }
}));

const selectedTab = {
  style: {
    backgroundColor: '#3E52BB',
    border: 0,
    width: '64px',
    height:'4rem',
    borderRadius: 8
  }
}

const columnProps = {
  border: 0,
  style: {
    background: '#576EEF', 
    width:'5rem', 
    height:'calc(100vh - 1rem)',
    padding: '.5rem', 
    margin: '.5rem 0 .5rem .5rem', 
    borderRadius: '.5rem', 
    position: 'fixed', 
    top: '0', 
    left: '0'},
};

const iconProps = {
};


const NavMenu = ({setPage, page}) => {
  const classes = useStyles();

  return (
      <div borderradius={8} {...columnProps}>
        <Nav variant="pills" className={classes.navbar} >
            <ul className="navbar-nav">
                <li className={`${classes.flex} ${classes.tab} ${classes.link}`} onClick={() => setPage('project')} {...(page === 'project' ? {...selectedTab} : null)}>
                  <div {...iconProps}>
                    <Project className={classes.icon} color={'#fff'}/>
                  </div>
                  <div className={classes.title}>
                    Project
                  </div> 
                </li> 
              
                <li className={`${classes.flex} ${classes.tab} ${classes.link}`} onClick={() => setPage('legal')} {...(page === 'legal' ? {...selectedTab} : null)}>
                  <div {...iconProps}>
                    <img src={iconLegal} className={classes.icon}></img>
                  </div>
                  <div className={classes.title}>
                    Legal
                  </div> 
                </li> 

                <li className={`${classes.flex} ${classes.tab} ${classes.link}`} onClick={() => setPage('monument')} {...(page === 'monument' ? {...selectedTab} : null)}>
                  <div {...iconProps}>
                    <img src={monument} className={classes.icon}></img>
                  </div>
                  <div className={classes.title}>
                    Monument
                  </div> 
                </li> 
          
                <li className={`${classes.flex} ${classes.tab} ${classes.link}`} onClick={() => setPage('reference')} {...(page === 'reference' ? {...selectedTab} : null)}>
                  <div {...iconProps}>
                    <img src={reference} className={classes.icon}></img>
                  </div>
                  <div className={classes.title}>
                    Reference
                  </div> 
                </li> 

                <li className={`${classes.flex} ${classes.tab} ${classes.link}`} onClick={() => setPage('check')} {...(page === 'check' ? {...selectedTab} : null)}>
                  <div {...iconProps}>
                    <img src={checklist} className={classes.icon}></img>
                  </div>
                  <div className={classes.title}>
                    Check List
                  </div> 
                </li>
              
                <li className={`${classes.flex} ${classes.tab} ${classes.link}`} onClick={() => setPage('report')} {...(page === 'report' ? {...selectedTab} : null)}>
                  <div {...iconProps}>
                    <img src={report} className={classes.icon}></img>
                  </div>
                  <div className={classes.title}>
                    Report
                  </div> 
                </li> 
            </ul>
        </Nav>
      </div>
  )

}

export default NavMenu
