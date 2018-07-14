import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import './index.css';
import PersonSummaryCard from './PersonSummaryCard';

const styles = theme => ({
  root: {
    display: 'grid',
    gridGap: '5px',
    gridTemplateColumns: 'repeat(auto-fill, minmax(275px, 1fr))',
    gridAutoRows: '240px'
  },
  card: {
    margin: theme.spacing.unit
  }
});

class PeopleContainer extends PureComponent {
  render() {
    const { classes, people } = this.props;
    return (
      <div className={classes.root}>
        {people.map(person => (
          <PersonSummaryCard key={person.id} person={person} />
        ))}
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
