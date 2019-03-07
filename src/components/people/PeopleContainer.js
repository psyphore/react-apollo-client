import React from 'react';
import { object, arrayOf } from 'prop-types';
import { withStyles } from '@material-ui/core';

import PersonSummaryCard from './PersonSummaryCard';

import { PeopleContainerStyle } from '../../assets/jss';

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

export default withStyles(PeopleContainerStyle)(PeopleContainer);
