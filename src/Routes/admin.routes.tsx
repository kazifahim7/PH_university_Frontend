
import AcademicDepartment from "../Pages/Admin/academicManagement/AcademicDepartment";
import AcademicFaculty from "../Pages/Admin/academicManagement/AcademicFaculty";
import AcademicSemester from "../Pages/Admin/academicManagement/AcademicSemester";
import CreateAcademicDepartment from "../Pages/Admin/academicManagement/CreateAcademicDepartment";
import CreateAcademicFaculty from "../Pages/Admin/academicManagement/CreateAcademicFaculty";
import CreateAcademicSemester from "../Pages/Admin/academicManagement/CreateAcademicSemester";
import AdminDashBoard from "../Pages/Admin/AdminDashBoard";
import CreateAdmin from "../Pages/Admin/CreateAdmin";
import CreateFaculty from "../Pages/Admin/CreateFaculty";
import CreateStudent from "../Pages/Admin/CreateStudent";


export const admin2 = [
    {
        name: "DashBoard",
        path: "dashboard",
        element: <AdminDashBoard></AdminDashBoard>
    },
    {
        name: "User Management",
        children: [
            {
                name: "Create Student",
                path: "create-student",
                element: <CreateStudent></CreateStudent>
            },
            {
                name: "Create Faculty",
                path: "create-faculty",
                element: <CreateFaculty></CreateFaculty>
            },
            {
                name: "Create admin",
                path: "create-admin",
                element: <CreateAdmin></CreateAdmin>
            },

        ]

    },
    {
        name: "Academic Management",
        children: [
            {
                name: "Create A-Semester",
                path: "create-academic-semester",
                element: <CreateAcademicSemester></CreateAcademicSemester>
            },
            {
                name: "Academic Semester",
                path: "academic-semester",
                element: <AcademicSemester></AcademicSemester>
            },
            {
                name: "Create A-Faculty",
                path: "create-academic-faculty",
                element: <CreateAcademicFaculty></CreateAcademicFaculty>
            },
            {
                name: "Academic Faculty",
                path: "academic-faculty",
                element: <AcademicFaculty></AcademicFaculty>
            },
            {
                name: "Create A-Department",
                path: "create-academic-Department",
                element: <CreateAcademicDepartment></CreateAcademicDepartment>
            },
            {
                name: "Academic Department",
                path: "academic-Department",
                element: <AcademicDepartment></AcademicDepartment>
            },

        ]

    }
]




