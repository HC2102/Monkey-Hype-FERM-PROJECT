import React, { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

const Home = lazy(() => import("./Components/common/Home"));
const Game = lazy(() => import("./Components/common/Game"));
const Login = lazy(() => import("./Components/common/Login"));
const SignUp = lazy(() => import("./Components/common/SignUp"));
const Setting = lazy(() => import("./Components/common/Setting"));
const Text = lazy(() => import("./Components/common/Text"));

const routes = createBrowserRouter([
{
    path: "/",
    element: (
        <Suspense fallback={<div>Loading...</div>}>
            <Home />
        </Suspense>
    ),
},
{
    path: "/game",
    element: (
        <Suspense fallback={<div>Loading...</div>}>
            <Game />
        </Suspense>
    ),
},
{
    path: "/login",
    element: (
        <Suspense fallback={<div>Loading...</div>}>
            <Login />
        </Suspense>
    ),
},
{
    path: "/signup",
    element: (
        <Suspense fallback={<div>Loading...</div>}>
            <SignUp />
        </Suspense>
    ),
},
{
    path: "/setting",
    element: (
        <Suspense fallback={<div>Loading...</div>}>
            <Setting />
        </Suspense>
    ),
},
{
    path: "/text",
    element: (
        <Suspense fallback={<div>Loading...</div>}>
            <Text />
        </Suspense>
    ),
},

]);
export default routes;
