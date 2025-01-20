
import AcademicDepartment from "../Pages/Admin/academicManagement/AcademicDepartment";
import AcademicFaculty from "../Pages/Admin/academicManagement/AcademicFaculty";
import AcademicSemester from "../Pages/Admin/academicManagement/AcademicSemester";
import CreateAcademicDepartment from "../Pages/Admin/academicManagement/CreateAcademicDepartment";
import CreateAcademicFaculty from "../Pages/Admin/academicManagement/CreateAcademicFaculty";
import CreateAcademicSemester from "../Pages/Admin/academicManagement/CreateAcademicSemester";
import AdminDashBoard from "../Pages/Admin/AdminDashBoard";
import AllStudent from "../Pages/Admin/AllStudent";
import Courses from "../Pages/Admin/CourseManagement/Courses";
import CreateCourse from "../Pages/Admin/CourseManagement/CreateCourse";
import OfferCourse from "../Pages/Admin/CourseManagement/OfferCourse";
import RegisteredSemester from "../Pages/Admin/CourseManagement/RegisteredSemester";
import SemesterRegistration from "../Pages/Admin/CourseManagement/SemesterRegistration";
import CreateAdmin from "../Pages/Admin/CreateAdmin";
import CreateFaculty from "../Pages/Admin/CreateFaculty";
import CreateStudent from "../Pages/Admin/CreateStudent";
import StudentDetails from "../Pages/Admin/studentDetails";
import StudentUpdate from "../Pages/Admin/studentUpdate";
import OfferedCourse from "../Pages/Faculty/OfferedCourese";


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
                name: "Students",
                path: "students-data",
                element: <AllStudent></AllStudent>
            },
            {
                path: "students-data/:id",
                element: <StudentDetails></StudentDetails>
            },
            {
                path: "students-update/:id",
                element: <StudentUpdate></StudentUpdate>
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

    },
    {
        name: "Course Management",
        children: [
            {
                name: "semester Registration",
                path: "semester-registration",
                element: <SemesterRegistration></SemesterRegistration>
            },
            {
                name: "Registered Semester",
                path: "registered-semester",
                element: <RegisteredSemester></RegisteredSemester>
            },
            {
                name: "Create Course",
                path: "create-course",
                element: <CreateCourse></CreateCourse>
            },
            {
                name: "courses",
                path: "courses",
                element: <Courses></Courses>
            },
            {
                name: "offer Course",
                path: "offer-course",
                element: <OfferCourse></OfferCourse>
            },
            {
                name: "offered Courses",
                path: "offered-courses",
                element: <OfferedCourse></OfferedCourse>
            },
        ]
    }
]




