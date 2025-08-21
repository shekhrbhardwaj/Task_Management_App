import React, { useEffect, useState } from 'react'
import TaskCard from './TaskCard'
import Drawer from './Drawer';
import EditDrawer from './EditDrawer';
import toast  from 'react-hot-toast';
import axiosInstance from '../../axiosInterceptor';


const Tasks = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [editTask, setEditTask] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [filter, setFilter] = useState("");
  
  const editDrawer = async (id) => {
    const editTask = await getTask(id);
    setEditTask(editTask);
    setIsEditOpen(true);
  }


  const getTask = async (id) => {
    try{
        const response = await axiosInstance.get(`/api/tasks/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          }
        }
        )
        if (response.status === 200) {
          return response.data.task;
        }
      }
      catch(error){
        console.error(error.message);
      }
    }

  const getTasks = async () => {
    try{
    const response = await axiosInstance.get(`${import.meta.env.VITE_BASE_URL}/api/tasks`,
      {
      params: filter ? { status: filter } : {},
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }
    }
    )
    if (response.status === 200) {
      return response.data.tasks;
    }
  }catch(error){
    console.error(error.message);
  }
  }

  useEffect(() => {
    const fetchTasks = async () => {
    const tasksArray = await getTasks();
    setTasks(tasksArray || []);
    };
    fetchTasks();
  }, [refresh, filter])

  const deleteTask = async (id) => {
    try{
    const response = await axiosInstance.post(`${import.meta.env.VITE_BASE_URL}/api/tasks/delete`,
            {taskId: id},
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                }
            }
        )        
        if(response.status===200){
            toast.success("Task Deleted Successfully!")
            setRefresh(prev => !prev);
        }else{
          toast.error("Sorry, Something went wrong.");
        }
      }catch(error){
        console.error(error.message);
        toast.error("Sorry, Something went wrong.");
      }
  }

  return (
    <>
    <div className='px-5 pt-2 flex flex-row justify-end'>
        <button onClick={() => setIsOpen(true)} className='cursor-pointer border-amber-700 border-2 rounded-md bg-amber-700 text-white p-3 font-bold'>+ Add New Task</button>
    </div>
     <div className='px-5 pt-2 flex flex-row justify-start'>
        <div className='flex flex-col sm:flex-row gap-2 items-start sm:items-center'>
          <label className="font-semibold text-amber-700">Filter By:</label>
          <select className='border border-amber-300 rounded-lg px-4 py-2
          bg-white text-amber-800 font-medium
          shadow-sm transition-all
          focus:outline-none focus:ring-2 focus:ring-amber-400
          hover:border-amber-500
          w-full sm:w-auto'
          onChange={(e) => setFilter(e.target.value)}
        >
            <option value="">All</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="inprogress">In Progress</option>
          </select>
        </div>
    </div>
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-rows-3 gap-2 justify-items p-4'>
       {tasks.length === 0 ? (
    <div className="col-span-3 text-center text-gray-500 py-20">
      No tasks found. Add a new task to get started!
    </div>
  ) : (
      tasks.map((task) => (
      <TaskCard
        key={task._id || task.id} 
        editDrawer={editDrawer}
        deleteTask={deleteTask}
        task={task}
      />
      ))
      )}
    </div>  
    
    <Drawer isOpen={isOpen} setIsOpen={setIsOpen} setRefresh={setRefresh}/>
    <EditDrawer isEditOpen={isEditOpen} setIsEditOpen={setIsEditOpen} editTask={editTask} setRefresh={setRefresh}/>
    </>
  )
}

export default Tasks
