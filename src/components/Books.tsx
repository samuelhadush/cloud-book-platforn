import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import useFetch from "../hooks/useFetch";
import Section from "./Section";
import BookCard from "./ui/BookCard";
import ListSections from "./ListSections";
import ShowError from "./ui/ShowError";
import Loader from "./ui/Loader";

export default function Books() {
  const [showSections,setShowSections]=React.useState<boolean>(false);
  const { getBooks } = useFetch();
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["books"],
    queryFn: getBooks,
  });

  if (isLoading) return <Loader />;
  if (isError) return <ShowError />;

  return (
    <div className=" flex flex-col w-full pl-4 pr-6  ">
      {/* <h1>list</h1> */}
      <div className="flex border rounded-md px-4 flex-col w-full divide-y-2 divide-slate-200 gap-y-1 ">
      {data&&data?.map(book=>{
        return (
          <BookCard onClick={()=>setShowSections(!showSections)} key={book.id} authorId={book.authorId}  title={book.title} id={book.id}  >
            {showSections && book.sections?.length > 0 && (
              <ListSections sections={book.sections} />
            )}
          </BookCard>
        );
      })}
      </div>
    </div>
  );
}

