import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Nav, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import iconLegal from "../assets/icon_legal.svg"
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
  },
  flex: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  tab: {
    backgroundColor: '#3E52BB',
    border: 0,
    width: '64px',
    height:'4rem',
    borderRadius: 8
  },
  title: {
    marginTop: '-.5rem',
    fontFamily: 'poppins, sans-serif',
    color: '#fff'
  },
  icon: {
    marginTop: '-.5rem'
  }
}));

const columnProps = {
  border: 0,
  style: {background: '#576EEF', width:'5rem', height:'calc(100vh - 1rem)', padding: '.5rem', margin: '.5rem 0 .5rem .5rem', borderRadius: '.5rem', position: 'fixed', top: '0', left: '0'},
};

const iconProps = {
};


const NavMenu = () => {
  const classes = useStyles();

  return (
    // <header>
      <div borderradius={8} {...columnProps}>
        <Nav variant="pills" className={classes.navbar} >
          <Container style={{padding: 0}}>
              <ul className="navbar-nav">
                <NavItem className={classes.list}>
                  <NavLink tag={Link} className="text-light" to="/">
                    <div className={`${classes.flex} ${classes.tab}`}>
                      <div {...iconProps}>
                        <img src={iconLegal} className={classes.icon}></img>
                      </div>
                      <div className={classes.title}>
                        Legal
                      </div> 
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
      </div>
    // </header>
  )

}

export default NavMenu
