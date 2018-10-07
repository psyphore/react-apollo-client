import React, { createContext, PureComponent } from 'react';
import Dropzone from 'react-dropzone';

import { upload_file } from '../../graphql';
import SharedFileInput from './SharedFileManager';

const Context = createContext();

class ProviderComponent extends PureComponent {
  state = {
    isOpen: false
  };

  openFileDialog = () => {
    this.setState(() => ({
      isOpen: true
    }));
  };

  closeFileDialog = () => {
    this.setState(() => ({
      isOpen: false
    }));
  };

  singleFileUploadHandler = (
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

  multiFileUploadHandler = ({ target: { validity, files } }, uploader) => {
    validity.valid && uploader({ variables: { files } });
  };

  render() {
    const { children } = this.props;
    const { isOpen } = this.state;
    const { Provider } = Context;

    return (
      <Provider
        value={{
          openFileDialog: this.openFileDialog,
          closeFileDialog: this.closeFileDialog,
          fileDialogIsOpen: isOpen,
          listenForEvents: this.listenForEvents,
          mutation: upload_file
        }}
      >
        {children}
        {/* <SharedFileInput /> */}
      </Provider>
    );
  }
}

export const SharedFileManagerConsumer = Context.Consumer;
export const SharedFileManagerProvider = ProviderComponent;
