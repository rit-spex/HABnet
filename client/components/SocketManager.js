import React, { PropTypes } from 'react';
import { List, ListItem } from 'material-ui/List';

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
    this.socket = this.props.socket;
    this.setupSocketListeners();
  },

  handleSubscribeToSocket(target) {
    const data = {
      target,
    };
    this.socket.emit('connectToSocket', data, () => {
      console.log(`This socket is now tracking ${target}`);
      this.fetchRoomLists();
    });
  },

  handleUnsubscribeFromSocket(target) {
    const data = {
      target,
    };
    this.socket.emit('disconnectFromSocket', data, () => {
      console.log(`This socket is no longer tracking ${target}`);
      this.fetchRoomLists();
    });
  },

  setupSocketListeners() {
    this.socket.on('availableRooms', (data) => {
      this.setState({
        availableSocketList: data.dataSources,
      });
    });

    this.socket.on('subscribedRooms', (data) => {
      this.setState({
        subscribedSocketList: data,
      });
    });
    this.fetchRoomLists();
  },

  fetchRoomLists() {
    this.props.socket.emit('getSubscribedRooms');
    this.props.socket.emit('getAvailableRooms');
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
            <ListItem
              key={index}
              primaryText={dataSocket.name}
              onTouchTap={ () => { this.handleSubscribeToSocket(dataSocket.name); }}
            />
          );
        })}
        </List>
        <h3>Connected Data Sources</h3>
        <List>
        {subscribedSocketList.map((dataSocket, index) => {
          return (
            <ListItem
              key={index}
              primaryText={dataSocket}
              onTouchTap={() => { this.handleUnsubscribeFromSocket(dataSocket); }}
            />
          );
        })}
        </List>
    </div>
    );
  },
});

export default SocketManager;
