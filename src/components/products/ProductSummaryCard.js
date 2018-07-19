import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import WorkIcon from '@material-ui/icons/Work';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
});

class ProductSummaryList extends React.PureComponent {
  render() {
    const { products } = this.props;

    return (
      <div>
        <List>
        {products.map(product => (
          <ListItem key={product.id} >
            <Avatar>
              <WorkIcon />
            </Avatar>
            <ListItemText
              primary={product.name}>
            </ListItemText>
          </ListItem>
        ))}
      </List>
      </div>
    );
  }
}

ProductSummaryList.propTypes = {
  classes: PropTypes.object.isRequired,
  products: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default withStyles(styles)(ProductSummaryList);
