import gql from 'graphql-tag';

export const profileUpdate = gql`
  mutation($profile: Profile!) {
    updateProdile(profile: $profile)
  }
`;
