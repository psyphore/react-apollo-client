import React, { Fragment } from 'react';
import { object } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import OpenInBrowser from '@material-ui/icons/OpenInBrowser';
import ArrowForward from '@material-ui/icons/ArrowForward';
import { Link } from 'react-router-dom';

const styles = theme => ({
  card: {
    display: 'flex'
  },
  details: {
    display: 'flex',
    flexDirection: 'column'
  },
  content: {
    flex: '1 0 auto'
  },
  cover: {
    width: 151,
    height: 151
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing.unit,
    paddingBottom: theme.spacing.unit
  },
  playIcon: {
    height: 38,
    width: 38
  },
  link: { textDecoration: 'none' }
});

const ProductDetailedCard = ({ classes, product }) => (
  <Fragment>
    <Card className={classes.card}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography variant="h5">{product.name}</Typography>
        </CardContent>
        <div className={classes.controls}>
          <Link to={'/building/' + product.id} styles={classes.link}>
            <IconButton aria-label="Show More">
              <OpenInBrowser className={classes.playIcon} />
            </IconButton>
          </Link>
          <Link to={'/building/' + product.id} styles={classes.link}>
            <IconButton aria-label="Show More">
              <ArrowForward className={classes.playIcon} />
            </IconButton>
          </Link>
        </div>
      </div>
    </Card>
  </Fragment>
);

ProductDetailedCard.propTypes = {
  classes: object.isRequired,
  theme: object.isRequired,
  product: object.isRequired
};

export default withStyles(styles, { withTheme: true })(ProductDetailedCard);
