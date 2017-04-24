import React, { PropTypes } from 'react';
import {List, ListItem} from 'material-ui/List';

const SocketManager = React.createClass({
  propTypes: {
    socket: PropTypes.object.isRequired,
  },

  getInitialState() {
    return {
      availableSocketList: [],
      subscribedSocketList: [],
    };
  },

  componentDidMount() {
    this.setupSocketListeners();
  },

  setupSocketListeners() {
    const { socket } = this.props;
    socket.on('availableRooms', (data) => {
      this.setState({
        availableSocketList: data.dataSources,
      });
    });

    socket.on('subscribedRooms', (data) => {
      this.setState({
        subscribedSocketList: data,
      });
    });
  },


  render() {
    const { availableSocketList, subscribedSocketList } = this.state;
    return (
      <div>
        <h2>
          This component will handle socket initializtion and connecting to data sources
        </h2>
        <h3>Available Data Sources</h3>
        <List>
        {availableSocketList.map((dataSocket, index) => {
          return (
            <ListItem key={index} primaryText={dataSocket.name} />
          );
        })}
        </List>
        <h3>Connected Data Sources</h3>
        <List>
        {subscribedSocketList.map((dataSocket, index) => {
          return (
            <ListItem key={index} primaryText={dataSocket.name} />
          );
        })}
        </List>
    </div>
    );
  },
});

export default SocketManager;
