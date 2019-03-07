import { gridContainerStyle, gridChildren, gridRoot } from '../base';

const styles = theme => ({
  root: gridRoot,
  children: gridChildren,
  actionPaper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'left',
    color: theme.palette.text.secondary
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary
  },
  gridContainerStyle,
  gridItemStyle: {
    [theme.breakpoints.down('md')]: { padding: '1rem 2rem !important' },
    [theme.breakpoints.down('sm')]: { padding: '1rem 1rem !important' }
  }
});

export default styles;
