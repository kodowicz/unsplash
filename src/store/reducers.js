import { combineReducers } from 'redux';
const initState = null;


const detailsReducer = (state = initState, action) => {
  switch (action.type) {
    case 'SHOW_DETAILS':
      return action.payload;

    case 'SHOW_DETAILS':
      return null;

    default:
      return state;
  }
}

export default combineReducers({
  details: detailsReducer
});
