import React from 'react';
import { object } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Link from 'react-router-dom/Link';
import Fab from '@material-ui/core/Fab';
import Search from '@material-ui/icons/Search';

import Tooltip from '../tooltip';

import { personProfilebuttonStyle } from '../../assets/jss';

const SearchButton = ({ classes }) => (
  <div className={classes.row}>
    <Tooltip title="Search" placement="top">
      <Fab component={Link} to="/search" color="secondary">
        <Search />
      </Fab>
    </Tooltip>
  </div>
);

SearchButton.propTypes = {
  classes: object
};

export default withStyles(personProfilebuttonStyle)(SearchButton);
