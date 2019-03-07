import React from 'react';
import { object, bool } from 'prop-types';
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
import LocationCitySharp from '@material-ui/icons/LocationCitySharp';
import { EditAttributesSharp } from '@material-ui/icons/';
import Link from 'react-router-dom/Link';

import { personCardStyle } from '../../assets/jss';

import PersonCardImage from './PersonCardImage';

import EditProfile from './ProfileEditDialog';

const PersonCard = ({ classes, detail, update = false }) => (
  <div className={classes.root}>
    <Card className={classes.card}>
      <PersonCardImage detail={detail} mediaClass={classes.media} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h3">
          {`${detail.firstname}${
            detail.knownAs && detail.knownAs.trim().length > 0
              ? ` (${detail.knownAs}) `
              : ' '
          }${detail.lastname}`}
        </Typography>
        <List>
          {detail.title && (
            <ListItem>
              <Avatar>
                <WorkIcon />
              </Avatar>
              <ListItemText primary={detail.title} />
            </ListItem>
          )}
          {detail.email && (
            <ListItem>
              <Avatar>
                <Email />
              </Avatar>
              <ListItemText primary={detail.email} />
            </ListItem>
          )}
          {detail.mobile && detail.mobile !== '0' ? (
            <ListItem>
              <Avatar>
                <Phone />
              </Avatar>
              <ListItemText primary={detail.mobile} />
            </ListItem>
          ) : null}
          {detail.bio && (
            <ListItem>
              <Avatar>
                <Details />
              </Avatar>
              <ListItemText primary={detail.bio} />
            </ListItem>
          )}
          {detail.building.map((building, index) => (
            <ListItem key={index}>
              <Link
                key={index}
                to={'/building/' + building.name}
                style={{ textDecoration: 'none' }}
              >
                <Avatar>
                  <LocationCitySharp color="action" />
                </Avatar>
              </Link>
              <ListItemText primary={building.name} />
            </ListItem>
          ))}
          {/* <ListItem>
            <Avatar>
              <CalendarTodaySharp />
            </Avatar>
            <ListItemText secondary="Leave State" />
          </ListItem> */}
          {update && (
            <EditProfile detail={detail}>
              <ListItem>
                <Avatar>
                  <EditAttributesSharp color="action" />
                </Avatar>
                <ListItemText primary="Edit Profile" />
              </ListItem>
            </EditProfile>
          )}
        </List>
      </CardContent>
    </Card>
  </div>
);

PersonCard.propTypes = {
  classes: object.isRequired,
  detail: object.isRequired,
  update: bool
};

export default withStyles(personCardStyle)(PersonCard);
