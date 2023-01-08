import React from 'react';
import ReactDOM from 'react-dom/client'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {
  const increaseGood = () => {
    store.dispatch({
      type: 'GOOD'
    })
  }

  const increaseOk = () => {
    store.dispatch({
      type: 'OK'
    })
  }

  const increaseBad = () => {
    store.dispatch({
      type: 'BAD'
    })
  }

  const resetStats = () => {
    store.dispatch({
      type: 'ZERO'
    })
  }

  return (
    <div>
      <button onClick={increaseGood}>good</button>
      <button onClick={increaseOk}>ok</button>
      <button onClick={increaseBad}>bad</button>
      <button onClick={resetStats}>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>ok {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)
