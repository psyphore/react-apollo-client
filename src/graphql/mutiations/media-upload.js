import gql from 'graphql-tag';

export const upload_file = gql`
  mutation uploadFile($file: Upload!) {
    singleUpload(file: $file) {
      id
      filename
      mimetype
      encoding
    }
  }
`;
export const upload_files = gql`
  mutation uploadFiles($files: [Upload!]!) {
    multiUpload(files: $files) {
      id
      filename
      mimetype
      encoding
    }
  }
`;
