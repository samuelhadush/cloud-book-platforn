import * as React from 'react'
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';

type UserType = {id:number, email:string, password:string, role:string}

const cookies = new Cookies();
export const useAuth=()=>{
    const [isAuthenticated, setIsAuthenticated]=React.useState<boolean>(false);
    const navigate=useNavigate()

    // validate session
    React.useEffect(()=>{
        // if token exist set to true
        const hasToke = getToken()?true:false;
        setIsAuthenticated(hasToke)
    },[cookies.get('accessToken')])

    const setCookies=(accessToken:string, user:UserType)=>{
        cookies.set('accessToken',accessToken)
        cookies.set('user',user)
    }
    const getToken=()=>cookies.get('accessToken');
    const getUser = ()=>cookies.get('user');
    const logout = ()=>{
        cookies.remove('accessToken')
        cookies.remove('user')
        navigate('/signin')
    }
    // check if token exist 
    // const isAuthenticated=(()=>cookies.get('accessToken'))()

    return {isAuthenticated, getToken, getUser, setCookies,logout};
}