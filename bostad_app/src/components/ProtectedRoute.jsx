import Admin from "@/routes/Admin";
import React, { useState } from "react"
import AccessDenied from "./AccessDenied";
import useAuthStore from "@/stores/store";

function ProtectedRoute() {
    const {token}  = useAuthStore();
  
  return (
    <div>
       { token !== null ?  <Admin /> : <AccessDenied/> }
    </div>
  )
}

export default ProtectedRoute