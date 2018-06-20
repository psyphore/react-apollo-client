import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import OpenInBrowser from '@material-ui/icons/OpenInBrowser';
import { Link } from 'react-router-dom';

const styles = theme => ({
  card: {
    display: 'flex',
    maxWidth: 275,
    maxHeight: 275
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
  headCount: {
    height: 38,
    width: 120
  },
  icon: {
    height: 38,
    width: 38
  }
});

class BuildingSummaryCard extends PureComponent {
  render() {
    const { classes, theme, building } = this.props;

    return (
      <div>
        <Card className={classes.card}>
          <div className={classes.details}>
            <CardContent className={classes.content}>
              <Typography variant="headline">
                {building.name}
              </Typography>
              <Typography variant="subheading" color="textSecondary">
                {building.address}
              </Typography>
            </CardContent>
            <div className={classes.controls}>
                <Typography className={classes.headCount} 
                            variant="subheading" 
                            color="textSecondary">
                  Head Count: {building.headcount}
                </Typography>
                <Typography>
                  <Link to={"/building/"+building.id}>
                      <IconButton aria-label="Show More">
                          <OpenInBrowser className={classes.icon}/>
                      </IconButton>
                  </Link>
                </Typography>
            </div>
          </div>
        </Card>
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
