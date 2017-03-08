import 'babel-polyfill';
import React        from 'react'
import { render }   from 'react-dom';
import { 
  browserHistory, 
  hashHistory }     from 'react-router';
import Root         from './Root';
import './index.styl';

const history = (process.env.NODE_ENV === 'production') ? browserHistory : hashHistory;

render(
  <Root {...{ history }} />,
  document.getElementById('app')
);
