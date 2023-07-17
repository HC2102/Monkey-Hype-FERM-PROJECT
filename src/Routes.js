import { createBrowserRouter } from "react-router-dom";
import Home from "./Components/common/Home";
import Game from "./Components/common/Game";
import Login from "./Components/common/Login";
import SignUp from "./Components/common/SignUp";
import Setting from "./Components/common/Setting";
import Text from "./Components/common/Text";

const routes = createBrowserRouter([
{
    path:"/",
    element: <Home />
},
{
    path:"/game",
    element:<Game />
},
{
    path:"/login",
    element: <Login />
},
{
    path:"/signup",
    element: <SignUp />
},
{
    path:"/setting",
    element: <Setting />
},
{
    path:"/text",
    element:  <Text />
},

]);
export default routes;