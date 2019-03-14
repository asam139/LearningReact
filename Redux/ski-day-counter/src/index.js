import storeFactory from './store'
import {addDay, removeDay, setGoal, randomGoals} from './actions'

const initialState = localStorage['redux-storage'] ?
  JSON.parse(localStorage['redux-storage']) :
  {};

const saveState = () => {
  localStorage['redux-storage'] = JSON.stringify(store.getState());
};

const store = storeFactory(initialState);

store.subscribe(saveState);


store.dispatch(
  addDay("Mt Shasta", "2016-10-28")
);

store.dispatch(
  removeDay("2016-10-28")
);

store.dispatch(
  setGoal(100)
);

store.dispatch(
  randomGoals()
)




