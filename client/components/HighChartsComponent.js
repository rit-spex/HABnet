import React, { PropTypes } from 'react';
import Highcharts from 'highcharts/highstock';
import * as Chart from '../utils/Charts';
import DataStore from '../utils/DataStore';

require('highcharts/modules/exporting')(Highcharts);
require('highcharts-boost');
// Alternatively, this is how to load Highstock or Highmaps
// var Highcharts = require('highcharts/highstock');
// var Highcharts = require('highcharts/highmaps');

const HighChartsComponent = React.createClass({
  propTypes: {
    title: PropTypes.string,
    source: PropTypes.string.isRequired,
    type: PropTypes.oneOf(Chart.ChartTypes).isRequired,
    container: PropTypes.string.isRequired,
  },

  componentDidMount() {
    this.dataStore = new DataStore();
    this.setupChart();
  },

  componentWillUnmount() {
    this.chart.destroy();
    if (this.intervalId) {
      window.clearInterval(this.intervalId);
    }
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
    const data = this.dataStore.data.get(this.props.source);
    this.intervalId = setInterval(this.updateGraph, 100);
  },

  getChartOptions() {
    return {};
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
        this.updater = Chart.updateTempData;
        return Chart.getTempSeries();
      case 'HUMIDITY':
        this.updater = Chart.updateHumidityData;
        return Chart.getHumiditySeries();
      case 'ALTITUDE':
        this.updater = Chart.updateAltitudeData;
        return Chart.getAltitudeSeries();
      case 'ACCELEROMETER':
        this.updater = Chart.updateAccelData;
        return Chart.getAccelSeries();
      case 'GYROSCOPE':
        this.updater = Chart.updateGyroData;
        return Chart.getGyroSeries();
      case 'MAGNETOMETER':
        this.updater = Chart.updateMagData;
        return Chart.getMagSeries();
      case 'RGB':
        this.updater = Chart.updateRGBData;
        return Chart.getRGBSeries();
      case 'LUX':
        this.updater = Chart.updateLUXData;
        return Chart.getLUXSeries();
      case 'COLOR_TEMP':
        this.updater = Chart.updateColorTempData;
        return Chart.getColorTempSeries();
      default:
        return null;
    }
  },

  updateGraph() {
    const data = this.dataStore.data.get(this.props.source);
    this.updater(data, this.chart.series);
  },

  render() {
    return React.createElement('div', { id: this.props.container });
  },
});

export default HighChartsComponent;
