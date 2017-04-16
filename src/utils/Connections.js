const Immutable = require('immutable');
const { getMeasurementList } = require('../influxdb/InfluxDB.js');

let instance = null;
class Connections {
  constructor() {
    if (!instance) {
      instance = this;
      this.takenNames = Immutable.Map();
      this.dataSources = Immutable.Map();
      this.dataListeners = Immutable.Map();
      this.connectedClient = Immutable.Map();
      console.log('connections object constructor called');
    }
    console.log('connections object singleton returned');
    return instance;
  }

  doesClientExist(clientName) {

  }

  isClientConnected(clientName) {
    const dataSourceNames = this.dataSources.map(source => source.name);
    const dataListenerNames = this.dataListeners.map(source => source.name);
    if (dataSourceNames.includes(clientName) || dataListenerNames.includes(clientName)) return true;
    return false;
  }

  hasClientConnectedPreviously(clientName) {
    this.pullDBMeasurements();
    return this.takenNames.includes(clientName);
  }

  pullDBMeasurements() {
    return new Promise((resolve) => {
      getMeasurementList().then((influxMeasurements) => {
        this.takenNames = influxMeasurements;
        console.log(`There are ${this.takenNames.length} taken names in InfluxDB`);
        resolve(this);
      });
    });
  }
}

module.exports = {
  Connections,
};
