import { gridContainerStyle, gridChildren, gridRoot } from '../base';
const styles = theme => ({
  appBar: {
    position: 'relative'
  },
  flex: {
    flex: 1
  },
  button: {
    margin: theme.spacing.unit
  },
  extendedIcon: {
    marginRight: theme.spacing.unit
  },
  container: {
    display: 'grid',
    gridGap: '5px',
    gridTemplateColumns: '1fr',
    gridTemplateRows: '1fr auto 1fr',
    width: '100vw',
    maxWidth: '95vw',
    margin: '0 auto',
    [theme.breakpoints.down('md')]: { maxWidth: '85vw' },
    [theme.breakpoints.down('sm')]: { maxWidth: '95vw' }
  },
  header: {
    gridRow: '-1 / 0'
  },
  content: {
    gridRow: '2 / 3',
    margin: '1%'
  },
  footer: {
    gridRow: '3 / 3',
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary
  },
  contentContainer: {
    display: 'grid',
    gridGap: '2.5px',
    gridTemplateColumns: '1fr',
    gridTemplateRows: '1fr',
    alignItems: 'center',
    width: '100vw',
    maxWidth: '95vw',
    margin: '0 auto',
    [theme.breakpoints.down('md')]: { maxWidth: '85vw' },
    [theme.breakpoints.down('sm')]: { maxWidth: '95vw' },
    justifyItems: 'center'
  },
  contentOptions: {
    display: 'flex',
    flex: 1,
    flexWrap: 'wrap'
  },
  contentOption: {
    maxWidth: '30%'
  },
  text: {
    paddingTop: theme.spacing.unit * 2,
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2
  },
  gridded: {
    root: gridRoot,
    children: gridChildren,
    gridContainerStyle,
    gridItemStyle: {
      [theme.breakpoints.down('md')]: { padding: '1rem 2rem !important' },
      [theme.breakpoints.down('sm')]: { padding: '1rem 1rem !important' }
    }
  }
});

export default styles;
