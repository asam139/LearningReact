import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import store from './store';
import { getReadableStories } from './selectors/story';
import { STORY_ARCHIVE } from './constants/actionTypes';

ReactDOM.render(
  <App stories={getReadableStories(store.getState())} onArchive={ (id) => { store.dispatch({type: STORY_ARCHIVE, id}) } }/>,
  document.getElementById('root')
);

//ReactDOM.render(<App />, document.getElementById('root'));
