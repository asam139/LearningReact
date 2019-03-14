import C from './constants'
import storeFactory from './store'

const initialState = localStorage['redux-storage'] ?
  JSON.parse(localStorage['redux-storage']) :
  {};

const saveState = () => {
  localStorage['redux-storage'] = JSON.stringify(store.getState());
};

const store = storeFactory(initialState);

store.subscribe(saveState);


store.dispatch({
  type: C.ADD_DAY,
  payload: {
    "resort": "Mt Shasta",
    "date": "2016-10-28",
    "powder": false,
    "backcountry": true
  }
});

store.dispatch({
  type: C.ADD_DAY,
  payload: {
    "resort": "Squaw Valley",
    "date": "2012-10-11",
    "powder": false,
    "backcountry": false
  }
});

store.dispatch({
  type: C.ADD_DAY,
  payload: {
    "resort": "The Canyons",
    "date": "2016-10-01",
    "powder": true,
    "backcountry": true
  }
});



