import React, { PureComponent } from 'react';
import { withApollo } from 'react-apollo';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Search from '@material-ui/icons/Search';
import Badge from '@material-ui/core/Badge';
import Link from 'react-router-dom/Link';

import { searchQuery } from '../../../graphql';
import PersonSummaryCard from '../../people/PersonSummaryCard';
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

class GraphQLSearch extends PureComponent {
  state = {
    query: '',
    first: 100,
    offset: 0,
    result: null,
    count: 0,
    fetching: false,
    extensions: null
  };

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

  render() {
    const { classes } = this.props;
    const { query, errors, fetching, count, extensions } = this.state;

    return (
      <div>
        <Grid container className={classes.root} spacing={8}>
          <Grid item xs={12}>
            <div className={classes.paper}>
              <Grid container justify="center" spacing={8}>
                <Grid item xs={8}>
                  <TextField
                    id="full-width-search"
                    label="Search"
                    fullWidth
                    helperText="Search for person via title, first name, last name, branch name, branch address, product name"
                    margin="normal"
                    onChange={e => this.setState({ query: e.target.value })}
                    onKeyPress={e =>
                      e.key === 'Enter' ? this._executeSearch() : null
                    }
                    onFocusCapture={() => this.setState({ query: '' })}
                    disabled={fetching}
                    value={query}
                  />
                </Grid>
                <Grid item xs={2}>
                  <Button
                    variant="fab"
                    color="primary"
                    aria-label="search"
                    disabled={fetching}
                    onClick={this._executeSearch}
                  >
                    <Search />
                  </Button>
                </Grid>
              </Grid>
            </div>
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
            {extensions ? (
              <Badge
                color="primary"
                badgeContent={extensions.duration}
                className={classes.badge.margin}
              >
                <span />
              </Badge>
            ) : null}
          </Grid>

          <Grid item md={12}>
            {this.state.count !== 0 ? (
              <div className={classes.results}>
                {this.state.result.map(res => (
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
      </div>
    );
  }
}

GraphQLSearch = withApollo(GraphQLSearch);
export default withStyles(styles)(GraphQLSearch);
