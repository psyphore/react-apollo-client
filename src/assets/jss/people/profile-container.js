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
  quickAction: {
    display: 'flex',
    flex: 1
  },
  detailPanel: {
    root: {
      width: '100%'
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      flexBasis: '33.33%',
      flexShrink: 0
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary
    }
  },
  expansionPanelDetails: {
    root: {
      display: 'block',
      padding: '8px 24px 24px'
    }
  },
  gridContainerStyle,
  gridItemStyle: {
    [theme.breakpoints.down('md')]: { padding: '1rem 2rem !important' },
    [theme.breakpoints.down('sm')]: { padding: '1rem 1rem !important' }
  }
});

export default styles;
