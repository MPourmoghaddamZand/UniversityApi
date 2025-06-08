import React from 'react'
import Students from './components/Students'
import ManageStudent from './components/ManageStudent'

const App = () => {
  return (
    <div className='w-full h-screen flex flex-col justify-center items-center gap-4 bg-slate-800'>
      <Students/>
      <ManageStudent />
    </div>
  )
}

export default App