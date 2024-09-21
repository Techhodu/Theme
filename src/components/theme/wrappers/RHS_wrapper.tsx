import React from 'react'
import RHS_1 from '../RHS_1'

export default function RHS_wrapper() {
  return (
    <div className="col-span-3 flex flex-col gap-3 md:flex-row lg:col-span-1 lg:flex-col">
          <RHS_1 limit={6} />
          <RHS_1 limit={6} />
        </div>
  )
}
