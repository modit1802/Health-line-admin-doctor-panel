import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import { AdminContext } from '../../context/AdminContext'
import {toast} from 'react-toastify'
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css'
const AddDoctor = () => {
    const [docImg,setDocImg] = useState(false)
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [experience,setExperience] = useState('1 Year')
    const [fees,setFees] = useState('')
    const [speciality,setSpeciality] = useState('General Physician')
    const [education,setEducation] = useState('')
    const [address1,setAddress1] = useState('')
    const [address2,setAddress2] = useState('')
    const [about,setAbout] = useState('')
    const [degree,setDegree] = useState('')

    const {backendUrl,aToken}=useContext(AdminContext)

    const onSubmitHandler=async(event)=>{
        event.preventDefault()
        try {
            if(!docImg) {
                return toast.error('Please upload a doctor image')
            }
            const formData = new FormData()
            formData.append('image',docImg)
            formData.append('name',name)
            formData.append('email',email)
            formData.append('password',password)
            formData.append('experience',experience)
            formData.append('fees',Number(fees))
            formData.append('about',about)
            formData.append('speciality',speciality)
            formData.append('address',JSON.stringify({line1:address1,line2:address2}))
            formData.append('degree',education)
            
            formData.forEach((value,key)=>{
                console.log(`${key}: ${value}`);
            })

            const{data}= await axios.post(backendUrl+'/api/admin/add-doctor',formData,{headers:{aToken}})
            if(data.success){
                toast.success(data.message)
                setDocImg(false)
                setName('')
                setEmail('')
                setPassword('')
                setExperience('1 Year')
                setFees('')
                setSpeciality('General Physician')
                setEducation('')
                setAddress1('')
                setAddress2('')
                setAbout('')

            }
            else{
                toast.error(data.message)
            }
            
        } catch (error) {
            toast.error(error.message || 'Something went wrong')
        }
    }

    return (
        <form className='m-5 w-full' onSubmit={onSubmitHandler}>
            <p className='mb-3 text-lg font-medium'>Add Doctor</p>
            <div className='bg-white px-8 py-8 rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll'>
                <div className='flex items-center gap-4 mb-8 text-gray-500'>
                    <label htmlFor="doc-img">
                        <img className='w-16 bg-gray-100 rounded-full cursor-pointer' src={docImg?URL.createObjectURL(docImg): assets.upload_area} alt="" />
                    </label>
                    <input onChange={(e)=>setDocImg(e.target.files[0])} type="file" id='doc-img' hidden />
                    <p>Upload doctor <br />image</p>
                </div>

                <div className='flex flex-col lg:flex-row items-start gap-10 text-gray-600'>
                    <div className='w-full lg:flex-1 flex flex-col gap-4'>
                        <div className='flex-1 flex flex-col gap-1'>
                            <p>Doctor Name</p>
                            <input className='border rounded px-3 py-2'  onChange={(e)=>setName(e.target.value)} value={name} type="text" placeholder='Name' required />
                        </div>
                        <div className='flex-1 flex flex-col gap-1'>
                            <p>Doctor Email</p>
                            <input className='border rounded px-3 py-2'  onChange={(e)=>setEmail(e.target.value)} value={email} type="email" placeholder='Email' required />
                        </div>
                        <div className='flex-1 flex flex-col gap-1'>
                            <p>Doctor Password</p>
                            <input className='border rounded px-3 py-2'  onChange={(e)=>setPassword(e.target.value)} value={password}  type="password" placeholder='Password' required />
                        </div>
                        <div className='flex-1 flex flex-col gap-1'>
                            <p>Experience</p>
                            <select className='border rounded px-3 py-2' onChange={(e)=>setExperience(e.target.value)} value={experience}  name="" id="">
                                <option value="1 Year">1 Year</option>
                                <option value="2 Years">2 Years</option>
                                <option value="3 Years">3 Years</option>
                                <option value="4 Years">4 Years</option>
                                <option value="5 Years">5 Years</option>
                                <option value="6 Years">6 Years</option>
                                <option value="7 Years">7 Years</option>
                                <option value="8 Years">8 Years</option>
                                <option value="9 Years">9 Years</option>
                                <option value="10 Years">10 Years</option>
                            </select>
                        </div>
                        <div className='flex-1 flex flex-col gap-1'>
                            <p>Fees</p>
                            <input className='border rounded px-3 py-2'  onChange={(e)=>setFees(e.target.value)} value={fees}  type="number" placeholder='Fees' required />
                        </div>
                    </div>
                    <div className='w-full lg:flex-1 flex flex-col gap-4'>
                    <div className='flex-1 flex flex-col gap-1'>
                        <p>Speciality</p>
                        <select className='border rounded px-3 py-2' onChange={(e)=>setSpeciality(e.target.value)} value={speciality}  name="" id="">
                            <option value="General Physician">General Physician</option>
                            <option value="Gynecologist">Gynecologist</option>
                            <option value="Dermatologist">Dermatologist</option>
                            <option value="Pediatricians">Pediatricians</option>
                            <option value="Neurologist">Neurologist</option>
                            <option value="Gastroenterologist">Gastroenterologist</option>
                        </select>

                        <div className='flex-1 flex flex-col gap-1'>
                            <p>Education</p>
                            <input  className='border rounded px-3 py-2' onChange={(e)=>setEducation(e.target.value)} value={education}  type="text" placeholder='Education' required />
                        </div>
                        <div className='flex-1 flex flex-col gap-1'>
                            <p>Address</p>
                            <input className='border rounded px-3 py-2' onChange={(e)=>setAddress1(e.target.value)} value={address1}  type="text" placeholder='address 1' required />
                            <input className='border rounded px-3 py-2' onChange={(e)=>setAddress2(e.target.value)} value={address2}  type="text" placeholder='address 2' required />
                        </div>
                    </div>
                    </div>
                </div>

                <div>
                    <p className='mt-4 mb-2'>About Doctor</p>
                    <textarea className='w-full px-4 pt-2 border rounded'  onChange={(e)=>setAbout(e.target.value)} value={about}  name="text" placeholder='Write about doctor' rows={5} required></textarea>
                </div>
                
                    <button className='bg-primary text-white px-10 py-3 mt-4 rounded-full' type='submit'>Add Doctor</button>
            
            </div>

        </form>
    )
}

export default AddDoctor