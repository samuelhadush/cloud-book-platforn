import * as React from "react";
import { cn } from "../libs/utils";
import { Link } from "react-router-dom";
import { routes } from "../libs/constants";

const SideBar = () => {
  return (
    <div className="flex flex-col px-4 mt-4 gap-y-1 w-full h-full border-r border-slate-300 bg-slate-200">
      {routes.map((item) => {
        return <NavItem key={item.id} name={item.name} to={item.path} />;
      })}
    </div>
  );
};
export default SideBar;

const NavItem = ({
  className,
  name,
  to,
}: {
  className?: string;
  name: string;
  to: string;
}) => {
  return (
    <Link
      to={to}
      className={cn(
        className,
        ` py-1 px-4 hover:rounded-md hover:bg-slate-300/50 text-slate-700`
      )}
    >
      {name}
    </Link>
  );
};
