import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import { Collapse, Container, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import iconLegal from "../assets/icon_legal.svg"
import './NavMenu.css';

const drawerWidth = 100;

const useStyles = makeStyles((theme) => ({
  navbar: {
    display: 'flex-column',
    bgcolor: '#576EEF',
    width: `calc(100% - ${drawerWidth}px)`,
  },
  list: {
    bgcolor: '#3E52BB',
  }
}));

const columnProps = {
  bgcolor: '#576EEF',
  borderColor: 'text.primary',
  m: 1,
  border: 1,
  style: { width: '5rem', height: '40rem' },
};

const tabProps = {
  display: 'flex',
  bgcolor: '#3E52BB',
  borderColor: 'text.primary',
  m: 1,
  border: 1,
  style: { width: '4rem', height: '4rem' },
  justifyContent: 'center',
};


const NavMenu = () => {
  const classes = useStyles();

  return (
    // <header>
      <Box borderRadius={8} {...columnProps}>
        <Nav variant="pills" className={classes.navbar} >
          <Container>
              <ul className="navbar-nav">
                <NavItem className={classes.list}>
                  <NavLink tag={Link} className="text-dark" to="/">
                    <div>
                      <img src={iconLegal}></img>
                    </div>
                    <div>
                      Legal
                    </div>  
                  </NavLink>
                </NavItem>
                {/* <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/counter">Counter</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/fetch-data">Fetch data</NavLink>
                </NavItem> */}
              </ul>
          </Container>
        </Nav>
      </Box>
    // </header>
  )

}

export default NavMenu
