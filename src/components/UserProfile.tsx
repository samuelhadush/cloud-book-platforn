import * as React from "react";
import { Link } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as Select from '@radix-ui/react-select';
import { toast } from "sonner";
import { CheckIcon, ChevronDownIcon } from '@radix-ui/react-icons';
import { Button } from "./ui/button";
import { profileSchema } from "./SignUp";
import { useAuth } from "../hooks/useAuth";

export default function UserProfile() {
  const { setCookies,getUser } = useAuth();
  const user=getUser()
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues:user });
  // update profile
  const handleProfile = handleSubmit(async (data) => {
    console.log(data);
    const res = await fetch(`http://localhost:8181/users/:${user.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      const { user, accessToken } = await res.json();
      toast.success(`${data.user.role} created successfully`);
      setCookies(accessToken, user);
    } else {
      toast.error(`Failed to create ${data.role} `);
    }
  });
  return (
    <div className="flex w-screen h-screen flex-col items-center justify-center bg-slate-100 ">
      <div className="flex flex-col p-6 bg-white rounded-lg border border-slate-300">
        <h1 className="text-gray-800 font-semibold">Update Profile</h1>
        <form className="flex flex-col gap-4 mt-4 w-80 " onSubmit={handleProfile}>
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
            type="password"
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
                    <ChevronDownIcon />
                  </Select.Trigger>

                  <Select.Portal>
                    <Select.Content className=" overflow-hidden w-full bg-white rounded-md shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]">
                      <Select.Viewport>
                        <Select.Group>
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

          <Button className="bg-gray-800/90 py-2 text-white " type="submit">
            Update
          </Button>
        </form>
      </div>
    </div>
  );
}
