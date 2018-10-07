import React, { PureComponent } from 'react';
import { string, func, bool } from 'prop-types';
import { Mutation } from 'react-apollo';
import Dropzone from 'react-dropzone';

import { upload_file, upload_files } from '../../graphql';

const style = {
  root: {
    position: 'relative',
    borderWidth: '0.7px',
    borderColor: 'rgb(102, 102, 102)',
    borderStyle: 'dashed',
    borderRadius: '5px'
  },
  activeStyle: {},
  rejectStyle: {}
};

export class UploadMultipleFiles extends PureComponent {
  static propType = {
    parentId: string.isRequired,
    label: string.isRequired,
    callback: func
  };

  multiFileUploadHandler = ({ target: { validity, files } }, uploader) => {
    const { parentId, label } = this.props;
    const link = {
      parentId,
      label,
      files
    };
    validity.valid && uploader({ variables: { link } });
  };

  render() {
    return (
      <Mutation mutation={upload_files}>
        {uploadFiles => (
          <input
            type="file"
            multiple
            required
            onChange={e => this.multiFileUploadHandler(e, uploadFiles)}
          />
        )}
      </Mutation>
    );
  }
}

export class UploadFile extends PureComponent {
  static propType = {
    parentId: string.isRequired,
    label: string.isRequired,
    callback: func,
    activate: bool
  };

  constructor(props) {
    super(props);
    this.state = {
      accepted: [],
      rejected: []
    };
  }

  fileUploadHandler = async (
    {
      target: {
        validity,
        files: [file]
      }
    },
    uploader
  ) => {
    debugger;
    const { parentId, label, callback } = this.props;
    const link = {
      parentId,
      label,
      file
    };
    const res =
      validity.valid &&
      (await uploader({
        variables: {
          link
        }
      }));
    callback && callback(res.data);
  };

  render() {
    const { children } = this.props;
    return (
      <Mutation mutation={upload_file}>
        {uploadFile => (
          <Dropzone
            accept="image/jpeg, image/png"
            style={style.root}
            multiple={false}
            onDrop={(accepted, rejected) => {
              this.setState(() => ({ accepted, rejected }));
            }}
            onChange={e => this.fileUploadHandler(e, uploadFile)}
          >
            {children}
          </Dropzone>
        )}
      </Mutation>
    );
  }
}
