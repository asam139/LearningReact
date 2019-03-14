import C from './constants'
import appReducer from './store/reducers'
import { createStore} from 'redux'

const initialState = localStorage['redux-storage'] ?
  JSON.parse(localStorage['redux-storage']) :
  {};

const store = createStore(appReducer, initialState);

// For debugging
window.store = store;

store.subscribe(() => {

  localStorage['redux-storage'] = JSON.stringify(store.getState());

});

/*
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
  type: C.SET_GOAL,
  payload: 20
});*/

const unsubcribeGoalLogger = store.subscribe(() => {
  console.log(`
    Goal: ${store.getState().goal}
  `)
});

setInterval(() => {

  store.dispatch({
    type: C.SET_GOAL,
    payload: Math.floor(Math.random() * 100)
  });

}, 250);

setInterval(() => {

  unsubcribeGoalLogger();

}, 3000);