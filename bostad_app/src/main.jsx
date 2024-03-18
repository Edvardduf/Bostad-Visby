import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Root from "./routes/Root";
import ErrorPage from "./ErrorPage";
import Contact from "./routes/Contact";
import Accomodation from "./routes/Accomodation";
import RentOut from "./routes/RentOut";
import PremisesVisby from "./routes/PremisesVisby"
import Admin from "./routes/Admin";
import Login from "./routes/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />
  },
  {
    path: "/contact",
    element: <Contact />,
    errorElement: <ErrorPage />
  },
  {
    path: "/accommodation",
    element: <Accomodation/>,
    errorElement: <ErrorPage />
  },
  {
    path: "/rent-out",
    element: <RentOut />,
    errorElement: <ErrorPage />
  },
  {
    path: "/premises-visby",
    element: <PremisesVisby />,
    errorElement: <ErrorPage />
  },
  {
    path: "/kung",
    element: <Admin />,
    errorElement: <ErrorPage />
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <ErrorPage />
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);