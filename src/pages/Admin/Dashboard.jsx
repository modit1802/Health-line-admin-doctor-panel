import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { assets } from '../../assets/assets'
import { AppContext } from '../../context/AppContext'

const Dashboard = () => {
  const { aToken, cancelAppointment, dashData, getDashData } = useContext(AdminContext)
  const { slotDateFormat } = useContext(AppContext)

  useEffect(() => {
    getDashData()
  }, [aToken])

  return dashData && (
    <div className='m-6 space-y-8'>

      {/* Stats Cards */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
        {/* Doctors */}
        <div className='flex items-center gap-4 bg-white p-6 rounded-xl shadow hover:shadow-lg transition'>
          <img className='w-16' src={assets.doctor_icon} alt="Doctor Icon" />
          <div>
            <p className='text-2xl font-bold text-gray-700'>{dashData.doctors}</p>
            <p className='text-gray-500'>Doctors</p>
          </div>
        </div>

        {/* Appointments */}
        <div className='flex items-center gap-4 bg-white p-6 rounded-xl shadow hover:shadow-lg transition'>
          <img className='w-16' src={assets.appointments_icon} alt="Appointments Icon" />
          <div>
            <p className='text-2xl font-bold text-gray-700'>{dashData.appointments}</p>
            <p className='text-gray-500'>Appointments</p>
          </div>
        </div>

        {/* Patients */}
        <div className='flex items-center gap-4 bg-white p-6 rounded-xl shadow hover:shadow-lg transition'>
          <img className='w-16' src={assets.patients_icon} alt="Patients Icon" />
          <div>
            <p className='text-2xl font-bold text-gray-700'>{dashData.patients}</p>
            <p className='text-gray-500'>Patients</p>
          </div>
        </div>
      </div>

      {/* Latest Bookings */}
      <div className='bg-white rounded-xl shadow'>
        <div className='flex items-center gap-3 px-6 py-5 border-b'>
          <img src={assets.list_icon} className='w-6 h-6' alt="List Icon" />
          <h2 className='text-lg font-semibold text-gray-700'>Latest Bookings</h2>
        </div>

        <div>
          {dashData.latestAppointments.length > 0 ? (
            dashData.latestAppointments.map((item, index) => (
              <div key={index} className='flex items-center px-6 py-4 gap-4 hover:bg-gray-50 transition border-b'>
                <img className='rounded-full w-12 h-12 object-cover' src={item.docData.image} alt="Doctor" />
                <div className='flex-1 text-sm'>
                  <p className='text-gray-800 font-medium'>{item.docData.name}</p>
                  <p className='text-gray-500'>{slotDateFormat(item.slotDate)}</p>
                </div>
                {item.cancelled ? (
                  <span className='text-red-500 text-xs font-medium bg-red-50 px-3 py-1 rounded-full'>Cancelled</span>
                ) : item.isCompleted ? (
                  <span className='text-green-600 text-xs font-medium bg-green-50 px-3 py-1 rounded-full'>Completed</span>
                ) : (
                  <img
                    className='w-8 h-8 cursor-pointer hover:scale-110 transition'
                    onClick={() => cancelAppointment(item._id)}
                    src={assets.cancel_icon}
                    alt="Cancel"
                  />
                )}
              </div>
            ))
          ) : (
            <div className='px-6 py-4 text-gray-500 text-sm'>No recent bookings available.</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
