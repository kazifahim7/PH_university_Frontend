import { useParams } from "react-router-dom";
import { useGetSingleStudentQuery } from "../../Redux/Features/Admin/usermanageManagementApi";
import { Table, TableColumnsType } from "antd";


interface DataType {
    key: React.Key;
}


const StudentDetails = () => {

    const { id } = useParams()
    const { data, isFetching ,refetch} = useGetSingleStudentQuery(id)





    
    const permanentData = []
    permanentData.push(data?.data)
    console.log(permanentData)


    
    

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const tableData = permanentData.map((item: any) => ({
        key: item?._id,
        name: item?.fullName,
        id: item?.id,
        email: item?.email,
        academicDepartment: item?.academicDepartment?.name,
        academicFaculty: item?.academicFaculty?.name,
        admissionSemester: item?.admissionSemester?.name,
        year: item?.admissionSemester?.year,


    }))

    const columns: TableColumnsType<DataType> = [
        {
            title: 'ID',
            dataIndex: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'AdmissionSemester',
            dataIndex: 'admissionSemester',
        },
        {
            title: 'Year',
            dataIndex: 'year',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'AcademicDepartment',
            dataIndex: 'academicDepartment',
        },

    ];

    const reload = async()=>{
        await refetch()
    }

    if(!permanentData.length){
     reload()
    }

   
    

    return (
       <div>
         <h1 className="text-center text-2xl capitalize font-bold pb-4">Student Details Page</h1>
            <Table<DataType>
                columns={columns}
                loading={isFetching}
                dataSource={tableData}
                scroll={{ x: 'max-content' }}
                showSorterTooltip={{ target: 'sorter-icon' }}
                pagination={false}
            />
       </div>
    );
};

export default StudentDetails;