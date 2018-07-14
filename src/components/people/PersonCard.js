import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Title from '@material-ui/icons/Title';
import Phone from '@material-ui/icons/Phone';
import Email from '@material-ui/icons/Email';
import Details from '@material-ui/icons/Details';

const baseUrl = `${process.env.REACT_APP_GRAPHQL_URI}/media/`;

const styles = {
  root: {
    marginTop: '1%',
    marginLeft: '1%'
  },
  card: {
    maxWidth: 345
  },
  media: {
    height: 15,
    paddingTop: '56.25%' // 16:9
  }
};

class PersonCard extends Component {
  render() {
    const { classes, detail } = this.props;

    return (
      <div className={classes.root}>
        <Card className={classes.card}>
          <CardMedia
            className={classes.media}
            image={detail.avatar ? baseUrl + detail.avatar : null}
            title={detail.firstname + ' ' + detail.lastname}
          />
          <CardContent>
            <Typography gutterBottom variant="headline" component="h1">
              {detail.firstname + ' ' + detail.lastname}
            </Typography>
            {detail.title ? (
              <Typography
                variant="subheading"
                color="textSecondary"
                component="h2"
              >
                <Title />
                {detail.title}
              </Typography>
            ) : null}
            {detail.mobile ? (
              <Typography
                variant="subheading"
                color="textSecondary"
                component="h3"
              >
                <Phone /> {detail.mobile}
              </Typography>
            ) : null}
            {detail.email ? (
              <Typography
                variant="subheading"
                color="textSecondary"
                component="h3"
              >
                <Email /> {detail.email}
              </Typography>
            ) : null}
            {detail.bio ? (
              <Typography
                variant="subheading"
                color="textSecondary"
                component="h3"
              >
                <Details /> {detail.bio}
              </Typography>
            ) : null}
          </CardContent>
          <CardActions>
            <Button size="small" color="primary">
              Show More
            </Button>
          </CardActions>
        </Card>
      </div>
    );
  }
}

PersonCard.propTypes = {
  classes: PropTypes.object.isRequired,
  detail: PropTypes.object.isRequired
};

const Person = withStyles(styles)(PersonCard);
export default Person;
