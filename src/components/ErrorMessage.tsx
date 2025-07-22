import React, { type PropsWithChildren } from 'react'

export const ErrorMessage = ({children} : PropsWithChildren) => {
  return (
    <div className='text-center my-4 bg-red-dark text-white font-bold p-3 uppercase'>{children}</div>
  )
}
