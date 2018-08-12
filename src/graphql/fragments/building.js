import gql from 'graphql-tag';
// import { basicPerson } from './person';

export const basicBuilding = gql`
  fragment buildingBasicFields on Building {
    id
    name
    address
    headcount
  }
`;

// export const fullBuilding = gql`
//   fragment buildingFullFields on Building {
//     ...buildingBasicFields
//     people {
//       ...personBasicFields
//     }
//   }
//   ${basicPerson}
//   ${basicBuilding}
// `;
