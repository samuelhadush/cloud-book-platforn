import * as React from 'react'
import Cookies from 'universal-cookie';

type UserType = {id:number, email:string, password:string, role:string}

const cookies = new Cookies();
export const useAuth=()=>{
    const [isAuthenticated, setIsAuthenticated]=React.useState<boolean>(false);

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
    // check if token exist 
    // const isAuthenticated=(()=>cookies.get('accessToken'))()

    return {isAuthenticated, getToken, getUser, setCookies};
}