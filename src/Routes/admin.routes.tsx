
import { NavLink } from "react-router-dom";
import AdminDashBoard from "../Pages/Admin/AdminDashBoard";
import CreateAdmin from "../Pages/Admin/CreateAdmin";
import CreateFaculty from "../Pages/Admin/CreateFaculty";
import CreateStudent from "../Pages/Admin/CreateStudent";
import { MenuProps } from "antd";

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


// admin routes
export const adminPaths = admin2.reduce<{path:string,element:JSX.Element}[]>((acc, item) => {
    if (item.path && item.element) {
        acc.push({ path: item.path, element: item.element });
    }
    if (item.children) {
        item.children.forEach(child => {
            acc.push({ path: child.path, element: child.element });
        });
    }
    return acc;
}, []);


// admin side bar
type TItem = {
    key: string,
    label: JSX.Element | string,

    children?: {
        key: string,
        label: JSX.Element | string,
    }[]
}[]

// Define menu items with icons
export const items: MenuProps['items'] = admin2.reduce<TItem>((acc, item) => {
    if (item.name && item.path) {
        acc.push({
            key: item.name,
            label: <NavLink to={`/admin/${item.path}`}>{item.name}</NavLink>
        })


    }
    if (item.children) {
        acc.push({
            key: item.name,
            label: item.name,
            children: item.children.map((child) => {
                return {
                    key: child.name,
                    label: <NavLink to={`/admin/${child.path}`}>{child.name}</NavLink>
                }
            })
        })
    }
    return acc
}, [])