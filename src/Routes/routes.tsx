import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import LogIn from "../Pages/LogIn";
import { adminPaths } from "./admin.routes";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App></App>,
    },
    {
        path: '/admin',
        element: <App></App>,
        children: adminPaths
    },
    {
        path: '/faculty',
        element: <App></App>,
        children: adminPaths
    },
    {
        path: '/student',
        element: <App></App>,
        children: adminPaths
    },
    {
        path: '/login',
        element: <LogIn></LogIn>
    },
    {
        path: '/register',
        element: <LogIn></LogIn>
    },
])


export default router