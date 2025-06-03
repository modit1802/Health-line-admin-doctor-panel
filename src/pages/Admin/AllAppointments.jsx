import React from 'react'
import { useContext } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { useEffect } from 'react'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'

const AllAppointments = () => {
  const { aToken, appointments, getAllAppointments, cancelAppointment } = useContext(AdminContext)
  const { calculateAge, slotDateFormat, currencySymbol } = useContext(AppContext)
  useEffect(() => {
    if (aToken) {
      getAllAppointments()
    }
  }, [aToken])
  return (
    <div className='w-full max-w-6xl m-5'>
      <p className='mb-3 text-lg font-medium'>All Appointments</p>
      <div className='bg-white border-rounded overflow-y-scroll text-sm rounded max-w-[200vh] min-h-[60vh]'>

        <div className='hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b'>
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Action</p>
        </div>
{
  appointments.map((item, index) => (
    <div
      key={index}
      className='grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-cols-1 gap-2 items-center text-gray-700 p-4 border-b hover:bg-gray-50'
    >
      {/* Desktop Serial Number */}
      <p className='hidden sm:block'>{index + 1}</p>

      {/* Patient */}
      <div className='flex items-center gap-2'>
        <img className='w-10 h-10 rounded-full' src={item.userData.image} alt='' />
        <div>
          <p className='font-medium'>{item.userData.name}</p>
          <p className='text-xs text-gray-500 sm:hidden'>
            Age: {calculateAge(item.userData.dob)}
          </p>
        </div>
      </div>

      {/* Age */}
      <p className='hidden sm:block'>{calculateAge(item.userData.dob)}</p>

      {/* Slot */}
      <div className='text-sm'>
        <p>{slotDateFormat(item.slotDate)}</p>
        <p className='text-gray-500'>{item.slotTime}</p>
      </div>

      {/* Doctor */}
      <div className='flex items-center gap-2'>
        <img className='w-10 h-10 rounded-full bg-gray-200' src={item.docData.image} alt='' />
        <div>
          <p className='font-medium'>{item.docData.name}</p>
        </div>
      </div>

      {/* Fee */}
      <p className='font-semibold'>
        {currencySymbol}
        {item.amount}
      </p>

      {/* Action */}
      <div>
        {item.cancelled ? (
          <p className='text-red-400 text-xs font-medium'>Cancelled</p>
        ) : item.isCompleted ? (
          <p className='text-green-500 text-xs font-medium'>Completed</p>
        ) : (
          <img
            className='w-8 cursor-pointer'
            onClick={() => cancelAppointment(item._id)}
            src={assets.cancel_icon}
            alt='cancel'
          />
        )}
      </div>
    </div>
  ))
}

      </div>
    </div>
  )
}

export default AllAppointments