var chart1;
$(function() {

    Highcharts.setOptions({
        global: {
            useUTC: false
        }
    });


    chart1 = Highcharts.stockChart('container', {
        chart: {
            events: {
                load: function() {}
            }
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
            text: 'Temperature Sensors'
        },
        yAxis: {
            title: {
                text: 'Rando'
            },
            min: 0,
            max: 100,
        },

        exporting: {
            enabled: false
        },
        series: [{
            type: "line",
            name: 'Temp1',
            data: []
        }]
    });
    // set up the updating of the chart each second
    var series0 = chart1.series[0];
    setInterval(function() {
        series0.redraw()
    }, 100);

});
