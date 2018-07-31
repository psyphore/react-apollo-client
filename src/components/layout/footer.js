import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import * as moment from 'moment';

const styles = theme => ({
  root: {
    flexGrow: 1
  }
});

function AppFooterBar(props){
  return(
    <div className={props.classes.root}>
        <Divider />
        <Typography variant="subheading" gutterBottom>
          {props.title + ' - '+ moment().format('YYYY')}
        </Typography>
      </div>
  )
}

AppFooterBar.propTypes = {
  title: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(AppFooterBar);
