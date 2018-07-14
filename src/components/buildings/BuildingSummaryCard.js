import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import Badge from '@material-ui/core/Badge';
import Avatar from '@material-ui/core/Avatar';

const styles = theme => ({
  card: {
    maxWidth: 345
  },
  media: {
    height: 0,
    paddingTop: '56.25%' // 16:9
  },
  badge: {
    margin: theme.spacing.unit * 2,
    padding: `0 ${theme.spacing.unit * 2}px`
  },
  avatar: {
    margin: 10
  }
});

class BuildingSummaryCard extends PureComponent {
  render() {
    const { classes, building } = this.props;

    return (
      <div>
        <Link
          to={'/building/' + building.id}
          style={{ textDecoration: 'none' }}
        >
          <Badge
            color="primary"
            badgeContent={building.headcount}
            className={classes.badge.margin}
          >
            <Card className={classes.card}>
              {/* <CardMedia className={classes.media}
                  src={<Avatar className={classes.avatar}>H</Avatar>}
                /> */}
              <CardContent>
                <Typography gutterBottom variant="headline" component="h3">
                  {building.name}
                </Typography>
                <Typography variant="subheading" color="textSecondary">
                  {building.address}
                </Typography>
              </CardContent>
            </Card>
          </Badge>
        </Link>
      </div>
    );
  }
}

BuildingSummaryCard.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  building: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(BuildingSummaryCard);
