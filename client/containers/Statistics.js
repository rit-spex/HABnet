import React from 'react';
import io from 'socket.io-client';
import Immutable from 'immutable';
import CircularProgress from 'material-ui/CircularProgress';
import Chart from '../components/Chart';
import ChartManager from '../components/ChartManager';
import DataStore from '../utils/DataStore';

class Statistics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: 'GraphingClient',
      isSocketConnected: false,
      availableSocketList: [],
      subscribedSocketList: [],
      charts: [],
    };
  }

  componentWillMount() {
    this.connectSocket();
    this.setupSocketListeners();
    this.dataStore = new DataStore();
  }

  componentWillUnmount() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }

  connectSocket() {
    this.socket = io.connect();
    this.socket.on('joinedSuccessfully', (data) => {
      this.setState({ username: data.name });
    });
    this.socket.on('connect', () => {
      console.log('connected to server');
      this.socket.emit('join', { name: this.state.username, type: 'dataListener' });
      this.setState({ isSocketConnected: true });
    });

    this.socket.on('disconnect', () => {
      console.log('disconnected to server');
      this.setState({ isSocketConnected: false });
    });
  }

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
  }

  fetchRoomLists() {
    this.socket.emit('getSubscribedRooms');
    this.socket.emit('getAvailableRooms');
  }

  createChart(chartType, dataSource, chartName) {

    this.subscribeToSocket(dataSource, () => {
      const dataBuffer = this.dataStore.data.get(dataSource);
      const newChart = {
        title: chartName,
        source: dataSource,
        type: chartType,
        data: dataBuffer,
        container: `${chartType}-${dataSource}`,
      };

      const newCharts = this.state.charts;
      newCharts.push(newChart);
      this.setState({
        charts: newCharts,
      });
    });
  }

  subscribeToSocket(target, callback) {
    const data = {
      target,
    };
    this.socket.emit('connectToSocket', data, () => {
      console.log(`This socket is now tracking ${target}`);
    });
    this.fetchRoomLists();
    this.dataStore.data = this.dataStore.data.set(target, {});
    callback();
    this.socket.on('broadcastData', (socketData) => {
      const payload = socketData.payload;
      const source = socketData.name;
      this.dataStore.data = this.dataStore.data.set(source, payload);
    });
  }

  render() {
    const { isSocketConnected, availableSocketList, charts } = this.state;
    if (!isSocketConnected) return (<CircularProgress size={80} thickness={5} />);
    return (
      <div>
       <h1>This is the Statistics page</h1>
       <ChartManager 
        availableDataSources={availableSocketList}
        handleCreateChart={this.createChart.bind(this)}
        />
        <div className="statistics-container">
          {charts.map((chart, index) => {
            return (
              <Chart
                key={index}
                title={chart.title}
                source={chart.source}
                type={chart.type}
                container={chart.container}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default Statistics;
