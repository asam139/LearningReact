import C from './constants'

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
