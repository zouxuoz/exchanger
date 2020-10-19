import React from 'react';
import cx from 'classnames';
import { Typography, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';

import { getPocket, State, setActivePocket, CURRENCY_SIGNS } from './store';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    whiteSpace: 'nowrap',
    userSelect: 'none',
  },
  active: {
    opacity: 1,
  },
  inactive: {
    opacity: 0.5,
    cursor: 'pointer',

    '&:hover': {
      opacity: 0.7,
    },
  },
}));

export const BalanceItem: React.FC<{
  pocketId: string;
  active?: boolean;
}> = ({ pocketId, active = false }) => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const pocket = useSelector((state: State) => getPocket(state, pocketId));

  const onClickPocket = React.useCallback(() => {
    if (!active) {
      dispatch(setActivePocket(pocketId));
    }
  }, [dispatch, pocketId, active]);

  if (!pocket) {
    return null;
  }

  return (
    <Typography
      className={cx(classes.root, active ? classes.active : classes.inactive)}
      variant={active ? 'h2' : 'h4'}
      onClick={onClickPocket}
    >
      {CURRENCY_SIGNS[pocket.currency]} {pocket.balance}
    </Typography>
  );
};
