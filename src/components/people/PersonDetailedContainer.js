import React, { Fragment } from 'react';
import { object } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import Person from '../people/PersonCard';
import ProductSummaryList from '../products/ProductSummaryList';
import Team from './TeamList';

import { personDetailedContainerStyle } from '../../assets/jss';

const PersonTeams = ({ person, classes }) => (
  <Fragment>
    {person.manager && (
      <Grid item xs={12} sm={12} md={6} className={classes.gridItemStyle}>
        <Paper className={classes.paper}>
          <Team
            title="Manager"
            collection={[person.manager]}
            classes={classes}
          />
        </Paper>
      </Grid>
    )}
    {person.products && person.products.length !== 0 && (
      <Grid item xs={12} sm={12} md={6} className={classes.gridItemStyle}>
        <Paper className={classes.paper}>
          <ProductSummaryList products={person.products} title="My Products" />
        </Paper>
      </Grid>
    )}
    {person.line && person.line.length !== 0 && (
      <Grid item xs={12} sm={12} md={12} className={classes.gridItemStyle}>
        <Paper className={classes.paper}>
          <Team
            title="Reporting Line"
            collection={person.line}
            classes={classes}
          />
        </Paper>
      </Grid>
    )}
    {person.team && person.team.length !== 0 && (
      <Grid item xs={12} sm={12} md={12} className={classes.gridItemStyle}>
        <Paper className={classes.paper}>
          <Team title="My Team" collection={person.team} classes={classes} />
        </Paper>
      </Grid>
    )}
  </Fragment>
);

const PersonDetailedContainer = ({ classes, person }) => (
  <Grid
    container
    className={classes.gridContainerStyle}
    spacing={8}
    justify="center"
  >
    <Grid item xs={12} sm={12} md={4} className={classes.gridItemStyle}>
      <Person detail={person} />
    </Grid>
    <Grid item xs={12} sm={12} md={7} className={classes.gridItemStyle}>
      <Grid container className={classes.gridContainerStyle} spacing={8}>
        <PersonTeams person={person} classes={classes} />
      </Grid>
    </Grid>
  </Grid>
);

PersonDetailedContainer.propTypes = {
  classes: object.isRequired,
  person: object.isRequired
};

export default withStyles(personDetailedContainerStyle)(
  PersonDetailedContainer
);
