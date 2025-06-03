import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'

const DoctorsList = () => {
  const { doctors, getallDoctors, aToken, changeAvailability } = useContext(AdminContext)

  useEffect(() => {
    if (aToken) {
      getallDoctors();
    }
  }, [aToken])

  return (
    <div className='m-4 sm:m-5 max-h-[90vh] overflow-y-auto'>
      <h1 className='text-lg font-semibold mb-4'>All Doctors</h1>
      
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {
          doctors.map((item, index) => (
            <div
              key={index}
              className='border border-indigo-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition duration-300 bg-white'
            >
              <img
                className='w-full h-40 object-cover bg-indigo-50'
                src={item.image}
                alt={item.name}
              />
              <div className='p-4'>
                <p className='text-neutral-800 text-base font-semibold'>{item.name}</p>
                <p className='text-zinc-600 text-sm mb-2'>{item.speciality}</p>
                <label className='flex items-center gap-2 text-sm'>
                  <input
                    type="checkbox"
                    onChange={() => changeAvailability(item._id)}
                    checked={item.available}
                  />
                  <span>Available</span>
                </label>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default DoctorsList
