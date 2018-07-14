import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { withApollo } from 'react-apollo';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Search from '@material-ui/icons/Search';

import { searchQuery } from '../../../graphql';
import SearchResultItem from './SearchResultItem';

class GraphQLSearch extends PureComponent {
  state = {
    query: '',
    result: []
  };

  _executeSearch = async () => {
    const { query } = this.state;
    const { client } = this.props;

    const result = await client.query({
      query: searchQuery,
      variables: { query: { query } }
    });
    const links = result.data.search.data;
    this.setState({ result: links });
  };

  render() {
    return (
      <div>
        <Grid container spacing={24}>
          <Grid item md={10}>
            <Grid item md={8}>
              <TextField
                id="full-width-search"
                label="Search"
                fullWidth
                helperText="search for person via title, first name, or last name"
                margin="normal"
                onChange={e => this.setState({ query: e.target.value })}
              />
            </Grid>
            <Grid item md={2}>
              <Button
                variant="fab"
                color="primary"
                aria-label="search"
                onClick={() => this._executeSearch()}
              >
                <Search />
              </Button>
            </Grid>
          </Grid>
          <Grid item md={10}>
            <ul>
              {this.state.result.map(res => (
                <li key={res.id}>
                  <SearchResultItem item={res} />
                </li>
              ))}
            </ul>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withApollo(GraphQLSearch);
