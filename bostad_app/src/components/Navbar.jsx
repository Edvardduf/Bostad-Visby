import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div>
      <nav className="bg-black p-4">
        <div className="container mx-auto flex justify-between items-center">
          <ul className="flex space-x-4 ">
            <li>
              <Link to={"/"} className="text-lime-400 hover:text-gray-300">
                Hem
              </Link>
            </li>
            <li>
              <Link
                to={"/accommodation"}
                className="text-lime-400 hover:text-gray-300"
              >
                Bostäder
              </Link>
            </li>
            <li>
              <Link to={"/contact"} className="text-lime-400 hover:text-gray-300">
                Kontakt
              </Link>
            </li>
            <li>
              <Link to={"/rent-out"} className="text-lime-400 hover:text-gray-300">
                Hyr ut
              </Link>
            </li>
            <li>
              <Link
                to={"/premises-visby"}
                className="text-lime-400 hover:text-gray-300"
              >
                Lokaler Visby
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
