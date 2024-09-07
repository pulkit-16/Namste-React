import React from 'react'
import { useRouteError } from 'react-router-dom'

const Error = () => {
   const err = useRouteError();

   console.log(err);
  return (
    <div>
        <h1>Something went wrong</h1>
      
        <h2>{err.status}</h2>
    </div>
  )
}

export default Error