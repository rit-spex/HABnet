import React, { PropTypes } from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import NewChartDrawer from './NewChartDrawer';

const ChartManager = React.createClass({
  propTypes: {
    handleCreateChart: PropTypes.func.isRequired,
    availableDataSources: PropTypes.array.isRequired,
    charts: PropTypes.array.isRequired,
    onRemoveChart: PropTypes.func.isRequired,
  },

  getInitialState() {
    return {
      open: false,
    };
  },

  handleOpenChartManager(isOpen = true) {
    this.setState({
      open: isOpen,
    });
  },

  render() {
    const { open } = this.state;
    const { availableDataSources, handleCreateChart, charts, onRemoveChart } = this.props;
    return (
      <div>
        <NewChartDrawer
          open={open}
          handleOpen={this.handleOpenChartManager}
          availableDataSources={availableDataSources}
          handleCreateChart={handleCreateChart}
          charts={charts}
          onRemoveChart={onRemoveChart}
          />
        <FloatingActionButton
          className="add-chart"
          onTouchTap={this.handleOpenChartManager}
        >
          <ContentAdd />
        </FloatingActionButton>
      </div>
    );
  },
});

export default ChartManager;
