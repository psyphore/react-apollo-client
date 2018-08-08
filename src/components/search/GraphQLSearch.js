import React, { PureComponent, Fragment } from 'react';
import { withApollo } from 'react-apollo';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Search from '@material-ui/icons/Search';
import Badge from '@material-ui/core/Badge';
import Link from 'react-router-dom/Link';

import { searchQuery } from '../../graphql';
import PersonSummaryCard from '../people/PersonSummaryCard';
import { Loader, ErrorMessage } from '../index';

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  results: {
    display: 'grid',
    gridGap: '5px',
    gridTemplateColumns: 'repeat(auto-fill, minmax(275px, 1fr))',
    gridAutoRows: '240px',
    alignItems: 'center',
    width: '100vw',
    maxWidth: '91vw',
    margin: '0 auto',
    [theme.breakpoints.down('md')]: { maxWidth: '85vw' },
    [theme.breakpoints.down('sm')]: { maxWidth: '95vw' }
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary
  },
  badge: {
    margin: theme.spacing.unit * 2,
    padding: `0 ${theme.spacing.unit * 2}px`
  }
});

const SearchInput = ({
  classes: { paper },
  actions: { search, change, clear },
  state: { fetching, query }
}) => (
  <div className={paper}>
    <Grid container justify="center" wrap="wrap" spacing={8}>
      <Grid item xs={8}>
        <TextField
          autoFocus
          disabled={fetching}
          fullWidth
          helperText="Search for person via title, first name, last name, branch name, branch address, product name"
          id="full-width-search"
          label="Search"
          margin="normal"
          onChange={e => change(e.target.value)}
          onKeyPress={e => (e.key === 'Enter' ? search() : null)}
          onFocusCapture={() => clear()}
          value={query}
        />
      </Grid>
      <Grid item xs={2}>
        <Button
          aria-label="search"
          color="primary"
          disabled={fetching}
          onClick={search}
          variant="fab"
        >
          <Search />
        </Button>
      </Grid>
    </Grid>
  </div>
);

class GraphQLSearch extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      first: 100,
      offset: 0,
      result: null,
      count: 0,
      fetching: false,
      extensions: null
    };

    this._reset = this._reset.bind(this);
    this._executeSearch = this._executeSearch.bind(this);
    this._handleInputChange = this._handleInputChange.bind(this);
    this._handleInputClear = this._handleInputClear.bind(this);
  }

  _reset = () => {
    this.setState({
      first: 100,
      offset: 0,
      result: null,
      count: 0,
      fetching: false,
      extensions: null
    });
  };

  _executeSearch = async () => {
    const { query, first, offset } = this.state;
    const { client } = this.props;

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

    const result = await client.query({
      query: searchQuery,
      variables: { query: { query, first, offset } }
    });

    if (result.errors) {
      this.setState({
        errors: result.errors,
        fetching: false,
        extensions: result.extensions
      });
      return;
    }

    this.setState({
      result: result.data.search.data,
      count: result.data.search.count,
      fetching: false,
      extensions: result.extensions
    });
  };

  _handleInputChange = value => {
    this.setState({ query: value });
  };

  _handleInputClear = () => {
    this.setState({ query: '' });
  };

  render() {
    const { classes } = this.props;
    const { errors, fetching, count, result } = this.state;
    const actions = {
      reset: this._reset,
      search: this._executeSearch,
      change: this._handleInputChange,
      clear: this._handleInputClear
    };

    return (
      <Fragment>
        <Grid
          container
          className={classes.root}
          spacing={8}
          justify="center"
          wrap="wrap"
        >
          <Grid item xs={12}>
            <SearchInput
              actions={actions}
              classes={classes}
              state={this.state}
            />
          </Grid>

          <Grid item md={12}>
            {fetching ? <Loader /> : null}
            {errors ? <ErrorMessage error={errors} /> : null}
            {count ? (
              <Badge
                color="primary"
                badgeContent={count}
                className={classes.badge.margin}
              >
                <span />
              </Badge>
            ) : null}
          </Grid>

          <Grid item md={12}>
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
            ) : null}
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}

GraphQLSearch = withApollo(GraphQLSearch);
export default withStyles(styles)(GraphQLSearch);
