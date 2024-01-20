import * as React from "react";
import { Pencil1Icon, SectionIcon } from "@radix-ui/react-icons";
import { Button } from "./button";

type BookProps = {
  id: number;
  title: string;
  authorId: number;
  onClick?:()=>void
  children?: React.ReactNode;
};
const BookCard = ({ children,onClick, ...book }: BookProps) => {
  console.log(book);
  return (
    <div className="flex first:border-t  py-2 last:border-b  flex-col gap-1">
      <h2>{book.title}</h2>
      <div className="flex px-6 py-2 justify-between text-slate-400">
        <Button onClick={onClick} className="p-2 rounded-md hover:bg-slate-200">
          <SectionIcon />
        </Button>
        <Button className="p-2 rounded-md  hover:bg-slate-200">
          <Pencil1Icon />
        </Button>
      </div>
      {children ? children : null}
    </div>
  );
};

export default BookCard;
