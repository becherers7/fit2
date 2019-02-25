import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';

import reducer from './reducers/reducers.js';
import Counter from './components/Counter.js';

const store = createStore(reducer);

console.log("current state: ", store.getState());


const title = 'My Minimal React Webpack Babel Setup';
const action = type =>store.dispatch({type});

function render(){
  ReactDOM.render(
    <Counter
    value={store.getState()}
    onIncrement={() => action('INCREMENT')}
    onDecrement={() => action('DECREMENT')} />,
    document.getElementById('app')
  );
}

render();

store.subscribe(render);
