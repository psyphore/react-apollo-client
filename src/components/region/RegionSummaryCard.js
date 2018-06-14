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
  icon: {
    height: 38,
    width: 38
  }
});

class RegionSummaryCard extends PureComponent {
  render() {
    const { classes, region } = this.props;

    return (
      <div>
        <Card className={classes.card}>
          <div className={classes.details}>
            <CardContent className={classes.content}>
              <Typography variant="headline">
                {region.title}
              </Typography>
              <Typography variant="subheading" color="textSecondary">
                {region.address}
              </Typography>
            </CardContent>
            <div className={classes.controls}>
                <Typography className={classes.icon} 
                            variant="subheading" 
                            color="textSecondary">
                  {region.people.length}
                </Typography>
                <Link to={"/region/"+region.id}>
                    <IconButton aria-label="Show More">
                        <OpenInBrowser className={classes.icon}/>
                    </IconButton>
                </Link>
            </div>
          </div>
        </Card>
      </div>
    );
  }
}

RegionSummaryCard.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  region: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(RegionSummaryCard);
