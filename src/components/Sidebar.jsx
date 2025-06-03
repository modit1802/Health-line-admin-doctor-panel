import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'
import { DoctorContext } from '../context/DoctorContext'

const Sidebar = () => {
  const { aToken } = useContext(AdminContext)
  const { dToken } = useContext(DoctorContext)

  // Helper function to render NavLink items with consistent styles
  const renderNavItem = (to, icon, label) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-3.5 cursor-pointer transition-all
         hover:bg-[#F2F3FF] md:min-w-60 lg:min-w-72
         box-border
         ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`
      }
    >
      <img
        src={icon}
        alt={label}
        className="w-5 h-5 flex-shrink-0"
        style={{ boxSizing: 'content-box' }}
      />
      <p className="hidden md:block text-sm font-medium">{label}</p>
    </NavLink>
  )

  return (
    <div className='min-h-screen bg-white border-r'>
      {aToken && (
        <ul className='text-[#515151] mt-5'>
          {renderNavItem('/admin-dashboard', assets.home_icon, 'Dashboard')}
          {renderNavItem('/all-appointments', assets.appointment_icon, 'Appointments')}
          {renderNavItem('/add-doctor', assets.add_icon, 'Add Doctor')}
          {renderNavItem('/doctor-list', assets.people_icon, 'Doctors List')}
        </ul>
      )}

      {dToken && (
        <ul className='text-[#515151] mt-5'>
          {renderNavItem('/doctor-dashboard', assets.home_icon, 'Dashboard')}
          {renderNavItem('/doctor-appointments', assets.appointment_icon, 'Appointments')}
          {renderNavItem('/doctor-profile', assets.people_icon, 'Profile')}
        </ul>
      )}
    </div>
  )
}

export default Sidebar
