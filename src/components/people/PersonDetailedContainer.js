import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

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

function PersonDetailedContainer(props) {
  const { classes, person } = props;

  return (
    <div>
      <Grid container spacing={8}>
        <Grid item md={3}>
          <Person detail={person} />
        </Grid>
        <Grid item md={9}>
          <Paper className={classes.paper}>
            <div>
              {person.manager ? (
                <div>
                  <div className={classes.actionPaper}>
                    <Typography variant="title" gutterBottom>
                      Manager
                    </Typography>
                    <Divider />
                  </div>
                  <div className={classes.children}>
                    <PersonC key={person.id} detail={person.manager} />
                  </div>
                </div>
              ) : null}

              {person.line && person.line.length !== 0 ? (
                <div>
                  <div className={classes.actionPaper}>
                    <Typography variant="title" gutterBottom>
                      Reporting Line
                    </Typography>
                    <Divider />
                  </div>
                  <div className={classes.children}>
                    {person.line.map(person => (
                      <PersonC key={person.id} detail={person} />
                    ))}
                  </div>
                </div>
              ) : null}

              {person.team && person.team.length !== 0 ? (
                <div>
                  <div className={classes.actionPaper}>
                    <Typography variant="title" gutterBottom>
                      Team
                    </Typography>
                    <Divider />
                  </div>
                  <div className={classes.children}>
                    {person.team.map(person => (
                      <PersonC key={person.id} detail={person} />
                    ))}
                  </div>
                </div>
              ) : null}

              {(!person.line || person.line.length === 0) &&
              (!person.team || person.team === 0) ? (
                <Typography variant="button" gutterBottom>
                  No Associations
                </Typography>
              ) : null}
            </div>
          </Paper>
          <Paper className={classes.paper}>
            <div>
              <div className={classes.actionPaper}>
                <Typography variant="title" gutterBottom>
                  Products
                </Typography>
                <Divider />
              </div>
              <ProductSummaryList products={person.products} />
            </div>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

PersonDetailedContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  person: PropTypes.object.isRequired
};

export default withStyles(styles)(PersonDetailedContainer);
