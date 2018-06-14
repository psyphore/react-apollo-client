import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import Search from '../common/Search';
import PersonSummaryCard from './PersonSummaryCard';

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

class PeopleContainer extends PureComponent {
    render() {
        const { classes, people } = this.props;
        return (
            <div>
                <Grid container spacing={24}>
                    <Grid item xs={12}>
                        <Paper>
                            <Search collection={people} />
                        </Paper>
                    </Grid>
                    <Grid item xs={12} className={classes.root}>
                    {people.map(
                    (person) => (<div className={classes.chip}>
                        <PersonSummaryCard key={person.id} person={person} />
                    </div>)
                    )}
                    </Grid>
                </Grid>
            </div>
        );
    }
}

PeopleContainer.propTypes = {
    classes: PropTypes.object.isRequired,
    people: PropTypes.arrayOf(PropTypes.object).isRequired
};

const PeopleContainerComponent = withStyles(styles)(PeopleContainer);
export default PeopleContainerComponent;