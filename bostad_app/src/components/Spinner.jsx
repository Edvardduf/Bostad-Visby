import React from "react";

function Spinner() {
  return (
    <div className="flex justify-center items-center h-full">
      <svg
        className="animate-spin h-10 w-10 text-gray-500"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 4.418 3.582 8 8 8v-4zm2-9.174A7.965 7.965 0 0112 4v4c-2.205 0-4.2.896-5.657 2.343l1.414 1.414C9.051 10.246 10.454 9.501 12 9.501v-4c1.659 0 3.142.646 4.293 1.707l1.414-1.414C16.201 5.053 14.27 4 12 4v4zm6.651 6.651A7.963 7.963 0 0120 12h4c0 4.418-3.582 8-8 8v-4c2.205 0 4.2-.896 5.657-2.343l-1.414-1.414C20.949 13.754 19.546 14.499 18 14.499v4c-1.659 0-3.142-.646-4.293-1.707l-1.414 1.414z"
        ></path>
      </svg>
    </div>
  );
}

export default Spinner;
