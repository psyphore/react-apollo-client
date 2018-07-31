import React from 'react';
import PropTypes from 'prop-types';
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

function PeopleContainer(props) {
  const { classes, people } = props;
  return (
    <div className={classes.root}>
      {people.map(person => (
        <PersonSummaryCard key={person.id} person={person} />
      ))}
    </div>
  );
}

PeopleContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  people: PropTypes.arrayOf(PropTypes.object).isRequired
};

const PeopleContainerComponent = withStyles(styles)(PeopleContainer);
export default PeopleContainerComponent;
