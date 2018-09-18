import React, { Fragment } from 'react';
import { object } from 'prop-types';
import { withStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Link from 'react-router-dom/Link';
import { Typography } from '@material-ui/core';

import PersonSummaryCard from '../people/PersonSummaryCard';

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  results: {
    display: 'grid',
    gridGap: '5px',
    gridTemplateColumns: 'repeat(auto-fill, minmax(275px, 1fr))',
    gridAutoRows: '240px',
    alignItems: 'center',
    width: '100vw',
    maxWidth: '91vw',
    margin: '0 auto',
    [theme.breakpoints.down('md')]: { maxWidth: '85vw' },
    [theme.breakpoints.down('sm')]: { maxWidth: '95vw' }
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary
  },
  badge: {
    margin: theme.spacing.unit * 2,
    padding: `0 ${theme.spacing.unit * 2}px`
  }
});

const BuildingPersonContainer = ({ building, classes }) => (
  <Fragment>
    <Grid
      container
      className={classes.root}
      spacing={8}
      justify="center"
      wrap="wrap"
    >
      <Grid item md={12}>
        <Typography variant="headline" component="h4">
          {building.name}
        </Typography>
        <Typography variant="subheading" component="p">
          {building.address}
        </Typography>
        <Typography variant="caption" component="p">
          {'Head count: ' + building.headcount}
        </Typography>
      </Grid>
      <Grid item md={12}>
        <div className={classes.results}>
          {building.people.map(person => (
            <Link
              key={person.id}
              to={'/person/' + person.id}
              style={{ textDecoration: 'none' }}
            >
              <PersonSummaryCard person={person} />
            </Link>
          ))}
        </div>
      </Grid>
    </Grid>
  </Fragment>
);

BuildingPersonContainer.propTypes = {
  classes: object.isRequired,
  building: object.isRequired
};

export default withStyles(styles)(BuildingPersonContainer);
