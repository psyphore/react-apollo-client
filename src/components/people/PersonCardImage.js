import React, { Fragment } from 'react';
import CardMedia from '@material-ui/core/CardMedia';

const baseUrl = `${process.env.REACT_APP_GRAPHQL_URI}/media/`;

export default ({ detail, mediaClass }) => (
  <Fragment>
    {detail.avatar ? (
      <CardMedia
        className={mediaClass}
        image={baseUrl + detail.avatar}
        title={detail.firstname + ' ' + detail.lastname}
      />
    ) : null}
  </Fragment>
);

/**
 * {person.avatar ? (
          <CardMedia
            className={classes.media}
            title={person.firstname + ' ' + person.lastname}
            image={baseUrl + person.avatar}
          />
        ) : (
          <Avatar
            className={classes.avatar}
            alt={person.firstname + ' ' + person.lastname}
          >
            <Person />
          </Avatar>
        )}
 * 
 */
