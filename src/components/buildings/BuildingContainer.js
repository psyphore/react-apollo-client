import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import './index.css';
import BuildingSummaryCard from './BuildingSummaryCard';

const styles = theme => ({
  root: {
    display: 'grid',
    gridGap: '5px',
    gridTemplateColumns: 'repeat(auto-fill, minmax(275px, 1fr))',
    gridAutoRows: '275px'
  },
  card: {
    margin: theme.spacing.unit
  }
});

class BuildingContainer extends PureComponent {
  render() {
    const { buildings, classes } = this.props;
    return (
      <div className={classes.root}>
        {buildings.map(building => (
          <BuildingSummaryCard key={building.id} building={building} />
        ))}
      </div>
    );
  }
}

BuildingContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  buildings: PropTypes.arrayOf(PropTypes.object).isRequired
};

const BuildingContainerComponent = withStyles(styles)(BuildingContainer);
export default BuildingContainerComponent;
