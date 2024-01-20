import * as React from "react";
import { Button } from "./ui/button";
import { useQuery } from "@tanstack/react-query";
import { Pencil1Icon } from "@radix-ui/react-icons";
import useFetch from "../hooks/useFetch";
import Loader from "./ui/Loader";
import ShowError from "./ui/ShowError";
import { Link } from "react-router-dom";
export type DataType = {
  data: {
    id: number;
    title: string;
    bookId: number | null;
    sectionId: number | null;
  };
  onClick?: () => void;
};
export default function Section({ data }: DataType) {
  const [showSections, setShowSections] = React.useState<boolean>(false);
  console.log(data);
  return (
    <div className="flex flex-col ml-2 py-4 pl-4 border-l border-slate-200">
      <h1>{data.title}</h1>
      <div className="flex gap-2 justify-between ">
        <Button
          onClick={() => setShowSections(!showSections)}
          className="p-2 rounded-md hover:bg-slate-200"
        >
          Section
        </Button>
        <Link to={`/sections/${data.id}`} className="p-2 rounded-md  hover:bg-slate-200">
          <Pencil1Icon />
        </Link>
      </div>
      {data.sectionId && showSections && (
        <RecursiveComponent sectionId={data.sectionId} />
      )}
    </div>
  );
}

type RecursiveProps = {
  children?: React.ReactNode;
  sectionId: number;
};
const RecursiveComponent = ({ sectionId }: RecursiveProps) => {
  const { getSections } = useFetch();
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["sections"],
    queryFn: () => getSections(sectionId),
  });

  if (isLoading) return <Loader />;
  if (isError) return <ShowError />;
  return <Section key={data.id} data={data} />;
};

