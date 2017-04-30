import React, { PropTypes } from 'react';
import Highcharts from 'highcharts/highstock';
import * as Chart from '../utils/Charts';

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
    data: PropTypes.object.isRequired,
    type: PropTypes.oneOf(chartTypes).isRequired,
    container: PropTypes.string.isRequired,
  },

  componentDidMount() {
    if(!window.graphIntervals) {
      window.graphIntervals = [];
    }
    this.setupChart();
  },

  componentWillUnmount() {
    this.chart.destroy();
    window.graphIntervals.map((intervalId) => {
      window.clearInterval(intervalId);
    });
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

    this.chart = Highcharts.stockChart(this.props.container, {
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
    const { type, data } = this.props;
    switch (type) {
      case 'TEMPERATURE':
        return Chart.processTempData(data);
      case 'HUMIDITY':
        return Chart.processHumidityData(data);
      case 'ALTITUDE':
        return Chart.processAltitudeData(data);
      case 'ACCELEROMETER':
        return Chart.processAccelData(data);
      case 'GYROSCOPE':
        return Chart.processGyroData(data);
      case 'MAGNETOMETER':
        return Chart.processMagData(data);
      case 'RGB':
        return Chart.processRGBData(data);
      case 'LUX':
        return Chart.processLUXData(data);
      case 'COLOR_TEMP':
        return Chart.processColorTempData(data);
      default:
        return null;
    }
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
    const { title, source, type } = this.props;
    if (title) {
      return {
        text: `${title}-${type}-${source}`,
      };
    }
    return {
      text: `${type}-${source}`,
    };
  },

  getXAxisOptions() {
    return {
      labels: { autoRotation: 0 },
    };
  },

  getYAxisOptions() {
    const { type } = this.props;
    switch (type) {
      case 'TEMPERATURE':
        return Chart.getTempAxis();
      case 'HUMIDITY':
        return Chart.getHumidityAxis();
      case 'ALTITUDE':
        return Chart.getAltitudeAxis();
      case 'ACCELEROMETER':
        return Chart.getAccelAxis();
      case 'GYROSCOPE':
        return Chart.getGyroAxis();
      case 'MAGNETOMETER':
        return Chart.getMagAxis();
      case 'RGB':
        return Chart.getRGBAxis();
      case 'LUX':
        return Chart.getLUXAxis();
      case 'COLOR_TEMP':
        return Chart.getColorTempAxis();
      default:
        return null;
    }
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
    const { type } = this.props;
    switch (type) {
      case 'TEMPERATURE':
        return Chart.getTempSeries();
      case 'HUMIDITY':
        return Chart.getHumiditySeries();
      case 'ALTITUDE':
        return Chart.getAltitudeSeries();
      case 'ACCELEROMETER':
        return Chart.getAccelSeries();
      case 'GYROSCOPE':
        return Chart.getGyroSeries();
      case 'MAGNETOMETER':
        return Chart.getMagSeries();
      case 'RGB':
        return Chart.getRGBSeries();
      case 'LUX':
        return Chart.getLUXSeries();
      case 'COLOR_TEMP':
        return Chart.getColorTempSeries();
      default:
        return null;
    }
  },

  render() {
    return React.createElement('div', { id: this.props.container });
  },
});

export default HighChartsComponent;
