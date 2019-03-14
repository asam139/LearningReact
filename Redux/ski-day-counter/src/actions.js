import C from './constants'
import fetch from 'isomorphic-fetch'

export const addDay = (resort, date, powder=false, backcountry=false) => {
  return {
    type: C.ADD_DAY,
    payload: {resort, date, powder, backcountry}
  }
};


export const removeDay = date => {
  return {
    type: C.REMOVE_DAY,
    payload: date
  }
};

export const setGoal = goal => ({
  type: C.SET_GOAL,
  payload: goal
});

export const addError = message => ({
  type: C.ADD_ERROR,
  payload: message
});

export const clearError = index => ({
  type: C.CLEAR_ERROR,
  payload: index
});

export const changeSuggestions = suggestions => ({
  type: C.CHANGE_SUGGESTIONS,
  payload: suggestions
});


export const clearSuggestions = () => ({
  type: C.CHANGE_SUGGESTIONS
});


export const randomGoals = () => (dispatch, getState) => {
  if (getState().resortNames.fetching) {
    return
  }

  dispatch({
    type:C.FETCH_RESORT_NAMES
  });

  setTimeout(() => {
    dispatch({
      type:C.CANCEL_FETCHING
    });
  },15000)
};

export const suggestResortNames = value => (dispatch) => {

  dispatch({
    type: C.FETCH_RESORT_NAMES
  });

  fetchResorts(value)
    .then(suggestions => {

      dispatch(
        changeSuggestions(suggestions)
      );

    })
    .catch(error => {

      dispatch(
        addError(error.message)
      );

      dispatch({
        type: C.CANCEL_FETCHING
      })

    })
};

//===================================================
// async function
const fetchResorts = async (value) => {
  // await response of fetch call
  let response = await fetch('http://localhost:3333/resorts/' + value);
  // only proceed once promise is resolved
  let data = await response.json();
  // only proceed once second promise is resolved
  return data;
}

// trigger async function
// log response or catch error of fetch promise