import { createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';

export const primaryTheme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: {
      main: '#40c4ff',
      contrastText: '#000'
    }
  }
});
