import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import { TextField } from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    container: {
        display: 'flex',
        justifyContent: 'flext-start',
        flexWrap: 'wrap',
        flexGrow: 1,
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      color: theme.palette.text.secondary
    },
  });

class GenericSearch extends Component {
    state = {
        query: '',
        suggestions: []
    }

    handleInputChange = () => {
        this.setState({
            query: this.value,
            result: []
        });
    }

    render() {
        const { action, collection, classes } = this.props;
        return (
            <div className={classes.container}>
                <TextField
                    label="Search"
                    id="margin-dense"
                    className={classes.textField}
                    helperText="Search for..."
                    margin="dense"
                    onChange={this.handleInputChange}
                    />
                <Button variant="outlined" color="primary" className={classes.button}>Office</Button>
                <Button variant="outlined" color="primary" className={classes.button}>Product</Button>
                <Button variant="outlined" color="primary" className={classes.button}>Title</Button>
                <Button variant="outlined" color="primary" className={classes.button}>First name</Button>
                <Button variant="outlined" color="primary" className={classes.button}>Lastname</Button>
                <p>{this.state.query}</p>
            </div>
        );
    }
}

GenericSearch.propTypes = {
    action: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    collection: PropTypes.arrayOf(PropTypes.object)
};

export default withStyles(styles)(GenericSearch);