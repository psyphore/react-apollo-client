import React, { PureComponent } from 'react';
import { Mutation } from 'react-apollo';
import { upload_file, upload_files } from '../../graphql';

const singleFileUploadHandler = (
  {
    target: {
      validity,
      files: [file]
    }
  },
  uploader
) => {
  validity.valid && uploader({ variables: { file } });
};

const multiFileUploadHandler = ({ target: { validity, files } }, uploader) => {
  validity.valid && uploader({ variables: { files } });
};

export const UploadOneFile = () => (
  <Mutation mutation={upload_file}>
    {uploadFile => (
      <input
        type="file"
        required
        onChange={e => singleFileUploadHandler(e, uploadFile)}
      />
    )}
  </Mutation>
);

export const UploadMultipleFiles = () => (
  <Mutation mutation={upload_files}>
    {uploadFiles => (
      <input
        type="file"
        multiple
        required
        onChange={e => multiFileUploadHandler(e, uploadFiles)}
      />
    )}
  </Mutation>
);

export class UploadFile extends PureComponent {
  fileUploadHandler = (
    {
      target: {
        validity,
        files: [file]
      }
    },
    uploader
  ) => {
    validity.valid && uploader({ variables: { file } });
  };

  triggerUpload = () => {
    const { in1 } = this.refs;
    debugger;
    in1.click();
  };

  render() {
    return (
      <Mutation mutation={upload_file}>
        {uploadFile => (
          <input
            ref="in1"
            type="file"
            required
            onChange={e => this.fileUploadHandler(e, uploadFile)}
          />
        )}
      </Mutation>
    );
  }
}
