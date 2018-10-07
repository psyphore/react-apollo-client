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
import { PhotoRounded } from '@material-ui/icons/';
import Link from 'react-router-dom/Link';
// import CalendarTodaySharp from '@material-ui/icons/CalendarTodaySharp';

import PersonCardImage from './PersonCardImage';
import { SharedFileManagerConsumer } from '../fileManager/FileManagerProvider';
import { UploadFile } from '../media';

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

const avatarUpdateCallback = e => {
  console.log(e);
  window.location.reload();
};

const PersonCard = ({ classes, detail, update = false }) => (
  <div className={classes.root}>
    <Card className={classes.card}>
      <PersonCardImage detail={detail} mediaClass={classes.media} />
      <CardContent>
        <Typography gutterBottom variant="headline" component="h3">
          {`${detail.firstname}${
            detail.knownAs ? ` (${detail.knownAs}) ` : ' '
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
          {update && (
            <SharedFileManagerConsumer>
              {value => (
                <UploadFile
                  parentId={detail.id}
                  label="Person"
                  callback={avatarUpdateCallback}
                  activate={update}
                >
                  <ListItem>
                    <Avatar>
                      <PhotoRounded color="action" />
                    </Avatar>
                    <ListItemText
                      primary="Update your avatar"
                      secondary="Click here or drop your file here. (.jpg and .png only)"
                    />
                  </ListItem>
                </UploadFile>
              )}
            </SharedFileManagerConsumer>
          )}
          {/* <ListItem>
            <Avatar>
              <CalendarTodaySharp />
            </Avatar>
            <ListItemText secondary="Leave State" />
          </ListItem> */}
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

const Person = withStyles(styles)(PersonCard);
export default Person;
