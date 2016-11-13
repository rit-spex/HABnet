var chart1;
var chart2;
var chart3;
var chart4;
var chart5;

$(function() {

    Highcharts.setOptions({
        global: {
            useUTC: false
        }
    });


    // UNO
    chart1 = Highcharts.stockChart('chart1', {
        chart: {
            events: {
              load: function () {

                  // set up the updating of the chart each second
                  var series = this.series;
                  setInterval(function () {
                      var x = (new Date()).getTime(), // current time
                          y = Math.round(Math.random() * 100);
                      series[0].addPoint([x, a], true, true, false);
                  }, 100);
                }
            }
        },
        navigator: {
          enabled: true
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
            max: 26,
        },
        legend: {
            enabled: false
        },
        exporting: {
            enabled: false
        },
        series: [{
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
    chart2 = Highcharts.stockChart('chart2', {
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

    // TRES
    chart3 = Highcharts.stockChart('chart3', {
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

    // QUATRO
    chart4 = Highcharts.stockChart('chart4', {
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
