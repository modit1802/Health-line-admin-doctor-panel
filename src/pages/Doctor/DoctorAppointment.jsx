import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'

const DoctorAppointment = () => {
  const { dToken, appointments, getAppointments, cancelAppointment, completeAppointment } = useContext(DoctorContext)
  const { calculateAge, slotDateFormat, currencySymbol } = useContext(AppContext)

  useEffect(() => {
    if (dToken) {
      getAppointments()
    }
  }, [dToken])

  return (
    <div className='w-full max-w-6xl mx-auto p-4'>
      <p className='mb-4 text-lg font-semibold'>All Appointments</p>

      <div className='bg-white rounded overflow-y-auto max-h-[80vh] min-h-[50vh] text-sm'>

        {/* Desktop Table Header */}
        <div className='hidden sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 py-3 px-6 border-b'>
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Action</p>
        </div>

        {/* Data Rows */}
        {appointments.map((item, index) => (
          <div
            key={index}
            className='flex flex-col sm:grid sm:grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-3 sm:gap-1 p-4 border-b hover:bg-gray-50 transition'
          >
            {/* Index (hidden in mobile) */}
            <p className='hidden sm:block'>{index + 1}</p>

            {/* Patient Info */}
            <div className='flex items-center gap-2'>
              <img className='w-8 h-8 rounded-full object-cover' src={item.userData.image} alt={item.userData.name} />
              <p>{item.userData.name}</p>
            </div>

            {/* Payment Type */}
            <p>
              <span className={`text-xs px-2 py-0.5 rounded-full border ${item.payment ? 'border-green-500 text-green-600' : 'border-yellow-500 text-yellow-600'}`}>
                {item.payment ? 'Online' : 'CASH'}
              </span>
            </p>

            {/* Age (hidden in mobile) */}
            <p className='hidden sm:block'>{calculateAge(item.userData.dob)}</p>

            {/* Date & Time */}
            <p>{slotDateFormat(item.slotDate)}, {item.slotTime}</p>

            {/* Fees */}
            <p>{currencySymbol}{item.amount}</p>

            {/* Action */}
            <div className='flex items-center gap-2'>
              {item.cancelled ? (
                <span className='text-red-500 text-xs border border-red-500 rounded-full px-3 py-0.5'>Cancelled</span>
              ) : item.isCompleted ? (
                <span className='text-green-500 text-xs border border-green-400 rounded-full px-3 py-0.5'>Completed</span>
              ) : (
                <div className='flex gap-2'>
                  <img
                    onClick={() => cancelAppointment(item._id)}
                    className='w-6 h-6 cursor-pointer'
                    src={assets.cancel_icon}
                    alt="Cancel"
                  />
                  <img
                    onClick={() => completeAppointment(item._id)}
                    className='w-6 h-6 cursor-pointer'
                    src={assets.tick_icon}
                    alt="Complete"
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DoctorAppointment
