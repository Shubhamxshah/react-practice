'use client'

import { decrement, increment, incrementAsync, incrementByAmount } from '@/State/Counter/counter-slice';
import { AppDispatch, RootState } from '@/State/store'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Counter = () => {

  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div>
    <h2>{count}</h2>
      <button onClick={() => dispatch(increment())}> Increment</button>
      <button onClick={() => dispatch(decrement())}> Decrement</button>
      <button onClick={() => dispatch(incrementByAmount(10))}> Increment 10</button>
      <button onClick={() => dispatch(incrementAsync(5))}>Decrement 5</button>
    </div>
  )
}

export default Counter
