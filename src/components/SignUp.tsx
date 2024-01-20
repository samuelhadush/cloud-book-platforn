import * as React from 'react'
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import {z} from 'zod'
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import * as Select from '@radix-ui/react-select';
import { CheckIcon, ChevronDownIcon } from '@radix-ui/react-icons';
import { toast } from 'sonner';
import { useAuth } from '../hooks/useAuth';

export const profileSchema= z.object({
  email: z.string().email(),
  password: z.string().min(4, { message: 'password must be atleast 4 characters'}),
  role: z.string(),
});
export default function SignUp() {
  const { register,control, handleSubmit,formState: { errors } } = useForm({resolver: zodResolver(profileSchema),});
  const {setCookies}= useAuth()
  // handle a login 
  const handleLogin =handleSubmit(async(data)=> {
    const res= await fetch('http://localhost:8181/users', {
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify(data)
    });
    if(res.ok){
      const {user,accessToken}=await res.json()
      toast.success(`${data.user.role} created successfully`)
      setCookies(accessToken,user)
    }
    else {
      toast.error(`Failed to create ${data.role} `)
    }
})
  return (
    <div className="flex w-screen h-screen flex-col items-center justify-center bg-slate-100 ">
      <div className="flex flex-col p-6 bg-white rounded-lg border border-slate-300">
        <h1 className="text-blue-500 font-semibold">Sign up</h1>
        <form className="flex flex-col gap-4 mt-4 w-80 " onSubmit={handleLogin}>
          <input
            className="rounded-md border border-slate-200 px-2 py-1 text-black focus:outline-slate-300"
            {...register("email")}
          />
          {errors.username && (
            <p className="text-red-600/40 transform duration-300 -mt-1 ">
              {errors.username?.message?.toString()}
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

          <Controller
            control={control}
            name="role"
            render={({ field }) => {
              return (
                <Select.Root onValueChange={field.onChange}>
                  <Select.Trigger className="flex w-full items-center justify-center rounded-md px-2 text-[13px] leading-none h-8 py-1 gap-[5px] bg-white text-slate-900 border border-slate-200 focus:outline-slate-300 outline-none">
                    <Select.Value placeholder="Select a fruit…" />
                    {/* <Select.Icon /> */}
                    <ChevronDownIcon />
                  </Select.Trigger>

                  <Select.Portal>
                    <Select.Content className=" overflow-hidden w-full bg-white rounded-md shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]">
                      {/* <Select.ScrollUpButton className="flex items-center justify-center h-[25px] bg-white text-slate-900 cursor-default">
                        <ChevronUpIcon />
                      </Select.ScrollUpButton> */}
                      <Select.Viewport>
                        <Select.Group>
                          {/* <Select.Label className="px-[25px] text-xs leading-[25px] text-mauve11">
                            Select Role
                          </Select.Label> */}
                          <Select.Item
                            value="Author"
                            className="text-[13px] w-full leading-none text-slate-900 rounded-[3px] flex items-center h-[25px] pr-[35px] pl-[25px] relative select-none data-[disabled]:text-slate-400 data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-green-500/90 data-[highlighted]:text-white"
                          >
                            <Select.ItemText>Author</Select.ItemText>
                            <Select.ItemIndicator className="absolute left-0 w-[25px] inline-flex items-center justify-center">
                              <CheckIcon />
                            </Select.ItemIndicator>
                          </Select.Item>

                          <Select.Item
                            value="Collaborator"
                            className="text-[13px] w-full leading-none text-slate-900 rounded-[3px] flex items-center h-[25px] pr-[35px] pl-[25px] relative select-none data-[disabled]:text-slate-400 data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-green-500/90 data-[highlighted]:text-white"
                          >
                            <Select.ItemText>Collaborator</Select.ItemText>
                            <Select.ItemIndicator className="absolute left-0 w-[25px] inline-flex items-center justify-center">
                              <CheckIcon />
                            </Select.ItemIndicator>
                          </Select.Item>
                        </Select.Group>
                      </Select.Viewport>
                      {/* <Select.Arrow /> */}
                    </Select.Content>
                  </Select.Portal>
                </Select.Root>
              );
            }}
          ></Controller>
          {errors.role && (
            <p className="text-red-600/40 transform duration-300 ">
              {errors.role?.message?.toString()}
            </p>
          )}

          <Button className='bg-green-500/90 py-2 text-white ' type="submit" >
            Sign up
          </Button>
          <div className="flex w-full justify-end">
            <Link to="/signin" className="text-blue-500 ">
              Sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}