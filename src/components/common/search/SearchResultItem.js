import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Link from 'react-router-dom/Link';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';

const baseUrl = `${123}/media/`;

class SearchResultItem extends PureComponent {
  render() {
    const { item } = this.props;
    return (
      <div>
        <Link to={'/person/' + item.id}>
          <Paper>
            <Grid container spacing={24}>
              <Grid item xs={10}>
                <Grid item xs={2}>
                  <Avatar src={baseUrl + item.avatar} />
                </Grid>
                <Grid item xs={8}>
                  <Typography component="h3">{JSON.stringify(item)}</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Link>
      </div>
    );
  }
}

SearchResultItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string,
    displayName: PropTypes.string,
    avatar: PropTypes.string
  }).isRequired
};

export default SearchResultItem;
