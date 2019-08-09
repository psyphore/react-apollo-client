import gql from 'graphql-tag';
import { basicBuilding } from '../fragments/building';

export const getBuildingsQuery = gql`
  query getBuildings($first: Int, $offset: Int) {
    buildings(first: $first, offset: $offset) {
      ...buildingBasicFields
    }
  }
  ${basicBuilding}
`;

export const getBuildingQueryx = gql`
  query getBuilding2($id: ID, $name: String) {
    building(id: $id, name: $name) {
      ...buildingBasicFields
    }
  }
  ${basicBuilding}
`;

export const getBuildingQuery = gql`
  query getBuilding($name: String) {
    building(name: $name) {
      id
      name
      address
      headcount
      people {
        id
        firstname
        lastname
        avatar
      }
    }
  }
`;
