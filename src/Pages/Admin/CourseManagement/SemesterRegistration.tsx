import React from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useGetAllSemestersQuery } from "../../../Redux/Features/Admin/academicManagement";
import { useCreateSemesterRegistrationMutation } from "../../../Redux/Features/Admin/courseManagementApi";
import { toast } from "sonner";


const SemesterRegistration:React.FC = () => {

    const { register, handleSubmit, formState: { errors },reset } = useForm();
    const { data: semesterData } = useGetAllSemestersQuery([{name:"sort",value:"year"}])
    const [semesterRegistration] = useCreateSemesterRegistrationMutation()

    const onSubmit:SubmitHandler<FieldValues> = async(data) => {
        
        data.maxCredit = Number(data.maxCredit)
        data.minCredit = Number(data.minCredit)
        
        data.startDate = new Date(data.startDate)
        data.endDate = new Date(data.endDate)
        const id=toast.loading("creating...")


        try {
            const result = await semesterRegistration(data).unwrap()
            console.log(result);
            if(result?.data){
                toast.success(result?.message,{id})

                reset({})
            }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error:any) {
            console.log(error)
            toast.error(error?.data.message,{id})
        }




        
       
    };


    return (
        <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
            <h2 className="text-2xl font-bold text-center mb-6">Semester Registration</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Academic Semester */}
                <div>
                    <label className="block font-medium mb-2">Academic Semester</label>
                    <select
                        {...register("academicSemester", { required: "Academic semester is required" })}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        <option value="">Select a semester</option>
                        {semesterData?.data.map((item :{_id:string,name:string,year:string}) => (<option key={item._id} value={item._id}>{item.name} ({item.year})</option>))}
                        
                        
                    </select>
                    {errors.academicSemester && (
                        <p className="text-red-500 text-sm mt-1">{errors.academicSemester.message?.toString()}</p>
                    )}
                </div>
                <div>
                    <label className="block font-medium mb-2">Start Date</label>
                    <input
                        type="date"
                        {...register("startDate", { required: "Start date is required" })}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    {errors.startDate && (
                        <p className="text-red-500 text-sm mt-1">{errors.startDate.message?.toString()}</p>
                    )}
                </div>

                {/* End Date */}
                <div>
                    <label className="block font-medium mb-2">End Date</label>
                    <input
                        type="date"
                        {...register("endDate", { required: "End date is required" })}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    {errors.endDate && (
                        <p className="text-red-500 text-sm mt-1">{errors.endDate.message?.toString()}</p>
                    )}
                </div>

                {/* Status */}
                <div>
                    <label className="block font-medium mb-2">Status</label>
                    <select
                        {...register("status", { required: "Status is required" })}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        <option value="">Select status</option>
                        <option value="UPCOMING">Upcoming</option>
                        <option value="ONGOING">Ongoing</option>
                        <option value="ENDED">Ended</option>
                    </select>
                    {errors.status && (
                        <p className="text-red-500 text-sm mt-1">{errors.status.message?.toString()}</p>
                    )}
                </div>

                {/* Min Credit */}
                <div>
                    <label className="block font-medium mb-2">Minimum Credit</label>
                    <select
                        {...register("minCredit", { required: "Minimum credit is required" })}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        <option value="">Select minimum credit</option>
                        {[6, 8, 10, 12].map((credit) => (
                            <option key={credit} value={Number(credit)}>
                                {credit}
                            </option>
                        ))}
                    </select>
                    {errors.minCredit && (
                        <p className="text-red-500 text-sm mt-1">{errors.minCredit.message?.toString()}</p>
                    )}
                </div>

                {/* Max Credit */}
                <div>
                    <label className="block font-medium mb-2">Maximum Credit</label>
                    <select
                        {...register("maxCredit", { required: "Maximum credit is required" })}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        <option value="">Select maximum credit</option>
                        {[12, 14, 16, 18].map((credit) => (
                            <option key={credit} value={Number(credit)}>
                                {credit}
                            </option>
                        ))}
                    </select>
                    {errors.maxCredit && (
                        <p className="text-red-500 text-sm mt-1">{errors.maxCredit.message?.toString()}</p>
                    )}
                </div>

                {/* Submit Button */}
                <div className="text-center">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
                    >
                        Register
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SemesterRegistration;