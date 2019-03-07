const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexWrap: 'nowrap',
    margin: theme.spacing.unit / 2
  },
  size: {
    width: 60,
    height: 60
  },
  label: {
    width: '100px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  }
});

export default styles;
