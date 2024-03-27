import React from "react";
import { Link } from "react-router-dom";

function AccessDenied() {
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="max-w-md bg-white p-8 rounded-md shadow-md">
        <h1 className="text-3xl font-bold text-center text-red-600 mb-4">
          Nekat tillträde
        </h1>
        <p className="text-gray-600 text-center mb-6">
          Här får du inte vara, du är ute på hal is!
        </p>
        <div className="flex justify-center">
        <Link to={"/login"}>
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Gå till login
          </button>
        </Link>
        </div>
      </div>
    </div>
  );
}

export default AccessDenied;
