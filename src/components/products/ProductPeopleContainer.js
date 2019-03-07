import React, { Fragment } from 'react';
import { object } from 'prop-types';
import { withStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Link from 'react-router-dom/Link';
import { Typography } from '@material-ui/core';

// import PersonSummaryCard from '../people/PersonSummaryCard';
import PersonSummaryCard from '../people/PersonSummaryCard.1';

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

const ProductPeopleContainer = ({ product, classes }) => (
  <Fragment>
    <Grid
      container
      className={classes.root}
      spacing={8}
      justify="center"
      wrap="wrap"
    >
      <Grid item md={12}>
        <Typography variant="h5" component="h4">
          {product.name}
        </Typography>
        {/* <Typography variant="subheading" component="p">
          {product.description}
        </Typography> */}
        <Typography variant="caption" component="p">
          {'Head count: ' + product.championCount}
        </Typography>
      </Grid>
      <Grid item md={12}>
        <div className={classes.results}>
          {product.champions.map(person => (
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

ProductPeopleContainer.propTypes = {
  classes: object.isRequired,
  product: object.isRequired
};

export default withStyles(styles)(ProductPeopleContainer);
