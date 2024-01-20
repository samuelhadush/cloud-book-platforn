import * as React from 'react'
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import {z} from 'zod'
import { Button } from './ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useAuth } from '../hooks/useAuth';

const schema= z.object({
  email: z.string().email(),
  password: z.string().min(4, { message: 'password must be atleast 4 characters'}),
});
export default function SignIn() {
  const { register, handleSubmit, formState: { errors } } = useForm({resolver: zodResolver(schema),});
  const {setCookies}=useAuth()
  const navigate=useNavigate()

  const handleLogin = handleSubmit(async(data)=> {
    const res = await fetch('http://localhost:8181/login', {
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify(data)
    })
    if(res.ok){
      const {user,accessToken}=await res.json()
      toast.success(`login successfully`)
      setCookies(accessToken,user)
      // redirect to dashboard
      navigate('/')
    }
    else {
      console.log(res.statusText)
      toast.error(`Failed to login, please try again `)
    }
})
  return (
    <div className="flex w-screen h-screen flex-col items-center justify-center bg-slate-100 ">
      <div className='flex flex-col p-6 bg-white rounded-lg border border-slate-300'>
      <h1 className="text-blue-500 font-semibold">Sign in</h1>
      <form className="flex flex-col gap-4 mt-4 w-80 " onSubmit={handleLogin}>
        <input
          className="rounded-md border border-slate-200 px-2 py-1 text-black focus:outline-slate-300"
          {...register("email")}
        />
        {errors.email && (
          <p className="text-red-600/40 transform duration-300 -mt-1 ">
            {errors.email?.message?.toString()}
          </p>
        )}
        <input
          type='password'
          className="rounded-md border border-slate-200 px-2 py-1 text-black focus:outline-slate-300"
          {...register("password")}
        />
        {errors.password && (
          <p className="text-red-600/40 transform duration-300 ">
            {errors.password?.message?.toString()}
          </p>
        )}
        <Button className='bg-green-500/90 py-2 text-white ' type="submit" >
          SignIn
        </Button>
        <div className='flex w-full justify-end'>
          <Link to='/signup' className='text-blue-500 '>Sign up</Link>
        </div>
      </form>
      </div>
    </div>
  );
}