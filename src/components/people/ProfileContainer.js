import React, { PureComponent } from 'react';
import { object } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import { PersonContext } from '../../HOC';

import Team from './TeamList';
import PersonCard from './PersonCard.1';
import ProductSummaryList from '../products/ProductSummaryList';
import DetailPanel from '../panel';
import { DontReadTheComments } from '../../components/notifications/NotesSubscriptions';
import { Lunch } from '../lunch';
import { profileContainerStyle } from '../../assets/jss';

const ExtraTeamInformation = ({ classes, person, refetch }) => (
  <Grid item xs={12} sm={12} md={7} className={classes.gridItemStyle}>
    <Grid container className={classes.gridContainerStyle} spacing={8}>
      <MyActions person={person} classes={classes} onClick={e => refetch()} />
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
          <DetailPanel
            classes={classes}
            title="My Products"
            subtitle="I know these products"
          >
            <ProductSummaryList title="" products={person.products} />
          </DetailPanel>
        </Grid>
      )}
      {person.line && person.line.length !== 0 && (
        <Grid item xs={12} sm={12} md={12} className={classes.gridItemStyle}>
          <DetailPanel
            classes={classes}
            title="Reporting Line"
            subtitle="The team I manage"
          >
            <Paper className={classes.paper}>
              <Team title="" collection={person.line} classes={classes} />
            </Paper>
          </DetailPanel>
        </Grid>
      )}
      {person.team && person.team.length !== 0 && (
        <Grid item xs={12} sm={12} md={12} className={classes.gridItemStyle}>
          <DetailPanel
            classes={classes}
            title="My Team"
            subtitle="The people I share the same manager with"
          >
            <Team title="" collection={person.team} classes={classes} />
          </DetailPanel>
        </Grid>
      )}
    </Grid>
    <MySubscriptions classes={classes} />
  </Grid>
);

const MyActions = ({ classes, person }) => (
  <Grid item xs={12} sm={12} md={12} className={classes.gridItemStyle}>
    <Paper className={classes.actionPaper}>
      <div className={classes.quickAction}>
        <Lunch person={person} />
      </div>
    </Paper>
  </Grid>
);

const MySubscriptions = ({
  classes: { gridContainerStyle, gridItemStyle }
}) => (
  <Grid container className={gridContainerStyle} spacing={8}>
    <Grid item xs={12} sm={12} md={12} className={gridItemStyle}>
      <DontReadTheComments repoFullName="psyphore.github.io" />
    </Grid>
  </Grid>
);

const MyProfile = ({ classes: { gridItemStyle }, person }) => (
  <Grid item xs={12} sm={12} md={4} className={gridItemStyle}>
    <PersonCard detail={person} update={true} />
  </Grid>
);

class ProfileContainer extends PureComponent {
  static contextType = PersonContext;

  render() {
    const { classes, person, refetch } = this.props;
    return (
      <Grid
        container
        className={classes.gridContainerStyle}
        spacing={8}
        justify="center"
      >
        <ExtraTeamInformation
          person={person}
          classes={classes}
          refetch={refetch}
        />
        <MyProfile person={person} classes={classes} />
      </Grid>
    );
  }
}

ProfileContainer.propTypes = {
  classes: object.isRequired,
  person: object
};

export default withStyles(profileContainerStyle)(ProfileContainer);
