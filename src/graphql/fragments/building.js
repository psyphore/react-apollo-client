import gql from 'graphql-tag';

export const basicBuilding = gql`
  fragment buildingBasicFields on Building {
    id
    name
    address
    headcount
  }
`;
