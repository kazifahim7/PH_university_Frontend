import { Button, Table, TableColumnsType, TableProps } from "antd";
import { useGetAllSemestersQuery } from "../../../Redux/Features/Admin/academicManagement";
import { Key, useState } from "react";


interface DataType {
    key: React.Key;
    name: string;
    age: number;
    address: string;
}


const AcademicSemester = () => {

    const [params, setParams] = useState<{ name: string; value: boolean | Key; }[] | undefined>([])

    const { data: semesterData,isFetching } = useGetAllSemestersQuery(params)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const tableData = semesterData?.data.map((item: any) => ({
        key: item._id,
        name: item.name,
        startMonth: item.startMonth,
        endMonth: item.endMonth,
        year: item.year

    }))



    const columns: TableColumnsType<DataType> = [
        {
            title: 'Name',
            dataIndex: 'name',
            showSorterTooltip: { target: 'full-header' },
            filters: [
                {
                    text: 'Autumn',
                    value: 'Autumn',
                },
                {
                    text: 'Summer',
                    value: 'Summer',
                },
                {
                    text: 'Fall',
                    value: 'Fall',
                },
            ],
        },
        {
            title: 'Year',
            dataIndex: 'year',
            filters: [
                {
                    text: '2025',
                    value: '2025',
                },
                {
                    text: '2026',
                    value: '2026',
                },
                {
                    text: '2027',
                    value: '2027',
                },
            ],
        },
        {
            title: 'StartMonth',
            dataIndex: 'startMonth',
        },
        {
            title: 'endMonth',
            dataIndex: 'endMonth',
        },
        {
            title: 'Action',
            key:"x",
            render:()=>{
                return (
                    <div>
                        <Button>Update</Button>
                    </div>
                )
            }
        },

    ];



    const onChange: TableProps<DataType>['onChange'] = (_pagination, filters, _sorter, extra) => {
        
        if (extra.action === "filter") {
            
            const queryParams:  { name: string; value: boolean | Key; }[] = [] ;
            filters.name?.forEach((item)=>queryParams.push({name:"name",value:item}))
            filters.year?.forEach((item)=>queryParams.push({name:"year",value:item}))

            

            setParams(queryParams)

        }
       
    };

  

    return (
        <Table<DataType>
            columns={columns}
            loading={isFetching}
            dataSource={tableData}
            onChange={onChange}
            scroll={{ x: 'max-content' }}
            showSorterTooltip={{ target: 'sorter-icon' }}
        />
    );
};

export default AcademicSemester;