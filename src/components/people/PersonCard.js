import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Phone from '@material-ui/icons/Phone';
import Email from '@material-ui/icons/Email';
import Details from '@material-ui/icons/Details';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import WorkIcon from '@material-ui/icons/Work';

const baseUrl = `${process.env.REACT_APP_GRAPHQL_URI}/media/`;

const styles = {
  root: {
    marginTop: '1%',
    marginLeft: '8%'
  },
  card: {
    maxWidth: 345
  },
  media: {
    height: 15,
    paddingTop: '56.25%' // 16:9
  }
};

function PersonCard(props) {
  const { classes, detail } = props;

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        {detail.avatar ? (
          <CardMedia
            className={classes.media}
            image={baseUrl + detail.avatar}
            title={detail.firstname + ' ' + detail.lastname}
          />
        ) : null}
        <CardContent>
          <Typography gutterBottom variant="headline" component="h1">
            {detail.firstname + ' ' + detail.lastname}
          </Typography>
          <List>
            <ListItem>
              <Avatar>
                <WorkIcon />
              </Avatar>
              <ListItemText primary={detail.title} />
            </ListItem>
            <ListItem>
              <Avatar>
                <Email />
              </Avatar>
              <ListItemText primary={detail.email} />
            </ListItem>
            <ListItem>
              <Avatar>
                <Phone />
              </Avatar>
              <ListItemText primary={detail.mobile} />
            </ListItem>
            <ListItem>
              <Avatar>
                <Details />
              </Avatar>
              <ListItemText primary={detail.bio} />
            </ListItem>
          </List>
        </CardContent>
      </Card>
    </div>
  );
}

PersonCard.propTypes = {
  classes: PropTypes.object.isRequired,
  detail: PropTypes.object.isRequired
};

const Person = withStyles(styles)(PersonCard);
export default Person;
