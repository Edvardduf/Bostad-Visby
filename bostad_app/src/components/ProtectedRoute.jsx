import Admin from "@/routes/Admin";
import React, { useState } from "react"
import AccessDenied from "./AccessDenied";

function ProtectedRoute() {
    const token = localStorage.getItem("token");
  return (
    <div>
       { token ?  <Admin /> : <AccessDenied/> }
    </div>
  )
}

export default ProtectedRoute