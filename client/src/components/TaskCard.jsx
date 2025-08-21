import React from 'react'

const TaskCard = ({editDrawer, task, deleteTask}) => {
 
  return (
    <>
     <div className="rounded overflow-hidden shadow-lg m-2">
        <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{task.title}</div>
            <p className="text-gray-700 text-base">{task.description}            </p>
            <div className='flex flex-row pt-4'>
                <div className='w-90 '>
                    <span className=' bg-indigo-200 rounded-2xl px-5 py-1 text-indigo-800 capitalize'>{task.status}</span>
                </div> 
                <span className='w-10 text-right cursor-pointer bg-re' onClick={() => editDrawer(task._id)}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#372aac" strokeWidth="2" strokeLinecap="round" strokeinejoin="round" className="feather feather-edit-3"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg></span>
                <span className='w-10 text-right cursor-pointer bg-re' onClick={() => deleteTask(task._id)}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9f0712" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-trash-2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg></span>
            </div>
        </div>
        </div>
    </>
  )
}

export default TaskCard
