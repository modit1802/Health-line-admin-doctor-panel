import React, { useContext, useEffect, useState } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const DoctorProfile = () => {
  const { profileData, dToken, setProfileData, getProfileData, backendUrl } = useContext(DoctorContext)
  const { currencySymbol } = useContext(AppContext)
  const [isEdit, setIsEdit] = useState(false)

  const updateProfile = async () => {
    try {
      const updateData = {
        address: profileData.address,
        fees: profileData.fees,
        available: profileData.available,
        about: profileData.about,
        experience: profileData.experience
      }
      const { data } = await axios.post(backendUrl + '/api/doctor/update-profile', updateData, { headers: { dToken } })
      if (data.success) {
        toast.success(data.message)
        setIsEdit(false)
        getProfileData()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
      console.error(error)
    }
  }

  useEffect(() => {
    if (dToken) getProfileData()
  }, [dToken])

  return (
    profileData && (
      <div className="max-w-5xl mx-auto p-6 bg-white rounded shadow-md">
        <div className="flex flex-col sm:flex-row gap-8">
          {/* Left side: Profile Photo + Name + Basic info */}
          <div className="sm:w-64 flex flex-col items-center text-center border-r border-gray-200 pr-6">
            <img
              src={profileData.image}
              alt={profileData.name}
              className="w-40 h-40 rounded-full object-cover border border-gray-300"
              loading="lazy"
            />
            <h1 className="mt-4 text-2xl font-semibold text-gray-900">{profileData.name}</h1>
            <p className="text-gray-600 mt-1">{profileData.degree}</p>
            <p className="text-gray-600">{profileData.speciality}</p>
            {isEdit ? (
              <input
                type="number"
                value={profileData.experience}
                onChange={(e) =>
                  setProfileData((prev) => ({
                    ...prev,
                    experience: e.target.value,
                  }))
                }
                className="mt-2 w-24 text-center px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Experience"
              />
            ) : (
              <span className="mt-2 inline-block bg-blue-100 text-primary text-sm font-medium px-3 py-1 rounded-full">
                {profileData.experience} years experience
              </span>
            )}

          </div>

          {/* Right side: Detailed Info */}
          <div className="flex-1">
            {/* About */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 border-b border-gray-300 pb-2 mb-3">About</h2>
              {
                isEdit ? (
                  <textarea name="about" value={profileData.about} onChange={e => setProfileData(prev => ({ ...prev, about: e.target.value }))} rows={5} cols={80} id=""></textarea>
                ) :
                  (<p className="text-gray-700 leading-relaxed text-justify">{profileData.about}</p>)
              }
            </section>

            {/* Appointment Fee */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 border-b border-gray-300 pb-2 mb-3">Appointment Fee</h2>
              <div>
                {isEdit ? (
                  <input
                    type="number"
                    value={profileData.fees}
                    onChange={e => setProfileData(prev => ({ ...prev, fees: e.target.value }))}
                    className="border rounded px-3 py-2 w-32 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                ) : (
                  <p className="text-gray-700 text-lg font-semibold">
                    {currencySymbol} {profileData.fees}
                  </p>
                )}
              </div>
            </section>

            {/* Address */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 border-b border-gray-300 pb-2 mb-3">Address</h2>
              {isEdit ? (
                <>
                  <input
                    type="text"
                    value={profileData.address.line1}
                    onChange={e =>
                      setProfileData(prev => ({
                        ...prev,
                        address: { ...prev.address, line1: e.target.value },
                      }))
                    }
                    className="border rounded px-3 py-2 w-full mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Line 1"
                  />
                  <input
                    type="text"
                    value={profileData.address.line2}
                    onChange={e =>
                      setProfileData(prev => ({
                        ...prev,
                        address: { ...prev.address, line2: e.target.value },
                      }))
                    }
                    className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Line 2"
                  />
                </>
              ) : (
                <p className="text-gray-700 whitespace-pre-line">
                  {profileData.address.line1}
                  <br />
                  {profileData.address.line2}
                </p>
              )}
            </section>

            {/* Availability */}
            <section>
              <label className="inline-flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={profileData.available}
                  onChange={() => isEdit && setProfileData(prev => ({ ...prev, available: !prev.available }))}
                  disabled={!isEdit}
                  className="w-5 h-5 rounded border-gray-300"
                />
                <span className="text-gray-700 font-medium select-none">Available</span>
              </label>
            </section>

            {/* Buttons */}
            <div className="mt-8">
              {isEdit ? (
                <button
                  onClick={updateProfile}
                  className="px-6 py-2 bg-primary text-white rounded hover:bg-primary transition"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={() => setIsEdit(true)}
                  className="px-6 py-2 bg-primary text-white rounded hover:bg-primary transition"
                >
                  Edit
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  )
}

export default DoctorProfile
