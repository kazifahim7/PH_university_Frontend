import { Button, Pagination, Space, Table, TableColumnsType, TableProps } from "antd";

import { Key, useState } from "react";
import { useGetAllStudentQuery } from "../../Redux/Features/Admin/usermanageManagementApi";
import { Link } from "react-router-dom";

interface DataType {
    key: React.Key;
    name: string;
    age: number;
    address: string;
}
const AllStudent = () => {

    const [params, setParams] = useState<{ name: string; value: boolean | Key; }[]>([])
    const [page,setPage]=useState(1)

    const { data: studentData, isFetching } = useGetAllStudentQuery([{name:"limit",value:10},{name:"page",value:page},...params])
    console.log(studentData?.data)

    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const tableData = studentData?.data.map((item: any) => ({
        key: item._id,
        name: item.fullName,
        id:item.id,
        email:item.email,
        academicDepartment: item.academicDepartment.name,
        academicFaculty: item.academicFaculty.name,
        admissionSemester: item.admissionSemester.name,
        year: item.admissionSemester.year,


    }))

    console.log(tableData)

  


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
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'AcademicDepartment',
            dataIndex: 'academicDepartment',
        },
        {
            title: 'Action',
            key: "x",
            render: (item) => {
                return (
                    <Space>
                        <Link to={`/admin/students-data/${item.key}`}>
                            <Button>Details</Button>
                        </Link>
                        <Link to={`/admin/students-update/${item.key}`}>
                            <Button>Update</Button>
                        </Link>
                        
                        <Button>Block</Button>
                    </Space>
                )
            }
        },

    ];



    const onChange: TableProps<DataType>['onChange'] = (_pagination, filters, _sorter, extra) => {

        if (extra.action === "filter") {

            const queryParams: { name: string; value: boolean | Key; }[] = [];
            filters.name?.forEach((item) => queryParams.push({ name: "name", value: item }))
            filters.year?.forEach((item) => queryParams.push({ name: "year", value: item }))



            setParams(queryParams)

        }

    };



    return (
        <div>
            <Table<DataType>
                columns={columns}
                loading={isFetching}
                dataSource={tableData}
                onChange={onChange}
                scroll={{ x: 'max-content' }}
                showSorterTooltip={{ target: 'sorter-icon' }}
                pagination={false}
            />
            <br />
            <Pagination align="center" current={page} onChange={(value)=>setPage(value)} pageSize={studentData?.meta?.limit} total={studentData?.meta?.total}></Pagination>
        </div>
    );
};

export default AllStudent;