import axios from 'axios';
import React, { useState } from 'react'
import toast  from 'react-hot-toast';


const Drawer = ({isOpen, setIsOpen, setRefresh}) => {

    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [status, setStatus] = useState("pending");

    const createHandler = async (e) => {
        e.preventDefault();
        const task = {title, description, status}
        try{
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/tasks/create`,
                task,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    }
                }
            )        
            if(response.status===201){
                setIsOpen(false);
                toast.success("Task Added Successfully!")
                setTitle('')
                setDescription('');
                setStatus("pending");
                setRefresh(prev => !prev);
            }else{
                toast.error("Sorry, Something went wrong.")
            }
          }catch(error){
            console.error(error.message);
             const errors = error.response?.data?.error;
              if (Array.isArray(errors)) {
              errors.forEach(err => toast.error(err.msg));
              } else if (typeof errors === "string") {
              toast.error(errors); // Show the string error from backend
              }else {
                  toast.error(error.message);
                  }
          }
        
      }
    
  return (
    <>
      <div className="relative">
      {/* Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-transparent bg-opacity-50 z-40"
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 w-full lg:w-100 h-screen bg-white shadow-lg transform transition-transform duration-300 z-50
          ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="p-4 flex justify-between items-center border-b">
          <h2 className="text-lg font-semibold">Add New Task</h2>
          <button 
          onClick={() => setIsOpen(false)} 
          className="text-gray-600 text-xl">
            &times;
          </button>
        </div>
        <div className="p-4">
          <form>
            <label>Title</label>
            <input
                type="text"
                placeholder="Task title"
                required
                className="bg-[#eeeeee] border border-gray-300 px-3 py-3 w-full mb-4"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <label>Description</label>
            <textarea
                type="text"
                placeholder="Task title"
                required
                className="bg-[#eeeeee] border border-gray-300 px-3 py-3 w-full mb-4"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <label>Status</label>
            <select className='bg-[#eeeeee] border border-gray-300 px-3 py-3 w-full mb-4'
                value={status}
                onChange={(e) => setStatus(e.target.value)}
            >
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="inprogress">Inprogress</option>
            </select>
             <button
                onClick = {createHandler}
                className=" cursor-pointer font-medium bg-yellow-800 px-3 py-3 text-white w-full mt-3 text-xl"
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
    </>
  )
}

export default Drawer
