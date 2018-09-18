import { combineReducers } from 'redux';
import * as c from './constants';

const initialState = {
  isLoading: false,
  isLoaded: false,
  data: []
};

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case c.LOAD:
      return {
        isLoading: true,
        isLoaded: false,
        data: []
      };
    case c.LOAD_FAIL:
      return {
        isLoading: false,
        isLoaded: true,
        data: []
      };
    case c.LOAD_SUCCESS:
      return {
        isLoading: false,
        isLoaded: true,
        data: [...action.data] 
      };
    default:
      return state;
  }
}

export default reducer;