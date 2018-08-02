import React from 'react';
import PropTypes from 'prop-types';
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
    textAlign: 'center'
  }
};

function PersonSummaryCard(props) {
  const { classes, person } = props;

  return (
    <div>
      <Card className={classes.card}>
        <PersonCardImage detail={person} mediaClass={classes.media} />
        <CardContent className={classes.cardContent}>
          <Typography gutterBottom variant="headline" component="h4">
            {person.firstname + ' ' + person.lastname}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

PersonSummaryCard.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  person: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(PersonSummaryCard);
