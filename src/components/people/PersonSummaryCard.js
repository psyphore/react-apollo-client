import React from 'react';
import { object } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import PersonCardImage from './PersonCardImage';

import { personSummaryCardStyle } from '../../assets/jss';

const PersonSummaryCard = ({ classes, person }) => (
  <Card className={classes.card}>
    <PersonCardImage detail={person} mediaClass={classes.media} />
    <CardContent className={classes.cardContent}>
      <Typography gutterBottom variant="h6">
        {person.firstname + ' ' + person.lastname}
      </Typography>
    </CardContent>
  </Card>
);

PersonSummaryCard.propTypes = {
  classes: object.isRequired,
  theme: object.isRequired,
  person: object.isRequired
};

export default withStyles(personSummaryCardStyle, { withTheme: true })(
  PersonSummaryCard
);
