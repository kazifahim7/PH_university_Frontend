import { Button, Modal, Select, Table, TableColumnsType } from 'antd';
import React, { useState } from 'react';
import { useAssignFacultiesMutation, useGetAllCoursesQuery } from '../../../Redux/Features/Admin/courseManagementApi';
import { Controller, FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useGetAllFacultyQuery } from '../../../Redux/Features/Admin/usermanageManagementApi';
import { toast } from 'sonner';

interface DataType {
    key: React.Key;
    name: string;
    age: number;
    address: string;
}

const Courses :React.FC = () => {
    const { data: courseData, isFetching } = useGetAllCoursesQuery(undefined)
    console.log(courseData?.data)


    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const tableData = courseData?.data.map((item: any) => ({
        key: item?._id,
        title: item?.title,
        code: item?.code,
    
    


    }))

    console.log(tableData)




    const columns: TableColumnsType<DataType> = [
    
        {
            title: 'Title',
            dataIndex: 'title',
        },
        {
            title: 'Code',
            dataIndex: 'code',
        },
        {
            title: 'Action',
            key: "x",
            render: (item) => {
                return (
                    <AddFacultyModal data={item}></AddFacultyModal>
                )
            }
        },

    ];



  


    return (
        <div>
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


// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AddFacultyModal=({data:forKey}:any)=>{
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { handleSubmit, control, formState: { errors } }=useForm()
    const { data: Faculties } = useGetAllFacultyQuery(undefined)

    const [assignFaculties] = useAssignFacultiesMutation()



    console.log("this is faculty data", Faculties)

    const facultyOption=Faculties?.data.map((item:{_id:string,fullName:string})=>({
        value:item?._id,
        label: item?.fullName
    }))

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        // Trigger the form submission
        document.getElementById("facultyForm")?.dispatchEvent(
            new Event("submit", { cancelable: true, bubbles: true })
        );
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const onSubmit: SubmitHandler<FieldValues> = async(data) => {
        console.log("Form data:", data);

        const id = toast.loading("creating.....")


        try {
            const result = await assignFaculties({data:data,id:forKey?.key}).unwrap()
            console.log(result);
            if (result?.data) {
                toast.success(result?.message, { id })


            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.log(error)
            toast.error(error?.data.message, { id })
        }
        




        setIsModalOpen(false); // Close the modal after successful submission
    };

    return (
        <>
            <Button type="primary" onClick={showModal}>
                Add Faculty
            </Button>
            <Modal
                title="Add Faculty"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <form id="facultyForm" onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-6">
                        <label className="block text-sm font-medium mb-2">Faculties</label>
                        <Controller
                            name="faculties"
                            control={control}
                            defaultValue={[]}
                            rules={{ required: "Please select at least one faculty" }}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    options={facultyOption}
                                    mode="multiple"
                                    size="large"
                                    style={{ width: "100%" }}
                                    placeholder="Select faculties"
                                    onChange={(value) => field.onChange(value)}
                                />
                            )}
                        />
                        {errors.faculties && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.faculties.message?.toString()}
                            </p>
                        )}
                    </div>
                </form>
            </Modal>
        </>
    );
};

export default Courses;