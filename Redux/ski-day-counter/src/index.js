import C from './constants'
import { allSkiDays } from './store/reducers'

const state = [
  {
    "resort": "Kirkwood",
    "date": "2016-12-15",
    "powder": true,
    "backcountry": false
  },
  {
    "resort": "Boreal",
    "date": "2016-12-16",
    "powder": false,
    "backcountry": true
  }
]

const action = {
  type: C.REMOVE_DAY,
  payload: "2016-12-16"
}

const nextState = allSkiDays(state, action);

console.log(`
  Initial state: ${JSON.stringify(state)}
  Action: ${JSON.stringify(action)}
  New state: ${JSON.stringify(nextState)}
`)