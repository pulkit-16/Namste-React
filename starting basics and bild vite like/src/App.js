import React, { lazy, Suspense, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Contact from "./components/Contact";
import Error from "./components/Error";
import About from "./components/About";
import RestaurantMenu from "./components/RestaurantMenu";
import UserContext from "./utils/UserContext";

const Grocery = lazy(() => import("./components/Grocery")); // seperate bundles

const About = lazy(() => import("./components/About"));

const AppLayout = () => {
  const [dark, setDark] = React.useState(false);
  const [userName, setUserName] = useState();

  //authentication
  useEffect(() => {
    //api call for username n password
    const data = {
      name: "Pulkit Takyar",
    };

    setUserName(data.name);
  }, []);

  const darkModeHandler = () => {
    setDark(!dark);
    document.body.classList.toggle("dark");
  };

  return (
    <UserContext.Provider value={{ loggedInUser: userName, set }}>
      <div
        className={`min-h-screen ${
          dark ? "bg-gray-900 text-white " : "bg-white-100"
        }`}
      >
        <Header dark={dark} darkModeHandler={darkModeHandler} />
        <Outlet />

      </div>
    </UserContext.Provider>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/grocery",
        element: (
          <Suspense fallback={<h1>Loading...</h1>}>
            <Grocery />
          </Suspense>
        ),
      },
      {
        path: "/restaurant/:resId",
        element: <RestaurantMenu />,
      },
    ],
    errorElement: <Error />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={appRouter} />);
