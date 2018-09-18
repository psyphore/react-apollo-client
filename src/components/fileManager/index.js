import React, { PureComponent } from 'react';
import { withApollo } from 'react-apollo';
import { Paper, Button, CircularProgress, withStyles } from '@material-ui/core';

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2
  }
});

const FileUpload = class extends PureComponent {
  timer = null;
  state = {
    selectedFile: null,
    loaded: 0
  };

  componentDidMountx() {
    this.setState(() => ({ loaded: 0 }));
    this.timer = setInterval(this.progress, 1000);
  }

  componentWillUnmountx() {
    clearInterval(this.timer);
  }

  handleSelectedFile = e => {
    this.setState(() => ({ selectedFile: e.target.files[0] }));
  };

  progress = () => {
    const { loaded } = this.state;
    this.setState({ loaded: loaded >= 100 ? 0 : Math.round(loaded + 10, 2) });
  };

  handleUpload() {
    const { selectedFile, loaded } = this.state;
    const data = new FormData();
    data.append('file', selectedFile, selectedFile.name);
    console.log(`uploading... ${data}`);
    this.componentDidMountx();
    console.log(`progress ${loaded}`);
  }

  render() {
    const { loaded } = this.state;
    const { classes } = this.props;
    return (
      <Paper>
        <input type="file" name="" onChange={this.handleSelectedFile} />
        <Button onClick={this.handleUpload} />
        <CircularProgress
          className={classes.progress}
          variant="static"
          defaultValue={0}
          value={loaded}
        >
          {Math.round(loaded, 2)}
        </CircularProgress>
      </Paper>
    );
  }
};

export default withStyles(styles)(withApollo(FileUpload));
