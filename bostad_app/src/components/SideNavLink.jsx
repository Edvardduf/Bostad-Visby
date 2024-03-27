import React from "react";
import { Link } from "react-router-dom";

function SideNavLink({route, name}) {
  return (
    <Link
      to={"/" + route}
      className="mb-1 flex h-10 mt-10 items-center justify-center rounded-sm bg-white p-2 md:h-20 text-black font-bold hover:bg-slate-100 hover:text-black hover:shadow-l"
    >
      {name}
    </Link>
  );
}

export default SideNavLink;
