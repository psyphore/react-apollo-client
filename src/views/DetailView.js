import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
// import PropTypes from 'prop-types';
// import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import Person from '../components/people/PersonCard';
// import PersonDetailDialog from '../components/PersonDetailDialog';

const query = gql`
query letha($id: ID, $fn: String, $ln: String) {
  person(id: $id, firstname: $fn, lastname: $ln) {
    ...basicFields
  }
}

fragment basicFields on Person {
  id
  title
  firstname
  lastname
  email
  avatar
  mobile
  bio
  startDate
}
`

const queryOptions = {
  options: props => ({
    variables: {
      fn: props.match.params.firstname,
      ln: props.match.params.lastname
    },
  }),
}

class DetailView extends Component {
  render() {
    let { data } = this.props
    if (data.loading) {
      return <div>Loading...</div>
    }
    return (
      <div>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <Person detail={data.person} />
            <Grid>
              <Paper></Paper>
            </Grid>
            <Grid>
              <Paper></Paper>
            </Grid>
          </Grid>
        </Grid>
        
        <br/>
        {/* {data.personById.manager.map(
          (person, index) => (<Person key={person.id} detail={person} />)
          )}
        <br/>
        {data.personById.team.map(
          (person, index) => (<PersonDetailDialog key={person.id} detail={person} />)
          )} */}
      </div>
    )
  }
}

DetailView = graphql(query, queryOptions)(DetailView)
export default DetailView
