import { Table, TableColumnsType, TableProps } from "antd";
import { useGetAllAcademicFacultyQuery } from "../../../Redux/Features/Admin/academicManagement";


interface DataType {
    key: React.Key;
    name: string;
    age: number;
    address: string;
}


const AcademicFaculty = () => {
    const { data: academicFaculty,isFetching } = useGetAllAcademicFacultyQuery(undefined)

    const academicFacultyData = academicFaculty?.data.map((item: { _id: string; name: string; }) =>({
        key:item._id,
        name:item.name
    }))

    const columns: TableColumnsType<DataType> = [
        {
            title: 'Name',
            dataIndex: 'name',
            showSorterTooltip: { target: 'full-header' },
        },
    ];


    const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };



    return (
        <Table<DataType>
            loading={isFetching}
            columns={columns}
            dataSource={academicFacultyData}
            onChange={onChange}
            scroll={{ x: 'max-content' }}
            showSorterTooltip={{ target: 'sorter-icon' }}
        />
    );
};

export default AcademicFaculty;