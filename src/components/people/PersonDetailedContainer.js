import React, { Fragment } from 'react';
import { object } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import Person from '../../components/people/PersonCard';
import ProductSummaryList from '../../components/products/ProductSummaryList';
import Team from './TeamList';

const styles = theme => ({
  root: {
    display: 'grid',
    gridGap: '5px',
    gridTemplateColumns: 'repeat(auto-fill, minmax(275px, 1fr))',
    gridAutoRows: '240px'
  },
  children: {
    display: 'grid',
    gridGap: '5px',
    gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
    gridAutoRows: '50px',
    alignContent: 'space-around',
    alignItems: 'center'
  },
  actionPaper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'left',
    color: theme.palette.text.secondary
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary
  }
});

const PersonDetailedContainer = ({ classes, person }) => (
  <Fragment>
    <Grid container spacing={8} wrap="wrap" justify="space-evenly">
      <Grid item md={3}>
        <Person detail={person} />
      </Grid>
      <Grid item md={9}>
        <Grid container spacing={8} wrap="wrap" justify="space-evenly">
          {person.manager ? (
            <Grid item md={3}>
              <Paper className={classes.paper}>
                <Team
                  title="Manager"
                  collection={[person.manager]}
                  classes={classes}
                />
              </Paper>
            </Grid>
          ) : null}
          {person.line && person.line.length !== 0 ? (
            <Grid item md={3}>
              <Paper className={classes.paper}>
                <Team
                  title="Reporting Line"
                  collection={person.line}
                  classes={classes}
                />
              </Paper>
            </Grid>
          ) : null}
          {person.team && person.team.length !== 0 ? (
            <Grid item md={3}>
              <Paper className={classes.paper}>
                <Team
                  title="My Team"
                  collection={person.team}
                  classes={classes}
                />
              </Paper>
            </Grid>
          ) : null}
          {person.products && person.products.length !== 0 ? (
            <Grid item md={3}>
              <Paper className={classes.paper}>
                <ProductSummaryList
                  products={person.products}
                  title="My Products"
                />
              </Paper>
            </Grid>
          ) : null}
        </Grid>
      </Grid>
    </Grid>
  </Fragment>
);

PersonDetailedContainer.propTypes = {
  classes: object.isRequired,
  person: object.isRequired
};

export default withStyles(styles)(PersonDetailedContainer);
