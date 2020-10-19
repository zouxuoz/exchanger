import React from 'react';
import { Typography, Grid } from '@material-ui/core';
import { useSelector } from 'react-redux';

import { getVisiblePockets } from './store';
import { BalanceItem } from './BalanceItem';

export const Balance: React.FC<any> = () => {
  const [prevPocket, activePocket, nextPocket] = useSelector(getVisiblePockets);

  return (
    <Grid container>
      <Grid xs={12} item>
        <Typography variant="overline">Current Balance</Typography>
      </Grid>
      <Grid item xs={4} container alignItems="center" justify="center">
        {prevPocket && <BalanceItem pocketId={prevPocket.id} />}
      </Grid>
      <Grid item xs={4} container alignItems="center" justify="center">
        <BalanceItem pocketId={activePocket.id} active />
      </Grid>
      <Grid item xs={4} container alignItems="center" justify="center">
        {nextPocket && <BalanceItem pocketId={nextPocket.id} />}
      </Grid>
    </Grid>
  );
};
