import React from 'react';
import { object } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Link from 'react-router-dom/Link';
import Button from '@material-ui/core/Button';
import Search from '@material-ui/icons/Search';

import Tooltip from '../tooltip';

import { personProfilebuttonStyle } from '../../assets/jss';

const SearchButton = ({ classes }) => (
  <div className={classes.row}>
    <Tooltip title="Search" placement="top">
      <Button component={Link} to="/search" variant="fab" color="secondary">
        <Search />
      </Button>
    </Tooltip>
  </div>
);

SearchButton.propTypes = {
  classes: object
};

export default withStyles(personProfilebuttonStyle)(SearchButton);
