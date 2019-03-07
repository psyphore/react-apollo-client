import React, { PureComponent, Fragment } from 'react';
import { Query } from 'react-apollo';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Search from '@material-ui/icons/Search';
import Link from 'react-router-dom/Link';
import dayJS from 'dayjs';
import { Typography } from '@material-ui/core';

import { searchStyle } from '../../assets/jss';

import { searchQuery } from '../../graphql';
// import PersonSummaryCard from '../people/PersonSummaryCard';
import PersonSummaryCard from '../people/PersonSummaryCard.1';
import { Loader, ErrorBoundary } from '../index';

const SearchInput = ({
  classes: { paper, text },
  actions: { search, change, clear },
  state: { fetching, count, lapsedTime, query },
  mutator
}) => (
  <div className={paper}>
    <Grid container justify="center" wrap="wrap" spacing={8}>
      <Grid item xs={8} sm={8} md={8}>
        <TextField
          autoFocus
          disabled={fetching}
          fullWidth
          helperText="Search for person via title, first name, last name, branch name, branch address, product name."
          id="full-width-search"
          label="Search"
          margin="normal"
          onChange={e => change(e.target.value)}
          onKeyPress={e => (e.key === 'Enter' ? search(mutator) : null)}
          onFocusCapture={() => clear()}
          value={query}
          required
        />
      </Grid>
      <Grid item xs={2} sm={2} md={2}>
        <Button
          aria-label="search"
          color="primary"
          disabled={fetching}
          onClick={() => search(mutator)}
          variant="fab"
        >
          <Search />
        </Button>
      </Grid>
      <Grid item xs={12} sm={12} md={12}>
        {fetching && <Loader />}
        {count && (
          <div className={text}>
            <Typography variant="caption">
              Results Found {count} in {lapsedTime} seconds.
            </Typography>
          </div>
        )}
      </Grid>
    </Grid>
  </div>
);

const SearchResult = ({ classes, state: { result, lapsedTime } }) => {
  return (
    <Fragment>
      {result && result.length ? (
        <div className={classes.results}>
          {result.map(res => (
            <Link
              key={res.id}
              to={'/person/' + res.id}
              style={{ textDecoration: 'none' }}
            >
              <PersonSummaryCard person={res} />
            </Link>
          ))}
        </div>
      ) : lapsedTime ? (
        <div className={classes.text}>
          <Typography variant="caption">No Results Found.</Typography>
        </div>
      ) : null}
    </Fragment>
  );
};

class GraphQLSearch extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      first: 100,
      offset: 0,
      result: null,
      count: null,
      fetching: false,
      lapsedTime: null,
      errors: null
    };

    this._reset = this._reset.bind(this);
    this._executeSearch = this._executeSearch.bind(this);
    this._handleInputChange = this._handleInputChange.bind(this);
    this._handleInputClear = this._handleInputClear.bind(this);
  }

  _reset = () => {
    this.setState({
      first: 99999,
      offset: 0,
      result: null,
      count: null,
      fetching: false,
      lapsedTime: null,
      errors: null
    });
  };

  _executeSearch = async mutator => {
    const { query, first, offset } = this.state;

    let duration = dayJS();

    this._reset();

    if (query && query.length === 0) {
      this.setState({
        errors: [{ message: 'Missing search query...' }]
      });
      return;
    }

    this.setState({
      fetching: true
    });

    const { data, errors } = await mutator({
      query: searchQuery,
      variables: { query: { query, first, offset } }
    });

    let diff = dayJS().diff(duration, 'second', true);

    if (errors) {
      this.setState({
        errors: errors,
        fetching: false,
        lapsedTime: diff
      });
      return;
    }

    if (data) {
      this.setState({
        result: data.search.data,
        count: data.search.count,
        fetching: false,
        lapsedTime: diff
      });
    }
  };

  _handleInputChange = value => {
    this.setState({ query: value });
  };

  _handleInputClear = () => {
    this.setState({ query: '' });
  };

  render() {
    const { classes } = this.props;
    const actions = {
      reset: this._reset,
      search: this._executeSearch,
      change: this._handleInputChange,
      clear: this._handleInputClear
    };

    return (
      <Query query={searchQuery} skip={true}>
        {({ client: { query } }) => (
          <ErrorBoundary>
            <Grid
              container
              className={classes.root}
              spacing={8}
              justify="center"
              wrap="wrap"
            >
              <Grid item xs={12} sm={12} md={12}>
                <SearchInput
                  actions={actions}
                  classes={classes}
                  state={this.state}
                  mutator={query}
                />
              </Grid>

              <Grid item xs={12} sm={12} md={12}>
                <SearchResult classes={classes} state={this.state} />
              </Grid>
            </Grid>
          </ErrorBoundary>
        )}
      </Query>
    );
  }
}

export default withStyles(searchStyle)(GraphQLSearch);
