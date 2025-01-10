
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
        name:"User Management",
        children:[
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

    }
]




