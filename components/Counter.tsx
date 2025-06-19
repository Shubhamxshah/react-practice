'use client'

import { decrement, increment, incrementByAmount } from '@/State/Counter/counter-slice';
import { RootState } from '@/State/store'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Counter = () => {

  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
    <h2>{count}</h2>
      <button onClick={() => dispatch(increment())}> Increment</button>
      <button onClick={() => dispatch(decrement())}> Decrement</button>
      <button onClick={() => dispatch(incrementByAmount(10))}> Increment 10</button>  
    </div>
  )
}

export default Counter
