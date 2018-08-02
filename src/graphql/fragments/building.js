import gql from 'graphql-tag';
import { basic as pb } from './person';

export const full = gql`
  ${pb}
  fragment buildingFullFields on Building {
    id
    name
    address
    headcount
    people {
      ...personBasicFields
    }
  }
`;

export const basic = gql`
fragment buildingBasicFields on Building {
    id
    name
    address
    headcount
`;
