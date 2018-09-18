import { all, fork, take, put, call } from 'redux-saga/effects';
import axios from 'axios';

import * as c from 'reducers/app/constants';
import * as actions from 'reducers/app/actions';

const BITCOIN_ENDPOINT = 'https://min-api.cryptocompare.com/data/histoday?fsym=BTC&tsym=USD&limit=100';
const ETHEREUM_ENDPOINT = 'https://min-api.cryptocompare.com/data/histoday?fsym=ETH&tsym=USD&limit=100';

function* load() {

    while (true) {
        const action = yield take(c.LOAD);

        let endpoint = BITCOIN_ENDPOINT;
        if(action.payload === 'ethereum') endpoint = ETHEREUM_ENDPOINT;

        try {
            const response = yield call(axios.get, endpoint);
            yield put(actions.loadSuccess(response.data.Data));
        } catch(err) {
            yield put(actions.loadFail(err));
        }
    }
}

function* watch() {
    yield all([fork(load)]);
}

export default watch;
