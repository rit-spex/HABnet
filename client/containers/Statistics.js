import React from 'react';
import Chart from '../components/Chart';
import ChartManager from '../components/ChartManager';

class Statistics extends React.Component {
  constructor(props) {
    super(props);
    this.state = { test: 'foo' };
  }

  render() {
    return (
      <div>
       <h1>This is the Statistics page</h1>
       <ChartManager />
        <div className="statistics-container">
          <Chart
            title="Test Chart"
            source="TestSource"
            data={{ magX: 0.1, magY: -0.1, magZ: 0.2 }}
            type="MAGNETOMETER"
            container="magChart"
          />
          <Chart
            title="Test Chart"
            source="TestSource"
            data={{ altitude: 1255 }}
            type="ALTITUDE"
            container="altitudeChart"
          />
          <Chart
            title="Test Chart"
            source="TestSource"
            data={{ humidity: 75 }}
            type="HUMIDITY"
            container="humidityChart"
          />
        </div>
      </div>
    );
  }
}

export default Statistics;
