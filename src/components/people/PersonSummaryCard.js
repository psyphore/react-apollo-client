import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

const baseUrl = `${process.env.REACT_APP_GRAPHQL_URI}/media/`;

const styles = {
  card: {
    maxWidth: 345
  },
  media: {
    height: 0,
    paddingTop: '56.25%' // 16:9
  }
};

class PersonSummaryCard extends Component {
  render() {
    const { classes, person } = this.props;

    return (
      <div>
        <Link to={'/person/' + person.id} style={{ textDecoration: 'none' }}>
          <Card className={classes.card}>
            <CardMedia
              className={classes.media}
              image={person.avatar ? baseUrl + person.avatar : null}
              title={person.firstname + ' ' + person.lastname}
            />
            <CardContent>
              <Typography gutterBottom variant="headline" component="h4">
                {person.firstname + ' ' + person.lastname}
              </Typography>
            </CardContent>
          </Card>
        </Link>
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
