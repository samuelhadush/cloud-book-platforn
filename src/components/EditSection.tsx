import * as React from "react";
import { Link, useParams } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { useQuery } from "@tanstack/react-query";
import useFetch from "../hooks/useFetch";
import Loader from "./ui/Loader";
import ShowError from "./ui/ShowError";

type sectionTypes = {
  id: number;
  title: string;
  bookId: number;
  authorId: number;
};
export default function EditSection() {
  // const { getUser } = useAuth();
  const { getSectionById } = useFetch();
  const { sectionId } = useParams();
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["section"],
    queryFn: () => getSectionById(Number(sectionId)),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: data });
  const handleUpdate = handleSubmit(async (data) => {
    const res = await fetch(`${import.meta.env.VITE_API}/600/sections/:${sectionId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      toast.success(`Section updated successfully`);
    } else {
      toast.error(`Failed to update section `);
    }
  });
  // update section

  if (isLoading) return <Loader />;
  if (isError) return <ShowError />;
  return (
    <div className="flex w-screen h-screen flex-col items-center justify-center bg-slate-100 ">
      <div className="flex flex-col p-6 bg-white rounded-lg border border-slate-300">
        <h1 className="text-gray-800 font-semibold">Update Setion</h1>
        <form
          className="flex flex-col gap-4 mt-4 w-80 "
          onSubmit={handleUpdate}
        >
          <input
            className="rounded-md border border-slate-200 px-2 py-1 text-black focus:outline-slate-300"
            {...register("title")}
          />

          <Button className="bg-gray-800/90 py-2 text-white " type="submit">
            Update
          </Button>
        </form>
      </div>
    </div>
  );
}
