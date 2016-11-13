var tempChart;
var humidtyChart;
var altitudeChart;
var accelerometerGraph;
var chart5;

$(function() {

    Highcharts.setOptions({
        global: {
            useUTC: false
        }
    });


    // UNO
    tempChart = Highcharts.stockChart('tempChart', {
        chart: {
            events: {
              load: function () {

                  // set up the updating of the chart each second
                  var series = this.series;
                  setInterval(function () {
                    if(dataArray) {
                      var x = (new Date()).getTime(), // current time
                          y = Math.round(Math.random() * 100);
                      series[0].addPoint([x, dataArray[1]], true, true, false);
                    }
                  }, 100);
                }
            }
        },
        navigator: {
          enabled: true,
          adaptToUpdatedData: true
        },
        scrollbar: {
               barBackgroundColor: 'gray',
               barBorderRadius: 7,
               barBorderWidth: 0,
               buttonBackgroundColor: 'gray',
               buttonBorderWidth: 0,
               buttonBorderRadius: 7,
               trackBackgroundColor: 'none',
               trackBorderWidth: 1,
               trackBorderRadius: 8,
               trackBorderColor: '#CCC'
           },
        rangeSelector: {
            buttons: [{
                count: 1,
                type: 'minute',
                text: '1M'
            }, {
                count: 5,
                type: 'minute',
                text: '5M'
            }, {
                type: 'all',
                text: 'All'
            }],
            inputEnabled: false,
            selected: 0
        },
        legend: {
            enabled: true
        },
        title: {
            text: 'Temperature'
        },
        xAxis: {
          labels: {autoRotation: 0}
        },
        yAxis: {
            title: {
                text: '°C'
            },
            min: 24,
            max: 30,
        },
        legend: {
            enabled: false
        },
        exporting: {
            enabled: false
        },
        series: [{
            showInNavigator: true,
            data: (function () {
                // generate an array of random data
                var data = [],
                    time = (new Date()).getTime(),
                    i;

                for (i = -100; i <= 0; i += 1) {
                    data.push([
                        time + i * 1000,
                      0
                    ]);
                }
                return data;
            }())
        },
      ]
    });
    // DOS
    humidtyChart = Highcharts.stockChart('humidtyChart', {
        chart: {
            events: {
              load: function () {

                  // set up the updating of the chart each second
                  var series = this.series;
                  setInterval(function () {
                    if(dataArray) {
                      var x = (new Date()).getTime(), // current time
                          y = Math.round(Math.random() * 100);
                      series[0].addPoint([x, dataArray[4]], true, true, false);
                    }
                  }, 100);
                }
            }
        },
        navigator: {
          enabled: false
        },
        scrollbar: {
               barBackgroundColor: 'gray',
               barBorderRadius: 7,
               barBorderWidth: 0,
               buttonBackgroundColor: 'gray',
               buttonBorderWidth: 0,
               buttonBorderRadius: 7,
               trackBackgroundColor: 'none',
               trackBorderWidth: 1,
               trackBorderRadius: 8,
               trackBorderColor: '#CCC'
           },
        rangeSelector: {
            buttons: [{
                count: 1,
                type: 'minute',
                text: '1M'
            }, {
                count: 5,
                type: 'minute',
                text: '5M'
            }, {
                type: 'all',
                text: 'All'
            }],
            inputEnabled: false,
            selected: 0
        },
        legend: {
            enabled: true
        },
        title: {
            text: 'Humidity'
        },
        xAxis: {
          labels: {autoRotation: 0}
        },
        yAxis: {
            title: {
                text: '%'
            },
            min: 0,
            max: 100,
        },
        legend: {
            enabled: false
        },
        exporting: {
            enabled: false
        },
        series: [{
            name: 'Random data',
            data: (function () {
                // generate an array of random data
                var data = [],
                    time = (new Date()).getTime(),
                    i;

                for (i = -100; i <= 0; i += 1) {
                    data.push([
                        time + i * 1000,
                      0
                    ]);
                }
                return data;
            }())
        },
      ]
    });

    // TRES
    altitudeChart = Highcharts.stockChart('altitudeChart', {
        chart: {
            events: {
              load: function () {

                  // set up the updating of the chart each second
                  var series = this.series;
                  setInterval(function () {
                    if(dataArray) {
                      var x = (new Date()).getTime(), // current time
                          y = Math.round(Math.random() * 100);
                      series[0].addPoint([x, dataArray[3]], true, true, false);
                    }
                  }, 100);
                }
            }
        },
        navigator: {
          enabled: false
        },
        scrollbar: {
               barBackgroundColor: 'gray',
               barBorderRadius: 7,
               barBorderWidth: 0,
               buttonBackgroundColor: 'gray',
               buttonBorderWidth: 0,
               buttonBorderRadius: 7,
               trackBackgroundColor: 'none',
               trackBorderWidth: 1,
               trackBorderRadius: 8,
               trackBorderColor: '#CCC'
           },
        rangeSelector: {
            buttons: [{
                count: 1,
                type: 'minute',
                text: '1M'
            }, {
                count: 5,
                type: 'minute',
                text: '5M'
            }, {
                type: 'all',
                text: 'All'
            }],
            inputEnabled: false,
            selected: 0
        },
        legend: {
            enabled: true
        },
        title: {
            text: 'Altitude'
        },
        xAxis: {
          labels: {autoRotation: 0}
        },
        yAxis: {
            title: {
                text: 'meters'
            },
            min: 0,
            max: 1000,
        },
        legend: {
            enabled: false
        },
        exporting: {
            enabled: false
        },
        series: [{
            name: 'Altitude (m)',
            data: (function () {
                // generate an array of random data
                var data = [],
                    time = (new Date()).getTime(),
                    i;

                for (i = -100; i <= 0; i += 1) {
                    data.push([
                        time + i * 1000,
                      0
                    ]);
                }
                return data;
            }())
        },
      ]
    });

    // QUATRO
    accelerometerGraph = Highcharts.stockChart('accelerometerGraph', {
        chart: {
            events: {
              load: function () {

                  // set up the updating of the chart each second
                  var series = this.series;
                  setInterval(function () {
                    if(dataArray) {
                      var x = (new Date()).getTime(), // current time
                          y = Math.round(Math.random() * 100);
                      series[0].addPoint([x, dataArray[8]], true, true, false);
                    }
                  }, 100);
                }
            }
        },
        navigator: {
          enabled: false
        },
        scrollbar: {
               barBackgroundColor: 'gray',
               barBorderRadius: 7,
               barBorderWidth: 0,
               buttonBackgroundColor: 'gray',
               buttonBorderWidth: 0,
               buttonBorderRadius: 7,
               trackBackgroundColor: 'none',
               trackBorderWidth: 1,
               trackBorderRadius: 8,
               trackBorderColor: '#CCC'
           },
        rangeSelector: {
            buttons: [{
                count: 1,
                type: 'minute',
                text: '1M'
            }, {
                count: 5,
                type: 'minute',
                text: '5M'
            }, {
                type: 'all',
                text: 'All'
            }],
            inputEnabled: false,
            selected: 0
        },
        legend: {
            enabled: true
        },
        title: {
            text: 'Accelerometer'
        },
        xAxis: {
          labels: {autoRotation: 0}
        },
        yAxis: {
            title: {
                text: '%'
            },
            min: -10,
            max: 10,
        },
        legend: {
            enabled: false
        },
        exporting: {
            enabled: false
        },
        series: [{
            name: 'Accelerometer(X)',
            data: (function () {
                // generate an array of random data
                var data = [],
                    time = (new Date()).getTime(),
                    i;

                for (i = -100; i <= 0; i += 1) {
                    data.push([
                        time + i * 1000,
                      0
                    ]);
                }
                return data;
            }())
        },
      ]
    });

    // CINCO
    chart5 = Highcharts.stockChart('chart5', {
        chart: {
            events: {
              load: function () {

                  // set up the updating of the chart each second
                  var series = this.series;
                  setInterval(function () {
                      var x = (new Date()).getTime(), // current time
                          y = Math.round(Math.random() * 100);
                      series[0].addPoint([x, b], true, true, false);
                  }, 100);
                }
            }
        },
        navigator: {
          enabled: false
        },
        scrollbar: {
               barBackgroundColor: 'gray',
               barBorderRadius: 7,
               barBorderWidth: 0,
               buttonBackgroundColor: 'gray',
               buttonBorderWidth: 0,
               buttonBorderRadius: 7,
               trackBackgroundColor: 'none',
               trackBorderWidth: 1,
               trackBorderRadius: 8,
               trackBorderColor: '#CCC'
           },
        rangeSelector: {
            buttons: [{
                count: 1,
                type: 'minute',
                text: '1M'
            }, {
                count: 5,
                type: 'minute',
                text: '5M'
            }, {
                type: 'all',
                text: 'All'
            }],
            inputEnabled: false,
            selected: 0
        },
        legend: {
            enabled: true
        },
        title: {
            text: 'Humidity'
        },
        xAxis: {
          labels: {autoRotation: 0}
        },
        yAxis: {
            title: {
                text: '%'
            },
            min: 0,
            max: 100,
        },
        legend: {
            enabled: false
        },
        exporting: {
            enabled: false
        },
        series: [{
            name: 'Random data',
            data: (function () {
                // generate an array of random data
                var data = [],
                    time = (new Date()).getTime(),
                    i;

                for (i = -100; i <= 0; i += 1) {
                    data.push([
                        time + i * 1000,
                      0
                    ]);
                }
                return data;
            }())
        },
      ]
    });

});
