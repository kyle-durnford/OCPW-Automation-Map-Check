import React, { Component } from 'react';
import { Container } from 'reactstrap';
//import { NavMenu } from './NavMenu'; Remove the default nav bar from the application. <NavMenu />

export class Layout extends Component {
  static displayName = Layout.name;

  render () {
    return (
      <div>

        <Container>
          {this.props.children}
        </Container>
      </div>
    );
  }
}
