import React from "react";
import ListingCards from "@/components/ListingCards";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";


function Accomodation() {
  return (
    <div style={{
      background:
        "linear-gradient(to bottom, #FFFFFF, #EBF5FB, #E8F8F5, #E8F6F3, #EAFAF1, #EBF5FB)",
    }}>
      <Navbar />
      <div className="my-8">
        <ListingCards />
      </div>
      <Footer />
    </div>
  );
}

export default Accomodation;
