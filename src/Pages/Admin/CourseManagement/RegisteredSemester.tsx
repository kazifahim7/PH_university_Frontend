import { Button, Dropdown, MenuProps,  Table, TableColumnsType,} from 'antd';
import React, { useState } from 'react';
import moment from 'moment'
import { useGetAllSemesterRegisteredDataQuery, useUpdateSemesterRegistrationMutation } from '../../../Redux/Features/Admin/courseManagementApi';
import { toast } from 'sonner';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
interface DataType {
    key: React.Key;
}


const RegisteredSemester :React.FC = () => {
  
    const [semesterId,setSemesterId]=useState('')
    console.log(semesterId)
    const { data: semesterRegisterData, isFetching } = useGetAllSemesterRegisteredDataQuery(undefined)
    const [updateStatus] = useUpdateSemesterRegistrationMutation()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const tableData = semesterRegisterData?.data.map((item: any) => ({
        key: item?._id,
        name: item?.academicSemester?.name,
        startMonth: moment(item?.startDate).format('LL'),
        endMonth: moment(item?.endDate).format('LL') ,
        year: item?.academicSemester?.year,
        status: item?.status,
        minCredit: item?.minCredit,
        maxCredit: item?.maxCredit

    }))
    const handleMenuClick: MenuProps['onClick'] =async (e) => {
        console.log('click', e.key);
        const toastId=toast.loading("updating...")

        try {
            const result = await updateStatus({data:{status:e?.key},id:semesterId})
            if(result.data){
                toast.success(result?.data.message, { id: toastId })
            }
            if(result.error){
                const error = result.error as FetchBaseQueryError
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                toast.error((error?.data as any).message,{id:toastId})
            }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error:any) {
            
            toast.error(error?.data.message, { id: toastId })
        }

    };

    const items: MenuProps['items'] = [
        {
            label: 'Ongoing',
            key: 'ONGOING',
            
        },
        {
            label: 'Upcoming',
            key: 'UPCOMING',
        },
        {
            label: 'Ended',
            key: 'ENDED',
        }
    ];

    const menuProps = {
        items,
        onClick: handleMenuClick,
    };



    const columns: TableColumnsType<DataType> = [
        {
            title: 'Name',
            dataIndex: 'name',
            showSorterTooltip: { target: 'full-header' },
        },
        {
            title: 'Year',
            dataIndex: 'year',
        },
        {
            title: 'Start Date',
            dataIndex: 'startMonth',
        },
        {
            title: 'End Date',
            dataIndex: 'endMonth',
        },
        {
            title: 'status',
            dataIndex: 'status',
            render:(item)=>{
                
                if(item==="UPCOMING"){
                    return <p className='bg-blue-400 rounded-lg text-center'>{item}</p>
                }
                if(item==="ONGOING"){
                    return <p className='bg-green-500 rounded-lg text-center'>{item}</p>
                }
                if(item==="ENDED"){
                    return <p className='bg-red-400 rounded-lg text-center'>{item}</p>
                }
            }
        },
        {
            title: 'minCredit',
            dataIndex: 'minCredit',
        },
        {
            title: 'maxCredit',
            dataIndex: 'maxCredit',
        },
        {
            title: 'Action',
            key: "x",
            render: (item) => {
                return (
                    <Dropdown menu={menuProps} trigger={["click"]}>
                        <Button onClick={() => setSemesterId(item.key)}>Update Status</Button>
                    </Dropdown>
                )
            }
        },

    ];



   
    return (
        <div>
            <h1 className='text-center pb-4 text-2xl underline'>Registered Semester</h1>
            <Table<DataType>
                columns={columns}
                loading={isFetching}
                dataSource={tableData}
                scroll={{ x: 'max-content' }}
                pagination={false}
            />
        </div>
    );
};

export default RegisteredSemester;