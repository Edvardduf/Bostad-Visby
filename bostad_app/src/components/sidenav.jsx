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
          background:
            "linear-gradient(to bottom, #FFFFFF, #EBF5FB, #E8F8F5, #E8F6F3, #EAFAF1, #EBF5FB  )",
        }}
      >
        <div className="flex justify-center mt-10 mx-4">
          <img src="../bostad-visby-new-logo.svg" alt="Bostad Visby logo" />
        </div>
        <SideNavLink route={"./"} name={"Hem"} />
        {tabs.map((tab) => (
          <li
            key={tab.id}
            className={`cursor-pointer mb-1 flex h-4 mt-4 items-center justify-center rounded-sm p-2 md:h-20 text-black font-semibold hover: bg-transparent hover:text-sky-800 hover:shadow-l ${
              tab.id === activeTab ? "border-b-2 border-sky-100" : ""
            }`}
            onClick={() => onTabChange(tab.id)}
          >
            {tab.label}
          </li>
        ))}
        {token && (
          <div className="flex flex-col items-center mt-5">
            <div className="flex justify-center items-center mt-5">
              <span className="inline-block w-3 h-3 mr-2 bg-green-500 rounded-full"></span>{" "}
              {/* Green circle */}
              {userData && userData.email}
            </div>
            <button
              onClick={handleLogout}
              className="px-6 py-3 my-2 text-sm font-semibold text-black bg-sky-200 rounded-sm hover:bg-sky-300 hover: shadow-l"
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
