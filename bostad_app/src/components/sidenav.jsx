import React from "react";
import { Link } from "react-router-dom";
 //bg-sky-500/[.06] färgkod alt.
function SideNav() {
  return (
    <div>
      <div className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" style={{
    background:
      "linear-gradient(to bottom, #D6E6F2, #F3E2E7, #F3E6F5)",
  }}> 
        <div className="flex justify-center mt-10 mx-4">
          <img src="../bostad-visby-new-logo.svg" alt="Bostad Visby logo" />
        </div>
        <Link
          to="/"
          className="mb-1 flex h-10 mt-10 items-center justify-center rounded-sm bg-white p-2 md:h-20 text-black font-bold hover:bg-slate-100 hover:text-black hover:shadow-l"
        >
          Hem
        </Link>
      </div>
    </div>
  );
}

export default SideNav;
