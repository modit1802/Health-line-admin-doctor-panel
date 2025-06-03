import { createContext, useState } from "react";
import axios from "axios";
export const AdminContext = createContext();
import {toast} from 'react-toastify';
const AdminContextProvider = (props) => {
    const [aToken, setAToken] = useState(localStorage.getItem('aToken')?localStorage.getItem('aToken'):'' );
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [doctors, setDoctors] = useState([]);
    const [appointments,setAppointments]= useState([]);
    const [dashData,setDashData]=useState(false)
    const getallDoctors = async () => {
        try {
            const {data}= await axios.post(backendUrl+'/api/admin/all-doctors',{},{headers:{aToken}})
            if (data.success) {
                setDoctors(data.doctors);
                console.log("Doctors fetched successfully:", data.doctors);
                
            }
            else{
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    const changeAvailability = async (docId) => {
        try {
            const {data} = await axios.post(backendUrl+'/api/admin/change-availability',{docId},{headers:{aToken}})
            if (data.success) {
                toast.success(data.message);
                // Optionally, you can refetch the doctors list after changing availability
                getallDoctors();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    const getAllAppointments= async()=>{
        try {
            const {data}= await axios.get(backendUrl+'/api/admin/appointments',{headers:{aToken}})
            if(data.success){
                setAppointments(data.appointments)
                console.log(data.appointments);
                
            }
            else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    const cancelAppointment = async(appointmentId)=>{
        try {
            const {data}= await axios.post(backendUrl+'/api/admin/cancel-appointment',{appointmentId},{headers:{aToken}})
            if (data.success) {
                toast.success(data.message)
                getAllAppointments()
            }
            else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    const getDashData=async()=>{
        try {
            const {data}= await axios.get(backendUrl+'/api/admin/dashboard',{headers:{aToken}})
            if (data.success) {
                setDashData(data.dashData)
                console.log(data.dashData);
                
            }
            else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message);
        }
    }
    const value = {
        // You can add your admin-related state and functions here
        aToken,setAToken,
        backendUrl,
        doctors,
        getallDoctors,
        changeAvailability,
        appointments,setAppointments,
        getAllAppointments,
        cancelAppointment,
        dashData,
        getDashData
    };

    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    );
}

export default AdminContextProvider;
