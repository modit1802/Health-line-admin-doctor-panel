import React from 'react';
import { assets } from '../assets/assets';
import { useContext } from 'react';
import { AdminContext } from '../context/AdminContext';
import { useNavigate } from 'react-router-dom';
import { DoctorContext } from '../context/DoctorContext';
const NavBar = () => {
  const {aToken,setAToken}=useContext(AdminContext)
  const {dToken,setDToken}=useContext(DoctorContext)
  const navigate=useNavigate();
  const logout=()=>{
    navigate('/'); // Redirect to the login page
    aToken && setAToken(''); // Clear the admin token from context
    dToken && setDToken(''); // Clear the doctor token from context
    aToken && localStorage.removeItem('aToken'); // Remove the token from local storage
    dToken && localStorage.removeItem('dToken'); 
  }
  return (
    <div className='flex justify-between items-center bg-white px-4 sm:px-10 border-b'>
      <div className='flex items-center gap-2 text-xs'>
        <img className='w-60 sm:40 cursor-pointer' src={assets.admin_logo} alt="" />
        <p className='border px-2.5 rounded-full border-gray-500'>{aToken? 'Admin': 'Doctor'}</p>
      </div>
      <button onClick={logout} className='bg-primary text-white rounded-full text-sm px-10 py-2 mt-2'>Logout</button>
    </div>
  );
}

export default NavBar;
