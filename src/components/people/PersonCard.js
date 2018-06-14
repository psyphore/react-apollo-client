import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = {
  card: {
    maxWidth: 345,
  },
  media: {
    height: 15,
    paddingTop: '56.25%', // 16:9
  },
};

class PersonCard extends PureComponent {
  render() {
    const { classes, detail } = this.props;

    return (
    <div>
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image={detail.avatar}
          title={detail.firstname + ' ' + detail.lastname}
          >
        </CardMedia>
        <CardContent>
          <Typography gutterBottom variant="headline" component="h1">
            {detail.firstname + ' ' + detail.lastname}
          </Typography>
          <Typography component="h2">
            {detail.title}
          </Typography>
          <Typography component="h3">
            {detail.mobile}
          </Typography>
          <Typography component="h3">
            {detail.email}
          </Typography>
          <Typography component="h3">
            {detail.bio}
          </Typography>
        </CardContent>
        <CardActions>>
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
};

const Person = withStyles(styles)(PersonCard);
export default Person;
