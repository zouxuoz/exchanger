import React from 'react';
import {
  AppBar,
  Toolbar,
  Theme,
  Grid,
  BottomNavigation,
  BottomNavigationAction,
  Fab,
  CircularProgress,
  Box,
} from '@material-ui/core';
import * as icons from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';

import { Balance } from './Balance';
import { ExchangeDialog } from './ExchangeDialog';
import { fetchPockets, State } from './store';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'grid',
    gridTemplateAreas: '"appBar" "content" "tabs"',
    gridTemplateRows: 'auto 1fr auto',
    flex: 1,
    backgroundColor: theme.palette.background.default,
  },
  appBar: {
    gridArea: 'appBar',
    textAlign: 'center',
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  content: {
    gridArea: 'content',
  },
  bottomNavigation: {
    gridArea: 'tabs',
  },
}));

export const Application: React.FC<any> = () => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const loading = useSelector((state: State) => state.pockets.loading);
  const loaded = useSelector((state: State) => state.pockets.loaded);

  React.useEffect(() => {
    dispatch(fetchPockets());
  }, [dispatch]);

  const [exchageDialogIsOpen, setExchageDialogIsOpen] = React.useState(false);

  const openExchangeDialog = () => {
    setExchageDialogIsOpen(true);
  };

  const onCloseExchangeDialog = () => {
    setExchageDialogIsOpen(false);
  };

  if (loading || !loaded) {
    return (
      <Box display="flex" height="100%" justifyContent="center" alignItems="center" flex={1}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar} position="static">
        <Toolbar>
          <Grid container spacing={2}>
            <Grid xs={12} item>
              <Balance />
            </Grid>
            <Grid xs={12} item>
              <Fab
                color="secondary"
                variant="extended"
                onClick={openExchangeDialog}
                data-e2e-id="root.exchangeBtn"
              >
                <icons.Loop />
                &nbsp;Exchange
              </Fab>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>

      <div className={classes.content} />

      <BottomNavigation className={classes.bottomNavigation} value={0} showLabels>
        <BottomNavigationAction label="Account" icon={<icons.AccountBalanceWallet />} />
        <BottomNavigationAction label="Card" icon={<icons.CreditCard />} />
        <BottomNavigationAction label="Support" icon={<icons.ContactSupport />} />
        <BottomNavigationAction label="Profile" icon={<icons.AccountBox />} />
      </BottomNavigation>

      <ExchangeDialog open={exchageDialogIsOpen} onClose={onCloseExchangeDialog} />
    </div>
  );
};
