const setupProgressMeter = () => {
  console.log("solar magic");
  var progressElement = document.createElement("div");
  progressElement.id = "progressBar";
  progressElement.style.margin = "25px"
  document.getElementById('modelSpace').appendChild(progressElement);
  var progressBar = new ProgressBar.Line("#progressBar", {
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
};

document.addEventListener("DOMContentLoaded", function() {
  setupProgressMeter();
});
