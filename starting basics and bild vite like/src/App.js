import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";
import {createBrowserRouter, Outlet, RouterProvider} from "react-router-dom"
import Contact from "./components/Contact";
import Error from "./components/Error";
import About from "./components/About";
import RestaurantMenu from "./components/RestaurantMenu";



const Grocery = lazy(()=>import("./components/Grocery"))  // seperate bundles

const AppLayout = () => {
  return (
    <div>
      <Header/>
      <Outlet/>
    </div>
  );
};

const appRouter = createBrowserRouter([
{
  path :"/",
  element:<AppLayout/>,
  children:[
    {
      path:"/",
      element:<Body/>
    },
    {
      path: "/contact",
      element: <Contact/>,
     
    },
    {
      path:"/about",
      element: <About/>
    },
    {
      path:"/grocery",
      element: <Suspense fallback={<h1>Loading...</h1>}><Grocery/></Suspense>
    },
    {
      path:"/restaurant/:resId",
      element: <RestaurantMenu/>
    },
  ],
  errorElement: <Error/>
}

])

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={appRouter}/>);
