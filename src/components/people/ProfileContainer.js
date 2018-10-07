import React, { PureComponent } from 'react';
import { object } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import PersonContext from '../../HOC/personContext';
import Team from './TeamList';
import Person from '../people/PersonCard';
import ProductSummaryList from '../products/ProductSummaryList';
import DetailPanel from '../panel';

import { DontReadTheComments } from '../../components/notifications/NotesSubscriptions';

import { Lunch } from '../lunch';

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
    alignItems: 'start'
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
  },
  quickAction: {
    display: 'flex',
    flex: 1
  },
  DetailPanel: {
    root: {
      width: '100%'
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      flexBasis: '33.33%',
      flexShrink: 0
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary
    }
  }
});

class ProfileContainer extends PureComponent {
  render() {
    const { classes, person, auth } = this.props;
    const { Provider } = PersonContext;
    return (
      <Provider value={{ actions: {}, state: { person, auth } }}>
        <Grid container spacing={8} wrap="wrap" justify="space-evenly">
          <Grid item md={12}>
            <Paper className={classes.actionPaper}>
              <div className={classes.quickAction}>
                <Lunch person={person} />
              </div>
            </Paper>
          </Grid>
          <Grid item md={3}>
            <Person detail={person} update={true} />
          </Grid>
          <Grid item md={9}>
            <Grid container spacing={8} wrap="wrap" justify="flex-start">
              {person.manager && (
                <Grid item md={3}>
                  <Paper className={classes.paper}>
                    <Team
                      title="Manager"
                      collection={[person.manager]}
                      classes={classes}
                    />
                  </Paper>
                </Grid>
              )}
              {person.line &&
                person.line.length !== 0 && (
                  <Grid item md={4}>
                    <DetailPanel
                      classes={classes}
                      title="Reporting Line"
                      subtitle="The team I manage"
                    >
                      <Paper className={classes.paper}>
                        <Team
                          title=""
                          collection={person.line}
                          classes={classes}
                        />
                      </Paper>
                    </DetailPanel>
                  </Grid>
                )}
              {person.team &&
                person.team.length !== 0 && (
                  <Grid item md={4}>
                    <DetailPanel
                      classes={classes}
                      title="My Team"
                      subtitle="The people I share the same manager with"
                    >
                      <Team
                        title=""
                        collection={person.team}
                        classes={classes}
                      />
                    </DetailPanel>
                  </Grid>
                )}
              {person.products &&
                person.products.length !== 0 && (
                  <Grid item md={4}>
                    <DetailPanel
                      classes={classes}
                      title="My Products"
                      subtitle="I know these products"
                    >
                      <ProductSummaryList title="" products={person.products} />
                    </DetailPanel>
                  </Grid>
                )}
            </Grid>
            <Grid container spacing={8} wrap="wrap" justify="flex-start">
              <Grid item md={4}>
                <DontReadTheComments repoFullName="psyphore.github.io" />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Provider>
    );
  }
}

ProfileContainer.propTypes = {
  classes: object.isRequired,
  person: object.isRequired
};

export default withStyles(styles)(ProfileContainer);
