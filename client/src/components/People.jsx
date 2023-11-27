import React, { useState } from 'react'
import Members from './Members'
const People = () => {
//   const [title , setTitle ] =useState("Student")
    return (
    
    <div className='flex flex-col flex-wrap justify-center gap-10 divide-y divide-neutral-200 max-w-2xl mx-auto px-4 '>
           <div>
            <Members title="Teacher" />
            </div>
            {/* <div className='bg-gray-400 border-black w-6/6 h-1 justify-self-center'>
                </div>  */}
            <div>
            <Members title="Student" />
            </div>
    </div>
  )
}

export default People