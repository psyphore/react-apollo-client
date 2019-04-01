import React, { PureComponent } from 'react';
import { Query } from 'react-apollo';
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import TextField from '@material-ui/core/TextField';
import Search from '@material-ui/icons/Search';
import dayJS from 'dayjs';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import { searchStyle } from '../../assets/jss';

import { searchQuery } from '../../graphql';
import PersonChip from '../people/PersonChip';
import { ErrorBoundary } from '../index';
import { Paper } from '@material-ui/core';

// needs to be smaller
const SearchInput = ({
  classes: { paper },
  actions: { search, change, clear },
  state: { fetching, query },
  mutator
}) => (
  <div className={paper}>
    <div style={{ display: 'flex', flex: '1' }}>
      <div disabled={fetching}>
        <TextField
          variant="outlined"
          helperText="Search for person first name, last name."
          id="full-width-search"
          label="Search"
          margin="none"
          onChange={e => change(e.target.value)}
          onKeyPress={e => (e.key === 'Enter' ? search(mutator) : null)}
          onFocusCapture={() => clear()}
          value={query}
        />
        <Fab
          aria-label="search"
          color="primary"
          onClick={() => search(mutator)}
        >
          <Search />
        </Fab>
      </div>
    </div>
  </div>
);

// needs to be a list
const resultSearch = {
  margin: '0 auto',
  display: 'grid',
  gridGap: '5px',
  maxWidth: '91vw',
  gridTemplateColumns: 'repeat(auto-fill, minmax(275px, 1fr))',
  maxHeight: '20vh',
  overflowY: 'scroll',
  overflowX: 'hidden',
  scrollBehavior: 'smooth'
};

const resultPaper = {
  position: 'absolute',
  zIndex: 25
};

const SearchResult = ({
  classes,
  state: { result, lapsedTime, open },
  onSelect,
  actions
}) => {
  return (
    <Paper style={resultPaper}>
      <List>
        {open ? (
          <div style={resultSearch}>
            {result.map(res => (
              <ListItem
                key={res.id}
                onClick={() => {
                  onSelect(res);
                  actions.reset();
                }}
              >
                <PersonChip detail={res} />
              </ListItem>
            ))}
          </div>
        ) : lapsedTime ? (
          <ListItem>
            <div className={classes.text}>
              <Typography variant="caption">No Results Found.</Typography>
            </div>
          </ListItem>
        ) : null}
      </List>
    </Paper>
  );
};

class SimpleLookUp extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      first: 25,
      offset: 0,
      result: null,
      open: false,
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
      first: 25,
      offset: 0,
      result: null,
      open: false,
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
        lapsedTime: diff,
        open: true
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
    const { classes, onSelection } = this.props;
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
            <List>
              <ListItem>
                <SearchInput
                  actions={actions}
                  classes={classes}
                  state={this.state}
                  mutator={query}
                />
              </ListItem>
              <ListItem>
                <SearchResult
                  classes={classes}
                  state={this.state}
                  actions={actions}
                  onSelect={onSelection}
                />
              </ListItem>
            </List>
          </ErrorBoundary>
        )}
      </Query>
    );
  }
}

export default withStyles(searchStyle)(SimpleLookUp);
