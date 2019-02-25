import React, {Component, PropTypes} from 'react'

const Counter = ({value, onIncrement, onDecrement}) => {
  return(
    <React.Fragment>
    <button onClick={onIncrement}>
      Increment
    </button>
    <button onClick={onDecrement}>
      Decrement
    </button>
    <hr />
    <div>
      Click: {value} times
    </div>
    </React.Fragment>
  )
}

// Counter.PropTypes = {
//   value: PropTypes.number.isRequired,
//   increment: PropTypes.func.isRequired,
//   decrement: PropTypes.func.isRequired
// }

export default Counter
