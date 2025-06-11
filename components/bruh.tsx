import React from 'react'

type Props = {
  children: React.ReactNode
}

const Bruh = (props: Props) => {
  return (
    <div>Bruh {props.children}</div>
  )
}

export default Bruh
