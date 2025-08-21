import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Link, useNavigate } from 'react-router-dom'
import axiosInstance from '../../axiosInterceptor'
import toast from 'react-hot-toast'

const Register = () => {
  
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();


    const registerHandler = async (e) => {
        e.preventDefault();
        try{
        const userData = {"fullName" : {
            "firstName":firstname,
            "lastName":lastname
        },
        email,
        password
    }
    
    const response = await axiosInstance.post('/api/users/create',
        userData,
    )

    if(response.status===201){
        toast.success("User Register Sucessfully.")
        const data = response.data;
        localStorage.setItem("token", data.token);
        navigate("/dashboard");
    }else{
        toast.error(error.message);
    }
}catch(error){
    console.error(error);
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
                    <div className='flex flex-col'>
                        <label htmlFor="">First Name</label>
                        <input
                        type="text"
                        placeholder="First name"
                        required
                        className="bg-[#eeeeee] border border-gray-300 px-3 py-3 w-full mb-4"
                        onKeyUp={(e) => setFirstname(e.target.value)}

                    />
                    <label htmlFor="">Last Name</label>
                        <input
                        type="text"
                        placeholder="Last name"
                        required
                        className="bg-[#eeeeee] border border-gray-300 px-3 py-3 w-full mb-4"
                        onKeyUp={(e) => setLastname(e.target.value)}
                    />
                    </div>
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
                onClick={registerHandler}
            >
                Register
            </button>
            <p className='text-center'>Already have account? <Link to="/login" className='text-blue-500'>Login</Link></p>
            </form>
            </div>
      </div>
    </>
  )
}

export default Register
