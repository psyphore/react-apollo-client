import React from 'react';
import { object } from 'prop-types';
import Typography from '@material-ui/core/Typography';

import { Card, Body, Avatar } from '../coolForm';
const baseUrl = `${process.env.REACT_APP_GRAPHQL_URI}/media/`,
  width = 250,
  height = 250;
const decommed = {
  filter: 'grayscale(100%)'
};

const PersonSummaryCard = ({ person }) => (
  <Card profile>
    <Avatar profile>
      <img
        src={`${baseUrl + person.avatar}/${width}/${height}`}
        alt="..."
        style={person.deactivated ? decommed : null}
      />
    </Avatar>
    <Body profile>
      <Typography gutterBottom variant="h5">
        {`${person.firstname}${
          person.knownAs && person.knownAs.trim().length > 0
            ? ` (${person.knownAs}) `
            : ' '
        }${person.lastname}`}
      </Typography>
    </Body>
  </Card>
);

PersonSummaryCard.propTypes = {
  person: object.isRequired
};

export default PersonSummaryCard;
