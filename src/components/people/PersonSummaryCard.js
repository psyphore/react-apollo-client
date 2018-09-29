import React from 'react';
import { object } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import PersonCardImage from './PersonCardImage';

const styles = {
  card: {
    maxWidth: 345
  },
  media: {
    height: 0,
    paddingTop: '56.25%' // 16:9
  },
  avatar: {
    left: '50%'
  },
  cardContent: {
    textAlign: 'left',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  }
};

const PersonSummaryCard = ({ classes, person }) => (
  <Card className={classes.card}>
    <PersonCardImage detail={person} mediaClass={classes.media} />
    <CardContent className={classes.cardContent}>
      <Typography gutterBottom variant="headline" component="h4">
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

export default withStyles(styles, { withTheme: true })(PersonSummaryCard);
