import React from 'react';
import { object, arrayOf } from 'prop-types';
import { withStyles } from '@material-ui/core';

import PersonSummaryCard from './PersonSummaryCard';

const styles = theme => ({
  root: {
    display: 'grid',
    gridGap: '5px',
    gridTemplateColumns: 'repeat(auto-fill, minmax(275px, 1fr))',
    gridAutoRows: '240px',
    width: '100vw',
    maxWidth: '95vw',
    margin: '0 auto',
    [theme.breakpoints.down('md')]: { maxWidth: '85vw' },
    [theme.breakpoints.down('sm')]: { maxWidth: '95vw' }
  }
});

const PeopleContainer = ({ classes, people }) => (
  <div className={classes.root}>
    {people.map(person => (
      <PersonSummaryCard key={person.id} person={person} />
    ))}
  </div>
);

PeopleContainer.propTypes = {
  classes: object.isRequired,
  people: arrayOf(object).isRequired
};

export default withStyles(styles)(PeopleContainer);
