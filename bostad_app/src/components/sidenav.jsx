import React, { useEffect } from "react";
import SideNavLink from "./SideNavLink";
import useAuthStore from "@/stores/store";
//bg-sky-500/[.06] färgkod alt.
function SideNav({ tabs, activeTab, onTabChange }) {
  const { token, logout, fetchUser, userData } = useAuthStore();
  useEffect(() => {
    if (token) {
      fetchUser();
    }
  }, []);

  function handleLogout() {
    logout();
    navigate("/login");
  }
  return (
    <div>
      <div
        className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        style={{
          background: "linear-gradient(to bottom, #D6E6F2, #F3E2E7, #F3E6F5)",
        }}
      >
        <div className="flex justify-center mt-10 mx-4">
          <img src="../bostad-visby-new-logo.svg" alt="Bostad Visby logo" />
        </div>
        <SideNavLink route={"./"} name={"Hem"} />
        {tabs.map((tab) => (
          <li
            key={tab.id}
            className={`cursor-pointer mb-1 flex h-10 mt-10 items-center justify-center rounded-sm bg-white p-2 md:h-20 text-black font-bold hover:bg-slate-100 hover:text-black hover:shadow-l ${
              tab.id === activeTab ? "border-b-2 border-blue-500" : ""
            }`}
            onClick={() => onTabChange(tab.id)}
          >
            {tab.label}
          </li>
        ))}
        {token && (
          <div>
            <div className="flex justify-center items-center">
              <span className="inline-block w-3 h-3 mr-2 bg-green-500 rounded-full"></span>{" "}
              {/* Green circle */}
              {userData && userData.email}
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 my-2 text-sm text-white bg-black rounded hover:bg-red-700"
            >
              Logga ut
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default SideNav;
