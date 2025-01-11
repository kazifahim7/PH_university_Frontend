import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import LogIn from "../Pages/LogIn";
import routeGenerator from "../Utils/routesGenarator";
import { admin2 } from "./admin.routes";
import { facultyPaths } from "./faculty.routes";
import { studentPaths } from "./student.routes";



const router = createBrowserRouter([
    {
        path: '/',
        element: <App></App>,
    },
    {
        path: '/admin',
        element: <App></App>,
        children: routeGenerator(admin2)
    },
    {
        path: '/faculty',
        element: <App></App>,
        children: routeGenerator(facultyPaths)
    },
    {
        path: '/student',
        element: <App></App>,
        children: routeGenerator(studentPaths)
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