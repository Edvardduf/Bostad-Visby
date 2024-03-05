import React from "react";

function RentOut() {
  return (
    <div
      className="bg-cover h-screen"
      style={{ backgroundImage: "url('/almedalen-visby.jpg')" }}
    >
      <ul className="flex space-x-7 text-white p-5 items-center font-serif text-lg">
        <img src="/bostad-visby-logo.png" alt="logo" />
        <li className="hover:underline">Hem</li>
        <li className="hover:underline">Kontakt</li>
        <li className="hover:underline">Köp</li>
      </ul>
    </div>
  );
}

export default RentOut;
