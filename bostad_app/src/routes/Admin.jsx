import React from 'react'
import SideNav from '../components/sidenav'
import AdminListings from '../components/AdminListings'

function Admin() {
  return (
    <div className="relative flex h-screen">
      <SideNav></SideNav>
      <div
        className="flex-1 pl-64 overflow-auto border outline-none bg-gray-50 max-w-screen-2xl" //Ändra på pl-64 så den är responsive
      >
      <AdminListings></AdminListings>
    </div>
    </div>
  )
}

export default Admin