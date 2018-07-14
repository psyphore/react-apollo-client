import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Search from '@material-ui/icons/Search';
import { Query } from 'react-apollo';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { searchQuery } from '../../../graphql';

const styles = theme => ({
  container: {
    display: 'flex',
    justifyContent: 'flext-start',
    flexWrap: 'wrap',
    flexGrow: 1
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    color: theme.palette.text.secondary
  }
});

const ranges = [
  {
    value: 'BUILDING',
    label: 'Branch'
  },
  {
    value: 'PERSON',
    label: 'Person'
  }
];

const SearchResults = ({ q }) => (
  <Query query={searchQuery} variables={{ q }} notifyOnNetworkStatusChange ssr>
    {({ loading, error, data, refetch, networkStatus }) => {
      if (networkStatus === 4) return 'Refetching!';
      if (loading) return null;
      if (error) return `Error!: ${error}`;

      <div>
        {data.search && (
          <Grid item md={12}>
            <Paper>
              {data.search.count > 0 ? (
                data.search.map((item, index) => {
                  <p key={index}>JSON.stringify({item});</p>;
                })
              ) : (
                <Typography component="h4">No result</Typography>
              )}
            </Paper>
          </Grid>
        )}
      </div>;
    }}
  </Query>
);

const SearchForm = ({ q, handleChange }) => (
  <div>
    <Grid item lg={12}>
      <Grid item xs={4}>
        <TextField
          id="full-width-search"
          label="Search"
          fullWidth
          margin="normal"
          onChange={handleChange('query')}
          value={q.query}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          select
          label="Search Criteria"
          value={q.criteria}
          onChange={handleChange('criteria')}
          fullWidth
          margin="normal"
        >
          {ranges.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid item xs={2}>
        <Button
          variant="fab"
          color="primary"
          aria-label="search"
          onClick={this.handleSeach}
        >
          <Search />
        </Button>
      </Grid>
    </Grid>
  </div>
);

class GenericSearch extends PureComponent {
  state = { query: null, criteria: null, result: null };

  onDogSelected = ({ target }) => {
    this.setState(() => ({ selectedDog: target.value }));
  };

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value, result: {} });
  };

  handleSeach = client => {
    let { query, criteria } = this.state;
    let q = {
      query: searchQuery,
      variables: { query: { query: query, criteria: criteria } }
    };
  };

  render() {
    return (
      <div>
        <Grid container spacing={24}>
          <SearchForm
            onChange={this.handleChange}
            onSearch={this.handleSeach}
          />
          {this.state.result && <SearchResults r={this.state.result} />}
        </Grid>
      </div>
    );
  }
}

GenericSearch.propTypes = {
  classes: PropTypes.object
};

export default withStyles(styles)(GenericSearch);
