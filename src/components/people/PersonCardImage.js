import React from 'react';
import CardMedia from '@material-ui/core/CardMedia';

const baseUrl = `${process.env.REACT_APP_GRAPHQL_URI}/media/`;
const decommed = {
  filter: 'grayscale(100%)'
};
export default ({ detail, mediaClass, width = 250, height = 150 }) =>
  detail.avatar && (
    <CardMedia
      className={mediaClass}
      image={`${baseUrl + detail.avatar}/${width}/${height}`}
      title={detail.firstname + ' ' + detail.lastname}
      style={detail.deactivated ? decommed : null}
    />
  );
