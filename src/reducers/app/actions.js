import * as c from './constants';

export const loadBitcoin = () => ({
  type: c.LOAD,
  payload: 'bitcoin'
});

export const loadSuccess = (data) => ({
  type: c.LOAD_SUCCESS,
  data
});

export const loadFail = (error) => ({
  type: c.LOAD_FAIL,
  error
});

export const loadEthereum = () => ({
  type: c.LOAD,
  payload: 'ethereum'
});