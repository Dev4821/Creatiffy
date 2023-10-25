import React from "react";
import Home from "../modules/Home";
import Form from "../modules/Authorization";
import Profile from "../modules/Profile";
import { Navigate, Route, Routes as Router } from "react-router-dom";
import CreatePost from "../modules/CreatePost";
const PrivateRoute = ({ children }) => {
  const isUserLoggedIn = window.localStorage.getItem("user:token") || false;
  const isFormPages = window.location.pathname.includes("account");
  if (isUserLoggedIn && !isFormPages) {
    return children;
  } else if (!isUserLoggedIn && isFormPages) {
    return children;
  } else {
    const redirectUrl = isUserLoggedIn ? "/" : "/account/signin";
    return <Navigate to={redirectUrl} replace />;
  }
};
const Routes = () => {
  const routes = [
    {
      id: 1,
      name: "home",
      path: "/",
      component: <Home />,
    },
    {
      id: 2,
      name: "sign in",
      path: "/account/signin",
      component: <Form />,
    },
    {
      id: 3,
      name: "sign up",
      path: "/account/signup",
      component: <Form />,
    },
    {
      id: 4,
      name: "create post",
      path: "/new-post",
      component: <CreatePost />,
    },
    {
      id: 5,
      name: "my profile",
      path: "/profile",
      component: <Profile />,
    },
    {
      id: 6,
      name: "people",
      path: "/user/:_id",
      component: <Profile />,
    },
  ];
  return (
    <Router>
      {routes.map(({ id, name, path, component }) => {
        return (
          <Route
            key={id}
            path={path}
            element={<PrivateRoute>{component}</PrivateRoute>}
          />
        );
      })}
    </Router>
  );
};

export default Routes;
