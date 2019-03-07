import gql from 'graphql-tag';

export const upload_file = gql`
  mutation uploadFile($link: MediaLink!) {
    singleUpload(file: $link) {
      id
    }
  }
`;
export const upload_files = gql`
  mutation uploadFiles($files: [Upload!]!) {
    multiUpload(files: $files) {
      id
    }
  }
`;
