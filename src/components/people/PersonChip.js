import React, {Component} from 'react'
import PropTypes from "prop-types";
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    padding: theme.spacing.unit / 2,
  },
  chip: {
    margin: theme.spacing.unit / 2,
  },
});

class PersonChip extends Component {
    
  render(){
    const { classes, onClick, detail } = this.props;
    
    return (
      <div>
        <Chip
        avatar={<Avatar size={32} src={detail.avatar} />}
        label={detail.firstname + " " + detail.lastname}
        onClick={onClick}
        className={classes.chip} />
      </div>
    );

  };
}

PersonChip.propTypes = {
  detail: PropTypes.instanceOf(PropTypes.object).isRequired,
  classes: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};

const PersonC = withStyles(styles)(PersonChip);
export default PersonC;
