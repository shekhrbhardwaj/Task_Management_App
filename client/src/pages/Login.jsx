import React, { useState } from 'react'
import Header from '../components/Header'
import { Link, useNavigate } from 'react-router-dom'
import axiosInstance from '../../axiosInterceptor';
import toast from 'react-hot-toast';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();


    const submitHandler = async (e) => {
        e.preventDefault();
            const userData = {
            email: email,
            password: password,
        };
try{
         const response = await axiosInstance.post(
            `${import.meta.env.VITE_BASE_URL}/api/users/login`,
            userData
        );
    if (response.status === 200) {
      const data = response.data;
      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    }
}catch(error){
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
        
        <Header/>
        <div className='flex items-center justify-center min-h-screen'>
        <div className='p-7 w-full max-w-md bg-white rounded shadow'>
            <form className='flex flex-col '>
                <label htmlFor="">Email</label>
                <input
                type="text"
                placeholder="email@example.com"
                required
                className="bg-[#eeeeee] border border-gray-300 px-3 py-3 w-full mb-4"
                onKeyUp={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="">Password</label>
                <input
                type="password"
                placeholder="********"
                required
                className="bg-[#eeeeee] border border-gray-300 px-3 py-3 w-full mb-4"
                onKeyUp={(e) => setPassword(e.target.value)}

            />
            <button
                className="cursor-pointer font-medium bg-yellow-800 px-3 py-3 text-white w-full mt-3 text-xl"
                onClick={submitHandler}
            >
                Login
            </button>
            <p className='text-center'>Not having account? <Link to="/register" className='text-blue-500'>Register</Link></p>
            
            </form>
        </div>
        </div>
    </>
  )
}

export default Login
