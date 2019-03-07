import React from 'react';
import { object, bool } from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Link from 'react-router-dom/Link';

import EditProfile from './ProfileEditDialog';

import { Card, Body, Avatar } from '../coolForm';

const PersonCard = ({ detail, update = false }) => {
  const baseUrl = `${process.env.REACT_APP_GRAPHQL_URI}/media/`,
    width = 250,
    height = 250;
  return (
    <Card profile>
      <Avatar profile>
        <img src={`${baseUrl + detail.avatar}/${width}/${height}`} alt="..." />
      </Avatar>
      <Body profile>
        <Typography gutterBottom variant="h5">
          {`${detail.firstname}${
            detail.knownAs && detail.knownAs.trim().length > 0
              ? ` (${detail.knownAs}) `
              : ' '
          }${detail.lastname}`}
        </Typography>
        <Typography variant="h6">{detail.title}</Typography>
        <Typography variant="caption">{detail.email}</Typography>
        <Typography variant="caption">{detail.mobile}</Typography>
        <Typography variant="caption">{detail.bio}</Typography>
        {detail.building.map((building, index) => (
          <Link
            key={index}
            to={'/building/' + building.name}
            style={{ textDecoration: 'none' }}
          >
            <Typography variant="caption">{building.name}</Typography>
          </Link>
        ))}
        {update && <EditProfile detail={detail} />}
      </Body>
    </Card>
  );
};

PersonCard.propTypes = {
  detail: object.isRequired,
  update: bool
};

export default PersonCard;
