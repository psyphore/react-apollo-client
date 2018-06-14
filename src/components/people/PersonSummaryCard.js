import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import OpenInBrowser from '@material-ui/icons/OpenInBrowser';
import ArrowForward from '@material-ui/icons/ArrowForward';
import { Link } from 'react-router-dom';

const styles = theme => ({
  card: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 151,
    height: 151,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
  },
  playIcon: {
    height: 38,
    width: 38,
  },
});

class PersonSummaryCard extends PureComponent {
  render() {
    const { classes, person } = this.props;

    return (
      <div>
        <Card className={classes.card}>
            <CardMedia
            className={classes.cover}
            image={person.avatar}
            title={person.firstname + ' ' + person.lastname}
          />
          <div className={classes.details}>
            <CardContent className={classes.content}>
              <Typography variant="headline">{person.firstname + ' ' + person.lastname}</Typography>
            </CardContent>
            <div className={classes.controls}>
                <Link to={"/person/"+person.firstname+"/"+person.lastname}>
                    <IconButton aria-label="Show More">
                        <OpenInBrowser className={classes.playIcon}/>
                    </IconButton>
                </Link>
                <Link to={"/person/"+person.firstname+"/"+person.lastname}>
                    <IconButton aria-label="Show More">
                        <ArrowForward className={classes.playIcon}/>
                    </IconButton>
                </Link>
            </div>
          </div>
        </Card>
      </div>
    );
  }
}

PersonSummaryCard.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(PersonSummaryCard);
