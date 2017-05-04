import React, { PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';

const ModelSwitcher = React.createClass({

  propTypes: {
    onSwitchModel: PropTypes.func.isRequired,
    onToggleAxis: PropTypes.func.isRequired,
  },

  render() {
    return ( 
      <div>
        <RaisedButton label="Switch Model" primary={true} onTouchTap={this.props.onSwitchModel}/>
        <RaisedButton label="Toggle Axis" primary={true} onTouchTap={this.props.onToggleAxis}/>
      </div>
    );
  },
});

export default ModelSwitcher;
