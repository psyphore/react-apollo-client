import React, { PureComponent } from 'react';
import { Mutation } from 'react-apollo';
import { SharedFileManagerConsumer } from './FileManagerProvider';

export default class SharedFileManager extends PureComponent {
  render() {
    return (
      <SharedFileManagerConsumer>
        {({ fileDialogIsOpen, fileUploadHandler, mutation }) => (
          <Mutation mutation={mutation}>
            {uploadFile => (
              <input
                type="file"
                required
                hidden={fileDialogIsOpen}
                onChange={e => fileUploadHandler(e, uploadFile)}
              />
            )}
          </Mutation>
        )}
      </SharedFileManagerConsumer>
    );
  }
}
