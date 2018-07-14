import gql from 'graphql-tag';

const getBuildingsQuery = gql`
  query($first: Int, $offset: Int) {
    buildings(first: $first, offset: $offset) {
      ...buildingFields
    }
  }

  fragment buildingFields on Building {
    id
    name
    address
    headcount
  }
`;

const getBuildingQuery = gql`
  query($id: ID, $name: String) {
    building(id: $id, name: $name) {
      ...buildingFields
    }
  }

  fragment buildingFields on Building {
    id
    name
    address
    headcount
    people {
      ...personFields
    }
  }

  fragment personFields on Person {
    id
    firstname
    lastname
  }
`;

export { getBuildingsQuery, getBuildingQuery };
