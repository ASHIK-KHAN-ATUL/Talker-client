import axios from "axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";

export const axiosSecure = axios.create({
    baseURL: 'https://talker-server.vercel.app'
})

const useAxiosSecure = () => {

    const {logout} = useAuth();
    const navigate = useNavigate();

    axiosSecure.interceptors.request.use(function(config){
        const token = localStorage.getItem('Access-token');
        console.log('Request Stopped By Interceptors');
        config.headers.authorization = `Bearer ${token}`;
        return config;
    }, function(error){
        return Promise.reject(error);
    });


    axiosSecure.interceptors.response.use(function(response){
        return response;
    }, async(error)=>{
        const status = error.response.status;
        if(status === 401 || status === 403){
            await logout();
            navigate('/login')
        }
        console.log('Status error in the interceptos', error);
        return Promise.reject(error)
    })

    return axiosSecure;
};

export default useAxiosSecure;