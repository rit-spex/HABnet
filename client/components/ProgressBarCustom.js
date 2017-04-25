import React from 'react';
import ProgressBar from '../utils/progressbar.min.js';

const ProgressBarCustom = React.createClass({
  componentDidMount() {
      this.setupProgressBar();
  },

  setupProgressBar() {
    this.div = document.createElement("div");
    this.div.id = "progressBar";
    this.div.style.margin = "25px";
    this.progressBar = new ProgressBar.Line(this.div, {
      easing: 'easeInOut',
      strokeWidth: 3,
      trailWidth: 1,
      duration: 100,
      trailColor: '#EEEEEE',
      svgStyle: {width: '100%', height: '100%'},
      from: {color: '#EA4531'},
      to: {color: '#e5ff00'},
      step: (state, bar) => {
        var val = (bar.value() * 100).toFixed(1);
        if(val >= 80) {
          bar.path.setAttribute('stroke', '#5dff00');
        } else {
          bar.path.setAttribute('stroke', state.color);
        }
        bar.setText(val);
      }
    });
    this.progressNode.appendChild(this.div);
  },

  render() {
    return (<div ref={(node) => { this.progressNode = node; }} />);
  },
});

export default ProgressBarCustom;
