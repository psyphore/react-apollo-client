import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import WorkIcon from '@material-ui/icons/Work';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

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

const ProductSummaryList = ({ title, products, classes }) => (
  <div className={classes.root}>
    <div className={classes.actionPaper}>
      <Typography variant="title" gutterBottom>
        {title}
      </Typography>
      <Divider />
    </div>
    <List>
      {products.map(product => (
        <ListItem key={product.id}>
          <Avatar>
            <WorkIcon />
          </Avatar>
          <ListItemText primary={product.name} />
        </ListItem>
      ))}
    </List>
  </div>
);

export default withStyles(styles)(ProductSummaryList);
