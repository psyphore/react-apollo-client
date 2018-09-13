import React, { PureComponent, Fragment } from 'react';
import { object } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import PersonContext from '../../HOC/personContext';
import Team from './TeamList';
import Person from '../../components/people/PersonCard';
import ProductSummaryList from '../../components/products/ProductSummaryList';
import { MessageList } from '../../components/notifications/NotificationContainer';
import { DontReadTheComments } from '../../components/notifications/NotesSubscriptions';

import { Lunch } from '../lunch';
// import { Leave } from '../leave';

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

class DetailPanel extends PureComponent {
  state = {
    expended: null
  };

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false
    });
  };

  render() {
    const { expanded } = this.state;
    const {
      classes: {
        DetailPanel: { root, heading }
      },
      title,
      subtitle,
      children
    } = this.props;

    return (
      <div className={root}>
        <ExpansionPanel
          expanded={expanded === title + ''.replace(/ +/g, '_')}
          onChange={this.handleChange(title)}
        >
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <span className={heading}>
              {title && (
                <Typography variant="title" component="h2">
                  {title}
                </Typography>
              )}
              {subtitle && (
                <Typography variant="caption" component="h6">
                  {subtitle}
                </Typography>
              )}
            </span>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>{children}</ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    );
  }
}

class ProfileContainer extends PureComponent {
  render() {
    const { classes, person, auth } = this.props;

    return (
      <Fragment>
        <PersonContext.Provider
          value={{ actions: {}, state: { person, auth } }}
        >
          <Grid container spacing={8} wrap="wrap" justify="space-evenly">
            <Grid item md={12}>
              <Paper className={classes.actionPaper}>
                <div className={classes.quickAction}>
                  <Lunch person={person} />
                  {/* <Leave person={person} /> */}
                </div>
              </Paper>
            </Grid>
            <Grid item md={3}>
              <Person detail={person} />
            </Grid>
            <Grid item md={9}>
              <Grid container spacing={8} wrap="wrap" justify="flex-start">
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
                  <Grid item md={4}>
                    <DetailPanel
                      classes={classes}
                      title="Reporting Line"
                      subtitle="The team I manage"
                    >
                      <Paper className={classes.paper}>
                        <Team
                          title="Reporting Line"
                          collection={person.line}
                          classes={classes}
                        />
                      </Paper>
                    </DetailPanel>
                  </Grid>
                ) : null}
                {person.team && person.team.length !== 0 ? (
                  <Grid item md={4}>
                    <DetailPanel
                      classes={classes}
                      title="My Team"
                      subtitle="The people I share the same manager with"
                    >
                      {/* <Paper className={classes.paper}> */}
                      <Team
                        title="My Team"
                        collection={person.team}
                        classes={classes}
                      />
                      {/* </Paper> */}
                    </DetailPanel>
                  </Grid>
                ) : null}
                {person.team && person.team.length !== 0 ? (
                  <Grid item md={4}>
                    <DetailPanel
                      classes={classes}
                      title="My Products"
                      subtitle="I know these products"
                    >
                      <Paper className={classes.paper}>
                        <ProductSummaryList
                          products={person.products}
                          title="My Products"
                        />
                      </Paper>
                    </DetailPanel>
                  </Grid>
                ) : null}
              </Grid>
              <Grid container spacing={8} wrap="wrap" justify="flex-start">
                <Grid item md={12}>
                  <DetailPanel
                    classes={classes}
                    title="Alerts"
                    subtitle="My notifications"
                  >
                    <Paper className={classes.actionPaper}>
                      <DontReadTheComments repoFullName="github.io" />
                    </Paper>
                  </DetailPanel>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </PersonContext.Provider>
      </Fragment>
    );
  }
}

ProfileContainer.propTypes = {
  classes: object.isRequired,
  person: object.isRequired
};

export default withStyles(styles)(ProfileContainer);
