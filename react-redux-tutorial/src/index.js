import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import store from './store';

ReactDOM.render(
  <App stories={store.getState()} onArchive={() => {}}/>,
  document.getElementById('root')
);

//ReactDOM.render(<App />, document.getElementById('root'));
