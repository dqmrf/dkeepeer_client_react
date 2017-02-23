import React        from 'react'
import ReactDOM     from 'react-dom'
import { 
  browserHistory/*, 
  hashHistory*/ }   from 'react-router';
import Root         from './Root';

// const history = (process.env.NODE_ENV === 'production') ? browserHistory : hashHistory;

render(
  <Root {...{ browserHistory }} />,
  document.getElementById('app')
);
