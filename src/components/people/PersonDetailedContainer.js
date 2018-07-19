import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import Person from '../../components/people/PersonCard';
import PersonC from '../../components/people/PersonChip';
import ProductSummaryList from '../../components/products/ProductSummaryCard';

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
    alignContent: 'space-evenly',
    alignItems: 'center'
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'right',
    color: theme.palette.text.secondary
  }
});

class PersonDetailedContainer extends Component {
  render() {
    const { classes, person } = this.props;

    return (
      <div>
        <Grid container spacing={8}>
          {/* <Grid item md={12}>
            <Paper className={classes.paper}>
              <Typography component="subheading">
                {person.firstname + ' ' + person.lastname}
              </Typography>
            </Paper>
          </Grid> */}
          <Grid item md={3}>
            <Paper className={classes.paper}>
              <Person detail={person} />
            </Paper>
          </Grid>
          <Grid item md={9}>
            <Paper className={classes.paper}>
              <div className={classes.children}>
                {person.line
                  ? person.line.map(person => (
                      <PersonC key={person.id} detail={person} />
                    ))
                  : null}
                {person.team
                  ? person.team.map(person => (
                      <PersonC key={person.id} detail={person} />
                    ))
                  : null}
                {(!person.line || person.line.length === 0) &&
                (!person.team || person.team === 0) ? (
                  <Typography variant="subheading">No Associations</Typography>
                ) : null}
              </div>
            </Paper>
            <Paper className={classes.paper}>
              <div className={classes.childrenx}>
                <ProductSummaryList products={person.products} />
              </div>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

PersonDetailedContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  person: PropTypes.object.isRequired
};

export default withStyles(styles)(PersonDetailedContainer);
