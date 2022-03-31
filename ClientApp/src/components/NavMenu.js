import React from 'react';
import { Container, Nav, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import iconLegal from "../assets/icon_legal.svg"
import Project from "../assets/Project.js"
import monument from "../assets/monument.svg"
import reference from "../assets/reference.svg"
import checklist from "../assets/checklist.svg"
import report from "../assets/report.svg"
import show from "../assets/show.svg"
import hide from "../assets/hide.svg"
import logo from "../assets/oc-logo.png"

const drawerWidth = 100;

const NavMenu = ({setPage, page, hideDrawer, setHideDrawer}) => {

  return (
      <div className='navbar'>
        <Nav className='navbar__nav nav' width={`calc(100% - ${drawerWidth}px)`} >
            <ul className="nav__list">
              <li className='logo'>
                  <img src={logo} alt="Orange County Parcel Check"/>
              </li> 
              <li onClick={() => setPage('project')} className={(page === 'project' ? 'pill pill--selected' : 'pill')}>
                <div className="pill__icon">
                  <Project className="icon--nav" color={'#fff'}/>
                </div>
                <div className='pill__title'>
                  Project
                </div> 
              </li> 
            
              <li onClick={() => setPage('legal')} className={(page === 'legal' ? 'pill pill--selected' : 'pill')}>
                <div className="pill__icon">
                  <img src={iconLegal} className="icon--nav"></img>
                </div>
                <div className='pill__title'>
                  Legal
                </div> 
              </li> 

              {/* <li className='pill' onClick={() => setPage('monument')} className={(page === 'monument' ? 'pill pill--selected' : 'pill')}>
                <div className="pill__icon">
                  <img src={monument} className="icon--nav"></img>
                </div>
                <div className='pill__title'>
                  Monument
                </div> 
              </li>  */}

              {/* <li className='pill' onClick={() => setPage('reference')} className={(page === 'reference' ? 'pill pill--selected' : 'pill')}>
                <div className="pill__icon">
                  <img src={reference} className="icon--nav"></img>
                </div>
                <div className='pill__title'>
                  Reference
                </div> 
              </li>  */}

              {/* <li className='pill' onClick={() => setPage('check')} className={(page === 'check' ? 'pill pill--selected' : 'pill')}>
                <div className="pill__icon">
                  <img src={checklist} className="icon--nav"></img>
                </div>
                <div className='pill__title'>
                  Checklist
                </div> 
              </li>  */}

              <li onClick={() => setPage('report')} className={(page === 'report' ? 'pill pill--selected' : 'pill')}>
                <div className="pill__icon">
                  <img src={report} className="icon--nav"></img>
                </div>
                <div className='pill__title'>
                  Report
                </div> 
              </li> 
            </ul>
        </Nav>
        <ul className='nav__list--bottom'>
          {//V Major release.Minor Release.Patch Release
          }
          <li><p className='version'>0.0.1</p></li>
          <li onClick={() => setHideDrawer(hideDrawer ? false : true)}>
            <div>
              <img src={(hideDrawer === false ? hide : show)} className="icon--nav"></img>
            </div>
          </li> 
        </ul>
      </div>
  )

}

export default NavMenu
