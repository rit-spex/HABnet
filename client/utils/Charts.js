export function generateDefaultData() {
  // generate an array of random data
  const data = [];
  const time = (new Date()).getTime();
  let i;
  for (i = -100; i <= 0; i += 1) {
    data.push([time + (i * 1000), 0]);
  }
  return data;
}

export const ChartTypes = [
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


export function getTempAxis() {
  return {
    title: {
      text: '°C',
    },
    softMin: 24,
    softMax: 30,
  };
}

export function getTempSeries() {
  return [{
    name: 'Temperature(C)',
    showInNavigator: true,
    data: generateDefaultData(),
  }];
}

export function processTempData(data) {
  return {
    events: {
      load() {
        const series = this.series;
        const intervalId = setInterval(() => { updateTempData(data, series); }, 100);
        window.graphIntervals.push(intervalId);
      },
    },
  };
}

export function updateTempData(data, series) {
  if (data) {
    const x = (new Date()).getTime();
    series[0].addPoint([x, data.temp1], true, true, false);
  }
}

export function getHumidityAxis() {
  return {
    title: {
      text: '%',
    },
    softMin: 0,
    softMax: 100,
  };
}

export function getHumiditySeries() {
  return [{
    name: 'Humidity(%)',
    data: generateDefaultData(),
  }];
}

export function processHumidityData(data) {
  return {
    events: {
      load() {
        const series = this.series;
        const intervalId = setInterval(() => { updateHumidityData(data, series); }, 100);
        window.graphIntervals.push(intervalId);
      },
    },
  };
}

export function updateHumidityData(data, series) {
  if (data) {
    const x = (new Date()).getTime();
    series[0].addPoint([x, data.humidity], true, true, false);
  }
}

export function getAltitudeAxis() {
  return {
    title: {
      text: 'meters',
    },
    plotLines: [{
      value: 541,
      color: 'green',
      dashStyle: 'Dot',
      width: 1,
      label: {
        text: 'Freedom Tower',
      },
    },
    {
      value: 29809,
      color: 'yellow',
      dashStyle: 'Dot',
      width: 1,
      label: {
        text: 'HAB2 Max Altitude',
      },
    },
    {
      value: 11887,
      color: 'red',
      dashStyle: 'Dot',
      width: 1,
      label: {
        text: 'Cruising altitude of a 747',
      },
    }],
    softMin: 0,
    softMax: 1000,
  };
}

export function getAltitudeSeries() {
  return [{
    name: 'Altitude (m)',
    data: generateDefaultData(),
  }];
}

export function processAltitudeData(data) {
  return {
    events: {
      load() {
      },
    },
  };
}

export function updateAltitudeData(data, series) {
  if (data) {
    const x = (new Date()).getTime();
    series[0].addPoint([x, data.altitude], true, true, false);
  }
}

export function getAccelAxis() {
  return {
    title: {
      text: 'g(m/s^2)',
    },
    plotLines: [{
      value: 1,
      color: 'red',
      dashStyle: 'Dot',
      width: 1,
      label: {
        text: '1g',
      },
    },
    {
      value: -1,
      color: 'blue',
      dashStyle: 'Dot',
      width: 1,
      label: {
        text: '-1g',
      },
    }],
    softMin: -10,
    softMax: 10,
  };
}

export function getAccelSeries() {
  return [{
    name: 'Accelerometer(X)',
    data: generateDefaultData(),
  },
  {
    name: 'Accelerometer(Y)',
    data: generateDefaultData(),
  },
  {
    name: 'Accelerometer(Z)',
    data: generateDefaultData(),
  }];
}

export function processAccelData(data) {
  return {
    events: {
      load() {
        const series = this.series;
        const intervalId = setInterval(() => { updateAccelData(data, series); }, 100);
        window.graphIntervals.push(intervalId);
      },
    },
  };
}

export function updateAccelData(data, series) {
  if (data) {
    const x = (new Date()).getTime();
    series[0].addPoint([x, data.accelX], true, true, false);
    series[1].addPoint([x, data.accelY], true, true, false);
    series[2].addPoint([x, data.accelZ], true, true, false);
  }
}

export function getGyroAxis() {
  return {
    title: {
      text: 'Degrees per Second',
    },
    plotLines: [{
      value: 6,
      color: 'red',
      dashStyle: 'Dot',
      width: 1,
      label: {
        text: '1 RPM',
      },
    },
    {
      value: 6,
      color: 'red',
      dashStyle: 'Dot',
      width: 1,
      label: {
        text: '1 RPM',
      },
    },
    {
      value: 60,
      color: 'blue',
      dashStyle: 'Dot',
      width: 1,
      label: {
        text: '10 RPM',
      },
    },
    {
      value: 300,
      color: 'green',
      dashStyle: 'Dot',
      width: 1,
      label: {
        text: '50 RPM',
      },
    }],
    softMin: -360,
    softMax: 360,
  };
}

export function getGyroSeries() {
  return [{
    name: 'Gyroscope (X)',
    type: 'areaspline',
    data: generateDefaultData(),
  },
  {
    name: 'Gyroscope (Y)',
    type: 'areaspline',
    data: generateDefaultData(),
  },
  {
    name: 'Gyroscope (Z)',
    type: 'areaspline',
    data: generateDefaultData(),
  }];
}

export function processGyroData(data) {
  return {
    events: {
      load() {
        const series = this.series;
        const intervalId = setInterval(() => { updateGyroData(data, series); }, 100);
        window.graphIntervals.push(intervalId);
      },
    },
  };
}

export function updateGyroData(data, series) {
  if (data) {
    const x = (new Date()).getTime();
    series[0].addPoint([x, data.gyroX], true, true, false);
    series[1].addPoint([x, data.gyroY], true, true, false);
    series[2].addPoint([x, data.gyroZ], true, true, false);
  }
}

export function getMagAxis() {
  return {
    title: {
      text: 'Gauss',
    },
    softMin: -0.5,
    softMax: 0.5,
  };
}

export function getMagSeries() {
  return [{
    name: 'Magnetometer (X)',
    type: 'areaspline',
    data: generateDefaultData(),
  },
  {
    name: 'Magnetometer (Y)',
    type: 'areaspline',
    data: generateDefaultData(),
  },
  {
    name: 'Magnetometer (Z)',
    type: 'areaspline',
    data: generateDefaultData(),
  }];
}

export function processMagData(data) {
  return {
    events: {
      load() {
        const series = this.series;
        const intervalId = setInterval(() => { updateMagData(data, series); }, 100);
        window.graphIntervals.push(intervalId);
      },
    },
  };
}

export function updateMagData(data, series) {
  if (data) {
    const x = (new Date()).getTime();
    series[0].addPoint([x, data.magX], true, true, false);
    series[1].addPoint([x, data.magY], true, true, false);
    series[2].addPoint([x, data.magZ], true, true, false);
  }
}

export function getRGBAxis() {

}

export function getRGBSeries() {
  
}

export function processRGBData(data) {
  return {
    events: {
      load() {
        const series = this.series;
        const intervalId = setInterval(() => {
          if (data) {
            const x = (new Date()).getTime();
            series[0].addPoint([x, data.colorR], true, true, false);
            series[1].addPoint([x, data.colorG], true, true, false);
            series[2].addPoint([x, data.colorB], true, true, false);
          }
        }, 100);
        window.graphIntervals.push(intervalId);
      },
    },
  };
}

export function getLUXAxis() {

}

export function getLUXSeries() {
  
}

export function processLUXData(data) {
  return {
    events: {
      load() {
        const series = this.series;
        const intervalId = setInterval(() => {
          if (data) {
            const x = (new Date()).getTime();
            series[0].addPoint([x, data.lux], true, true, false);
          }
        }, 100);
        window.graphIntervals.push(intervalId);
      },
    },
  };
}

export function getColorTempAxis() {

}

export function getColorTempSeries() {
  
}

export function processColorTempData(data) {
  return {
    events: {
      load() {
        const series = this.series;
        const intervalId = setInterval(() => {
          if (data) {
            const x = (new Date()).getTime();
            series[0].addPoint([x, data.colorTemp], true, true, false);
          }
        }, 100);
        window.graphIntervals.push(intervalId);
      },
    },
  };
}
