import React from "react";

function RentOut() {
  return (
    <div
      className="h-4/5"
      style={{ backgroundImage: "url('/almedalen-visby.jpg')",  filter: 'saturate(150%) contrast(90%) brightness(90%) sepia(5%) hue-rotate(10deg) opacity(100%)' }}
    >
      <ul className="flex space-x-7 text-white p-5 items-center font-serif text-lg bg-blend-saturation">
        <li className="hover:underline text-7xl text-bold text-center">Bostad Visby</li>
        <li className="hover:underline text-pretty text-bold">Hem</li>
        <li className="hover:underline">Kontakt</li>
        <li className="hover:underline">Köp</li>
      </ul>
    </div>
  );
}

export default RentOut;
