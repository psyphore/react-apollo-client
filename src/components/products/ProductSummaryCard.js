import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';

const styles = theme => ({
  card: {
    maxWidth: 345
  },
  media: {
    height: 0,
    paddingTop: '56.25%' // 16:9
  },
  badge: {
    margin: theme.spacing.unit * 2,
    padding: `0 ${theme.spacing.unit * 2}px`
  },
  avatar: {
    margin: 10
  }
});

class ProductSummaryCard extends PureComponent {
  render() {
    const { classes, product } = this.props;
    /**
 * id
    name
    championCount
 */
    return (
      <div>
        {/* <Badge
          color="primary"
          badgeContent={product.championCount}
          className={classes.badge.margin}
        > */}
          <Card className={classes.card}>
            <CardContent>
              <Typography gutterBottom variant="headline" component="h4">
                {product.name}
              </Typography>
            </CardContent>
          </Card>
        {/* </Badge> */}
      </div>
    );
  }
}

ProductSummaryCard.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  product: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(ProductSummaryCard);
