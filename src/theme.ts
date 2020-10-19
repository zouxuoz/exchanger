import { Theme, colors } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';

export const theme: Theme = createMuiTheme({
  palette: {
    primary: {
      main: colors.indigo['500'],
    },
    secondary: {
      main: colors.pink['A200'],
    },
  },
  overrides: {
    MuiInputBase: {
      root: {
        height: 56,
      },
    },
  },
});
