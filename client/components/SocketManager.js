import React, { PropTypes } from 'react';
import { List, ListItem } from 'material-ui/List';

const SocketManager = React.createClass({
  propTypes: {
    socket: PropTypes.object.isRequired,
    username: PropTypes.string.isRequired,
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
        availableSocketList: this.cleanseAvailableSocketList(data),
      });
    });

    this.socket.on('subscribedRooms', (data) => {
      this.setState({
        subscribedSocketList: this.cleanseSubscribedSocketList(data),
      });
    });
    this.fetchRoomLists();
  },

  fetchRoomLists() {
    this.props.socket.emit('getSubscribedRooms');
    this.props.socket.emit('getAvailableRooms');
  },

  cleanseSubscribedSocketList(sockets) {
    const cleanSockets = sockets;
    const index = cleanSockets.indexOf(this.props.username);
    if (index > -1) {
      cleanSockets.splice(index, 1);
    }
    return cleanSockets;
  },

  cleanseAvailableSocketList(sockets) {
    const cleanSockets = sockets;
    this.state.subscribedSocketList.forEach(socket => {
      const index = cleanSockets.indexOf(socket);
      if (index > -1) {
        cleanSockets.splice(index, 1);
      }
    });
    return cleanSockets;
  },


  render() {
    const { availableSocketList, subscribedSocketList } = this.state;
    return (
      <div>
        <h3>Available Data Sources</h3>
        <List>
        {availableSocketList.map((dataSocket, index) => {
          return (
            <ListItem
              key={index}
              primaryText={dataSocket}
              onTouchTap={ () => { this.handleSubscribeToSocket(dataSocket); }}
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
