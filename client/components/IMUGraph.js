import React, { PropTypes } from 'react';
import Highcharts from 'highcharts/highstock';

require('highcharts/modules/exporting')(Highcharts);
// Alternatively, this is how to load Highstock or Highmaps 
// var Highcharts = require('highcharts/highstock'); 
// var Highcharts = require('highcharts/highmaps'); 
 
const chartTypes = [
  'TEMPERATURE',
  'HUMIDITY',
  'ALTITUDE',
  'ACCELEROMETER',
  'GYROSCOPE',
  'MAGNETOMETER',
  'RGB',
  'LUX',
  'COLOR_TEMP',
];

const HighChartsComponent = React.createClass({
  propTypes: {
    title: PropTypes.string,
    source: PropTypes.string.isRequired,
    data: PropTypes.array.isRequired,
    type: PropTypes.oneOf(chartTypes).isRequired,
    container: PropTypes.string.isRequired,
    options: PropTypes.object,
    sourceName: PropTypes.string,
  },

  componentDidMount() {
    this.setupChart();
  },

  componentWillUnmount() {
    this.chart.destroy();
},

  setupChart() {
    Highcharts.setOptions({
      global: {
        useUTC: false,
      },
      credits: {
        enabled: false,
      },
    });

    this.chart = Highcharts.stockChart(this,props.container, {
      chart: this.getChartOptions(),
      navigator: this.getNavigatorOptions(),
      scrollbar: this.getScrollbarOptions(),
      rangeSelector: this.getRangeSelectorOptions(),
      title: this.getChartTitle(),
      xAxis: this.getXAxisOptions(),
      yAxis: this.getYAxisOptions(),
      legend: this.getLegendOptions(),
      exporting: this.getExportingOptions(),
      series: this.getSeries(),
    });
  },

  getChartOptions() {

  },

  getNavigatorOptions() {
    return {
      enabled: false,
      adaptToUpdatedData: true,
    };
  },

  getScrollbarOptions() {
    return {
      enabled: false,
      barBackgroundColor: 'gray',
      barBorderRadius: 7,
      barBorderWidth: 0,
      buttonBackgroundColor: 'gray',
      buttonBorderWidth: 0,
      buttonBorderRadius: 7,
      trackBackgroundColor: 'none',
      trackBorderWidth: 1,
      trackBorderRadius: 8,
      trackBorderColor: '#CCC',
    };
  },

  getRangeSelectorOptions() {
    return {
      enabled: false,
      inputEnabled: false,
      selected: 0,
    };
  },

  getChartTitle() {
    const { title, sourceName, type } = this.props;
    if (title) {
      return {
        text: `${title}-${sourceName}`,
      };
    }
    return {
      text: `${type}-${sourceName}`,
    };
  },

  getXAxisOptions() {
    return {
      labels: { autoRotation: 0 },
    };
  },

  getYAxisOptions() {
    return {
      title: {
        text: this.getUnits(),
      },
      softMin: this.getMin(),
      max: this.getMax(),
    };
  },

  getLegendOptions() {
    return {
      enabled: false,
    };
  },

  getExportingOptions() {
    return {
      enabled: false,
    };
  },

  getSeries() {

  },

  getUnits() {
    const { type } = this.props;
    switch (type) {
      case 'TEMPERATURE':
        return '°C';
      case 'HUMIDITY':
        return '%';
      case 'ALTITUDE':
        return 'meters';
      case 'ACCELEROMETER':
      case 'GYROSCOPE':
      case 'MAGNETOMETER':
      case 'RGB':
      case 'LUX':
      case 'COLOR_TEMP':
      default:
    }
  },

  getMin() {

  },

  getMax() {

  },

  loadChart() {
    const series = this.series;
    setInterval(() => {
      if (dataArray) {
        let x = (new Date()).getTime(),
          y = Math.round(Math.random() * 100);
        series[0].addPoint([x, dataArray[1]], true, true, false);
      }
    }, 100);
  },

  render() {
    return React.createElement('div', { id: this.props.container });
  },
});

export default HighChartsComponent;
