import React, {Component} from 'react';
import { Link } from 'react-router';
import {deepOrange500} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Headset from 'material-ui/svg-icons/hardware/headset';
import People from 'material-ui/svg-icons/social/people';
import OpenInNew from 'material-ui/svg-icons/action/open-in-new';
import Home from 'material-ui/svg-icons/action/home';
import Toys from 'material-ui/svg-icons/hardware/toys';
// import Style from './Style.js';
const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
    primary1Color: deepOrange500,
    primary2Color: deepOrange500,
    primary3Color: deepOrange500,
  },
});

class SPEXHeader extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = { open: false };
  }

  handleMenuTouch() {
    const { open } = this.state;
    this.setState({
      open: !open,
    });
  }

  handleMenuItemTouch(event) {
    console.log('Menu Item Touched');
    console.log(event);
  }

  render() {
    const { open } = this.state;
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <AppBar
         title="HABnet"
         iconClassNameRight="muidocs-icon-navigation-expand-more"
         onLeftIconButtonTouchTap={this.handleMenuTouch.bind(this)}
       >
       <Drawer
        docked={false}
        open={open}
        onRequestChange={isOpen => this.setState({ open: isOpen })}>
        <MenuItem
          rightIcon={<Home/>}
          onTouchTap={this.handleMenuItemTouch.bind(this)}
          containerElement={<Link to="/home" />}>
          Home
        </MenuItem>
        <MenuItem
          rightIcon={<Headset/>}
          onTouchTap={this.handleMenuItemTouch.bind(this)}
          containerElement={<Link to="/statistics" />}>
          Statistics
        </MenuItem>
        <MenuItem
          rightIcon={<People/>}
          onTouchTap={this.handleMenuItemTouch.bind(this)}
          containerElement={<Link to="/orientation" />}>
          Orientation Visualizer
        </MenuItem>
        <MenuItem
          rightIcon={<Toys/>}
          onTouchTap={this.handleMenuItemTouch.bind(this)}
          containerElement={<Link to="/avionics" />}>
          Avionics Visualizer
        </MenuItem>
        <MenuItem
          rightIcon={<Toys/>}
          onTouchTap={this.handleMenuItemTouch.bind(this)}
          containerElement={<Link to="/mobileData" />}>
          Mobile Data Collection
        </MenuItem>
        <MenuItem
          rightIcon={<Toys/>}
          onTouchTap={this.handleMenuItemTouch.bind(this)}
          containerElement={<Link to="/dataGenerator" />}>
          Fake Data Generator
        </MenuItem>
        <MenuItem
          rightIcon={<Toys/>}
          onTouchTap={this.handleMenuItemTouch.bind(this)}
          containerElement={<Link to="/about" />}>
          About
        </MenuItem>
        <MenuItem
          rightIcon={<OpenInNew/>}
          onTouchTap={this.handleMenuItemTouch.bind(this)}
          href={'http://spex.rit.edu/'}>
          SPEX Website
        </MenuItem>
        </Drawer>
       </AppBar>
       
      </MuiThemeProvider>
    );
  }
}

export default SPEXHeader;
