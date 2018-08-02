import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Phone from '@material-ui/icons/Phone';
import Email from '@material-ui/icons/Email';
import Details from '@material-ui/icons/Details';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import WorkIcon from '@material-ui/icons/Work';

import PersonCardImage from './PersonCardImage';

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
        <PersonCardImage detail={detail} mediaClass={classes.media} />
        <CardContent>
          <Typography gutterBottom variant="headline" component="h1">
            {detail.firstname + ' ' + detail.lastname}
          </Typography>
          <List>
            {detail.title ? (
              <ListItem>
                <Avatar>
                  <WorkIcon />
                </Avatar>
                <ListItemText primary={detail.title} />
              </ListItem>
            ) : null}
            {detail.email ? (
              <ListItem>
                <Avatar>
                  <Email />
                </Avatar>
                <ListItemText primary={detail.email} />
              </ListItem>
            ) : null}
            {detail.mobile || detail.mobile === '0' ? (
              <ListItem>
                <Avatar>
                  <Phone />
                </Avatar>
                <ListItemText primary={detail.mobile} />
              </ListItem>
            ) : null}
            {detail.bio ? (
              <ListItem>
                <Avatar>
                  <Details />
                </Avatar>
                <ListItemText primary={detail.bio} />
              </ListItem>
            ) : null}
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
