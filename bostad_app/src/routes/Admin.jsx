import React, { useEffect, useState } from 'react'
import SideNav from '../components/sidenav'
import AdminTable from '@/components/AdminTable'
import AdminListing from '@/components/AdminListing';
import AdminList from '@/components/AdminList';

function Admin() {
  const [listings, setListings] = useState([]);
  const [renters, setRenters] = useState([]);
  const [rentOutApplication, setRentOutApplication] = useState([]);
  const [rentalApplication, setRentalApplication] = useState([]);
  const [activeTab, setActiveTab] = useState("");
  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };
  
  const tabs = [
    { label: 'Annonser', id: 1 },
    { label: 'Uthyrare', id: 2 },
    { label: 'Bokningsförfrågningar', id: 3 },
    { label: 'Uthyrarförfrågningar', id: 4 },
  ];

  const renterUrl = "renters"
  const rentalApplicationUrl = "rental-application"
  const rentOutApplicationUrl = "rentout-application"

  const renderContent = () => {
    switch (activeTab) {
      case 1:
        return <AdminListing listings={listings}/>;
      case 2:
        return <AdminTable data={renters} url={renterUrl}/>;
      case 3:
        return <AdminTable data={rentalApplication} url={rentalApplicationUrl}/>;
        case 4:
          
          return <AdminList/>;
      default:
        return null;
    }
  };

  useEffect(() => {
    async function getListings() {
      try {
        const response = await fetch("http://localhost:8000/listings")
        const data = await response.json();
        setListings(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    getListings();
  }, []);

  useEffect(() => {
    async function getRenters() {
      try {
        const response = await fetch("http://localhost:8000/renters");
        const data = await response.json();
        setRenters(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    getRenters();
  }, []);

  // useEffect(() => {
  //   async function getRentOutApplication() {
  //     try {
  //       const response = await fetch("http://localhost:8000/rentout-applications");
  //       const data = await response.json();
  //       setRentOutApplication(data);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   }
  //   getRentOutApplication();
  // }, []);

  useEffect(() => {
    async function getRentalApplications() {
      try {
        const response = await fetch("http://localhost:8000/rental-applications");
        const data = await response.json();
        setRentalApplication(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    getRentalApplications();
  }, []);


  return (
    <div className="relative flex h-screen">
      <SideNav tabs={tabs} activeTab={activeTab} onTabChange={handleTabChange}></SideNav>
      <div
        className="flex-1 pl-64 overflow-auto border outline-none bg-gray-50 max-w-screen" //Ändra på pl-64 så den är responsive
      >
      <h1 className="text-center text-2xl">Välkommen till Adminsidan, Johan!</h1>
      {/* <AdminTable data={listings}/> */}
      <div className="mt-4">{renderContent()}</div>
    </div>
    </div>
  )
}

export default Admin