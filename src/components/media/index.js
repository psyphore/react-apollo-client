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
  activeStyle: {
    position: 'relative',
    borderWidth: '1.1px',
    borderColor: 'rgb(112, 177, 210)',
    borderStyle: 'dashed',
    borderRadius: '5px'
  },
  acceptStyle: {
    position: 'relative',
    borderWidth: '1.7px',
    borderColor: 'rgb(0, 255, 0)',
    borderStyle: 'solid',
    borderRadius: '5px'
  },
  rejectStyle: {
    position: 'relative',
    borderWidth: '1.7px',
    borderColor: 'rgb(255, 0, 0)',
    borderStyle: 'solid',
    borderRadius: '5px'
  }
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
      accept: 'image/jpeg, image/png',
      accepted: [],
      rejected: [],
      dropzoneActive: false
    };

    this.onDragEnter = this.onDragEnter.bind(this);
    this.onDragLeave = this.onDragLeave.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.applyMimeTypes = this.applyMimeTypes.bind(this);
    this.dzHandler = this.dzHandler.bind(this);
  }

  onDragEnter() {
    this.setState(() => ({
      dropzoneActive: true
    }));
  }

  onDragLeave() {
    this.setState(() => ({
      dropzoneActive: false
    }));
  }

  onDrop(accepted, rejected) {
    this.setState(() => ({
      accepted,
      rejected,
      dropzoneActive: false
    }));
  }

  applyMimeTypes(event) {
    this.setState(() => ({
      accept: event.target.value
    }));
  }

  dzHandler = async uploader => {
    const { parentId, label, callback } = this.props;
    const { accepted } = this.state;
    const link = {
      parentId,
      label,
      file: accepted[0]
    };
    const res =
      link.file &&
      (await uploader({
        variables: {
          link
        }
      }));
    callback && callback(res.data);
  };

  render() {
    const { children } = this.props;
    const { accept } = this.state;
    const { root, acceptStyle, activeStyle, rejectStyle } = style;
    return (
      <Mutation mutation={upload_file}>
        {uploadFile => (
          <Dropzone
            accept={accept}
            style={root}
            activeStyle={activeStyle}
            acceptStyle={acceptStyle}
            rejectStyle={rejectStyle}
            multiple={false}
            onDropAccepted={() => this.dzHandler(uploadFile)}
            onDrop={this.onDrop}
          >
            {children}
          </Dropzone>
        )}
      </Mutation>
    );
  }
}
