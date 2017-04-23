import React, { PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
const DataSocketInitializer = React.createClass({
  propTypes: {
    connectSocket: PropTypes.func.isRequired,
    socketName: PropTypes.string.isRequired,
  },

  getInitialState() {
    const { socketName } = this.props;
    return {
      socketName,
    };
  },


  connectToServer() {
    const { connectSocket } = this.props;
    const { socketName } = this.state;
    connectSocket(socketName);
  },

  handleChange(event) {
    this.setState({
      socketName: event.target.value,
    });
  },

  render() {
    const { socketName } = this.state;
    return (
      <div>
        <h1>socket Initializer</h1>
        <TextField
          id="text-field-default"
          value={socketName}
          onChange={this.handleChange}
        />
        <Divider />
        <RaisedButton
          label="Connect to server"
          primary={true}
          onClick={this.connectToServer} />
      </div>
    );
  },

});

export default DataSocketInitializer;
