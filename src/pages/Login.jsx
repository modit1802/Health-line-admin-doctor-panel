import React, { useContext, useState } from 'react'
import {assets} from '../assets/assets'
import { AdminContext } from '../context/AdminContext'
import axios from 'axios' // Import axios for making HTTP requests
import { toast } from 'react-toastify'
import { DoctorContext } from '../context/DoctorContext'
const Login = () => {

 const[state,setState]=useState('Admin')
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');
 const {setAToken,backendUrl}=useContext(AdminContext)
 const {setDToken}=useContext(DoctorContext)


 const onSubmitHandler = async (event)=>{
    event.preventDefault(); //when we submit the form, it will not refresh the page
    try {
        if (state==='Admin') {
            
            const {data}=  await axios.post(backendUrl+'/api/admin/login', {email, password})
            if(data.success){
                console.log(data.token);
                localStorage.setItem('aToken', data.token); // Store the token in local storage
                setAToken(data.token); // Set the admin token in context
            }
            else{
                toast.error(data.message || 'Login failed, please try again');
            }

        } else {
            //doctor login api
            const {data}= await axios.post(backendUrl+'/api/doctor/login',{email,password})
            if(data.success){
                localStorage.setItem('dToken',data.token)
                setDToken(data.token)
                console.log(data.token);
                
            }
            else{
                toast.error(data.message || 'Login failed, please try again');
            }
        }
    } catch (error) {
        console.log(error.response?.data || error.message);
    }
 }

  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
        <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] shadow-lg'>
            <p className='text-2xl font-semibold m-auto'><span className='text-primary'>{state} </span>Login</p>
            <div className='w-full'>
                <p>Email</p>
                <input onChange={(e)=>setEmail(e.target.value)} value={email} className='w-full mt-1 border border-[#DADADA] rounded p-2' type="email" required />
            </div>
            <div className='w-full'>
                <p>Password</p>
                <input onChange={(e)=>setPassword(e.target.value)} value={password} className='w-full mt-1 border border-[#DADADA] rounded p-2' type="password" required />
            </div>
            <button className='bg-primary text-white w-full py-2 rounded-md text-base'>Login</button>
            <div>
                {
                    state === 'Admin' ? (
                       <p>Doctor Login? <span className='text-primary underline cursor-pointer' onClick={()=>setState('Doctor')}>Click here</span></p>
                    ) : (
                        <p>Admin Login? <span className='text-primary underline cursor-pointer' onClick={()=>setState('Admin')}>Click here</span></p>
                    )
                }
            </div>
        </div>
    </form>
  )
}

export default Login
