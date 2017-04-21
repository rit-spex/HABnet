import React, {Component} from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { deepOrange500 } from 'material-ui/styles/colors';
import SPEXHeader from '../components/SPEXHeader';
//import Style from '../css/Style.js';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: deepOrange500,
  },
});

class Main extends Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return(
            <MuiThemeProvider muiTheme={muiTheme}>
                <div>
                    <SPEXHeader />
                    {this.props.children}
                </div>
            </MuiThemeProvider>
        );
    }
}

export default Main;
