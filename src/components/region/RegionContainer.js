import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import RegionSummaryCard from './RegionSummaryCard';
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

class RegionContainer extends PureComponent {
    render() {
        const { classes, regions } = this.props;
        return (
            <div>
                <Grid container spacing={24}>
                    <Grid item xs={12}>
                        <Paper>
                            <GenericSearch collection={regions} action={()=>{}} />
                        </Paper>
                    </Grid>
                    <Grid item xs={12} className={classes.root}>
                    {regions.map(
                    (region) => (<div className={classes.chip}>
                        <RegionSummaryCard key={region.id} 
                                           region={region} />
                    </div>)
                    )}
                    </Grid>
                </Grid>
            </div>
        );
    }
}

RegionContainer.propTypes = {
    classes: PropTypes.object.isRequired,
    regions: PropTypes.arrayOf(PropTypes.object).isRequired
};

const PeopleContainerComponent = withStyles(styles)(RegionContainer);
export default PeopleContainerComponent;