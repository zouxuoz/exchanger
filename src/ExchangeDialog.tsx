import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Button,
  IconButton,
  Toolbar,
  InputAdornment,
  Dialog,
  Box,
  Grid,
  MenuItem,
  TextField,
  FormHelperText,
} from '@material-ui/core';
import * as icons from '@material-ui/icons';
import { DialogProps } from '@material-ui/core/Dialog';
import { useDispatch, useSelector } from 'react-redux';

import {
  CURRENCY_SIGNS,
  exchange,
  fetchRates,
  getActivePocketId,
  getExchangeError,
  getExchangeRate,
  getExchangeReceivePocketId,
  getExchangeWriteOffPocketId,
  getPockets,
  getReceiveAmountValue,
  getWriteOffAmountValue,
  setReceiveAmount,
  setReveivePocketId,
  setWriteOffAmount,
  setWriteOffPocketId,
} from './store';
import { roundFloat } from './utils';

const useStyles = makeStyles(theme => ({
  exchangeButton: {
    marginLeft: 'auto',
  },
}));

interface ExchangeDialogProps extends DialogProps {
  onClose: () => void;
}

export const ExchangeDialog: React.FC<ExchangeDialogProps> = ({ open, onClose }) => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const pockets = useSelector(getPockets);
  const activePocketId = useSelector(getActivePocketId);

  const writeOffPocketId = useSelector(getExchangeWriteOffPocketId);
  const receivePocketId = useSelector(getExchangeReceivePocketId);

  const writeOffPocket = React.useMemo(() => pockets.find(({ id }) => id === writeOffPocketId), [
    pockets,
    writeOffPocketId,
  ]);

  const writeOffAmount = useSelector(getWriteOffAmountValue);
  const receiveAmount = useSelector(getReceiveAmountValue);

  const exchangeRate = useSelector(getExchangeRate);

  const error = useSelector(getExchangeError);

  React.useEffect(() => {
    if (open) {
      dispatch(setWriteOffPocketId(activePocketId));
      dispatch(setReveivePocketId(pockets.find(({ id }) => id !== activePocketId)?.id));
    }
  }, [dispatch, open, activePocketId, pockets]);

  React.useEffect(() => {
    if (open) {
      if (writeOffPocketId) {
        dispatch(fetchRates());
      }

      const interval = setInterval(() => {
        dispatch(fetchRates());
      }, 10000);

      return () => clearInterval(interval);
    }
  }, [dispatch, open, writeOffPocketId]);

  const onChangeWriteOffPocketId = React.useCallback(
    event => {
      dispatch(setWriteOffPocketId(event.target.value));
    },
    [dispatch],
  );

  const onChangeWriteOffAmount = React.useCallback(
    event => {
      const value = roundFloat(event.target.value);

      dispatch(setWriteOffAmount(value));
      dispatch(setReceiveAmount(null));
    },
    [dispatch],
  );

  const onChangeReceivePocketId = React.useCallback(
    event => {
      dispatch(setReveivePocketId(event.target.value));
    },
    [dispatch],
  );

  const onChangeReceiveAmount = React.useCallback(
    event => {
      const value = roundFloat(event.target.value);

      dispatch(setReceiveAmount(value));
      dispatch(setWriteOffAmount(null));
    },
    [dispatch],
  );

  const onSubmit = React.useCallback(
    event => {
      event.preventDefault();

      dispatch(
        exchange({
          onSuccess: onClose,
        }),
      );
    },
    [dispatch, onClose],
  );
  if (!pockets) {
    return null;
  }

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={onClose}
      PaperProps={{ component: 'form', onSubmit: onSubmit }}
      data-e2e-id="exchangeDialog.root"
    >
      <AppBar position="relative">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="close"
            onClick={onClose}
            data-e2e-id="exchangeDialog.closeBtn"
          >
            <icons.Close />
          </IconButton>
          <Button
            type="submit"
            className={classes.exchangeButton}
            color="secondary"
            variant="contained"
            data-e2e-id="exchangeDialog.submitBtn"
          >
            Exchange
          </Button>
        </Toolbar>
      </AppBar>
      <Box padding={4}>
        <Grid container spacing={2}>
          <Grid xs={6} item>
            <TextField
              name="writeOffPocketId"
              value={writeOffPocketId}
              onChange={onChangeWriteOffPocketId}
              variant="outlined"
              label="Write Off Pocket"
              select
              fullWidth
            >
              {pockets.map(({ currency, id, balance }) => (
                <MenuItem key={id} value={id}>
                  {currency} (You have {balance} {CURRENCY_SIGNS[currency]})
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid xs={6} item>
            <TextField
              name="writeOffAmount"
              value={writeOffAmount}
              onChange={onChangeWriteOffAmount}
              label="Write Off Amount"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <icons.Remove />
                  </InputAdornment>
                ),
                endAdornment: <InputAdornment position="start">$</InputAdornment>,
              }}
              type="number"
              variant="outlined"
              fullWidth
              data-e2e-id="exchangeDialog.writeOffAmountInput"
            />
          </Grid>
          <Grid xs={6} item>
            <TextField
              name="receivePocketId"
              value={receivePocketId}
              onChange={onChangeReceivePocketId}
              variant="outlined"
              label="Receive Pocket"
              select
              fullWidth
            >
              {pockets.map(({ currency, id, balance }) => (
                <MenuItem key={id} value={id}>
                  {currency} (You have {balance} {CURRENCY_SIGNS[currency]})
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid xs={6} item>
            <TextField
              name="receiveAmount"
              value={receiveAmount}
              onChange={onChangeReceiveAmount}
              label="Receive Amount"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <icons.Add />
                  </InputAdornment>
                ),
                endAdornment: <InputAdornment position="start">$</InputAdornment>,
              }}
              type="number"
              variant="outlined"
              helperText={
                exchangeRate && writeOffPocket
                  ? `1${CURRENCY_SIGNS[writeOffPocket.currency]} = £${exchangeRate}`
                  : 'Exchange rates loading...'
              }
              fullWidth
              data-e2e-id="exchangeDialog.receiveAmountInput"
            />
          </Grid>
          {error && (
            <Grid xs={12} item>
              <FormHelperText error>{error}</FormHelperText>
            </Grid>
          )}
        </Grid>
      </Box>
    </Dialog>
  );
};
