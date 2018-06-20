import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import BuildingSummaryCard from './BuildingSummaryCard';
import GenericSearch from '../common/GenericSearch';

const styles = theme => ({
    root: {
      display: 'flex',
      justifyContent: 'flex-start',
      alignContent: 'flex-start',
      flexWrap: 'wrap',
    },
    chip: {
      margin: theme.spacing.unit,
    },
  });

class BuildingContainer extends PureComponent {
    render() {
        const { classes, buildings } = this.props;
        return (
            <div>
                <Grid container spacing={24}>
                    <Grid item xs={12}>
                        <Paper>
                            {/* <GenericSearch collection={buildings} action={()=>{}} /> */}
                        </Paper>
                    </Grid>
                    <Grid item xs={12} className={classes.root}>
                    {buildings.map(
                    (building) => (<div className={classes.chip}>
                        <BuildingSummaryCard key={building.id} 
                                           building={building} />
                    </div>)
                    )}
                    </Grid>
                </Grid>
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