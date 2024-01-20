import * as React from "react";
import { useAuth } from "./useAuth";
const useFetch = () => {
  const { getToken } = useAuth();
  const getBooks = async () => await fetch(`${import.meta.env.VITE_API}/books?_embed=sections`, {
      method: "GET",
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
    }).then(async(res)=>res.json()).catch((err)=>err);
  const getSections = async (id:number) => await fetch(`${import.meta.env.VITE_API}/sections/${id}?_embed=sections`, {
      method: "GET",
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
    }).then(async(res)=>res.json()).catch((err)=>err);
  const getSectionById = (()=>async (id:number) => await fetch(`${import.meta.env.VITE_API}/sections/${id}`, {
      method: "GET",
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
    }).then(async( res)=>await res.json()).catch((err)=>err))();
  return { getBooks, getSections,getSectionById };
};
export default useFetch;
