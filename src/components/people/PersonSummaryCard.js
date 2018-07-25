import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Person from '@material-ui/icons/Person';

const baseUrl = `${process.env.REACT_APP_GRAPHQL_URI}/media/`;

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

class PersonSummaryCard extends Component {
  render() {
    const { classes, person } = this.props;

    return (
      <div>
          <Card className={classes.card}>
            {person.avatar ? (
              <CardMedia
                className={classes.media}
                title={person.firstname + ' ' + person.lastname}
                image={baseUrl + person.avatar}
              />
            ) : (
              <Avatar
                className={classes.avatar}
                alt={person.firstname + ' ' + person.lastname}
              >
                <Person />
              </Avatar>
            )}
            <CardContent className={classes.cardContent}>
              <Typography gutterBottom variant="headline" component="h4">
                {person.firstname + ' ' + person.lastname}
              </Typography>
            </CardContent>
          </Card>
      </div>
    );
  }
}

PersonSummaryCard.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  person: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(PersonSummaryCard);
