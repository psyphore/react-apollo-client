import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
// import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import OpenInBrowser from '@material-ui/icons/OpenInBrowser';
import ArrowForward from '@material-ui/icons/ArrowForward';
import { Link } from 'react-router-dom';

const styles = theme => ({
  card: {
    display: 'flex'
  },
  details: {
    display: 'flex',
    flexDirection: 'column'
  },
  content: {
    flex: '1 0 auto'
  },
  cover: {
    width: 151,
    height: 151
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing.unit,
    paddingBottom: theme.spacing.unit
  },
  playIcon: {
    height: 38,
    width: 38
  }
});

class BuildingDetailedCard extends PureComponent {
  render() {
    const { classes, theme, building } = this.props;

    return (
      <div>
        <Card className={classes.card}>
          <div className={classes.details}>
            <CardContent className={classes.content}>
              <Typography variant="h5">{building.name}</Typography>
            </CardContent>
            <div className={classes.controls}>
              <Link to={'/building/' + building.id}>
                <IconButton aria-label="Show More">
                  <OpenInBrowser className={classes.playIcon} />
                </IconButton>
              </Link>
              <Link to={'/building/' + building.id}>
                <IconButton aria-label="Show More">
                  <ArrowForward className={classes.playIcon} />
                </IconButton>
              </Link>
            </div>
          </div>
        </Card>
      </div>
    );
  }
}

BuildingDetailedCard.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  building: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(BuildingDetailedCard);
