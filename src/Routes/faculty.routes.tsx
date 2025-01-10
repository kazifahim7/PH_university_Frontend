import FacultyDashBoard from "../Pages/Faculty/FacultyDashBoard";
import OfferedCourse from "../Pages/Faculty/OfferedCourese";

export const facultyPaths = [
    {
        name: "Dashboard",
        path: "dashboard",
        element: <FacultyDashBoard></FacultyDashBoard>
    },
    {
        name: "Offered Course",
        path: "offered-Course",
        element: <OfferedCourse></OfferedCourse>
    }
]