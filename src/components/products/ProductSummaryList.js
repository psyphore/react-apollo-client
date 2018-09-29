import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import WorkIcon from '@material-ui/icons/Work';
import { Link } from 'react-router-dom';

import TitleRender from '../title';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  actionPaper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'left',
    color: theme.palette.text.secondary
  }
});

const BodyRender = ({ products }) => (
  <List>
    {products.map(product => (
      <ListItem key={product.id}>
        <Link
          key={product.id}
          to={'/product/' + product.name}
          style={{ textDecoration: 'none' }}
        >
          <Avatar>
            <WorkIcon color="action" />
          </Avatar>
        </Link>
        <ListItemText primary={product.name} />
      </ListItem>
    ))}
  </List>
);

const ProductSummaryList = ({ title, products, classes }) => (
  <div className={classes.root}>
    <TitleRender action={classes.actionPaper} title={title} />
    <BodyRender products={products} />
  </div>
);

export default withStyles(styles)(ProductSummaryList);
