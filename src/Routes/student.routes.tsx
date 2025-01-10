import OfferedCourse from "../Pages/student/OfferedCourse";
import StudentDashboard from "../Pages/student/StudentDashboard";

export const studentPaths = [
    {
        name: "Dashboard",
        path: "dashboard",
        element: <StudentDashboard></StudentDashboard>
    },
    {
        name: "Offered Course",
        path: "offered-course",
        element: <OfferedCourse></OfferedCourse>
    }
]