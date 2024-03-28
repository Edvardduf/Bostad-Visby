import React, { useEffect } from "react";
import { Link } from "react-router-dom";

function SideNavLink({ route, name }) {

  return (
    <div>
      <Link
        to={"/" + route}
        className="mb-1 flex h-5 mt-5 items-center justify-center rounded-sm p-2 md:h-20 text-black font-semibold hover: bg-transparent hover:text-sky-700 hover:shadow-l"
      >
        {name}
      </Link>
    </div>
  );
}

export default SideNavLink;
