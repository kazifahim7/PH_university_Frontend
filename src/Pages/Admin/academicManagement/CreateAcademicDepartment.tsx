import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useCreateAcademicDepartmentMutation, useGetAllAcademicFacultyQuery } from "../../../Redux/Features/Admin/academicManagement";
import { toast } from "sonner";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";


const CreateAcademicDepartment = () => {
    const { data: academicFaculty } = useGetAllAcademicFacultyQuery(undefined)
    const [createAcademicDepartMent] = useCreateAcademicDepartmentMutation()
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const id = toast.loading("creating..")

        const result = await createAcademicDepartMent(data)
        if(result.data){
            toast.success(result.data.message,{id})
            reset({
                name:"",
                academicFaculty:""
            })

        }else if(result.error){
            const error = result.error as FetchBaseQueryError
            if(error.data){
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                toast.error((error.data as any).message,{id})
            }
        }
    };
    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg"
            >
                <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                    Create Academic Department
                </h2>
                {/* Name Field */}
                <div className="mb-4">
                    <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        {...register('name', { required: 'Name is required' })}
                        placeholder="Enter faculty name"
                        className={`mt-1 block w-full px-3 py-2 border ${errors.name
                            ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                            : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                            } rounded-md shadow-sm sm:text-sm`}
                    />
                    {errors.name && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.name.message?.toString()}
                        </p>
                    )}
                </div>

                {/* Academic Faculty (Select) Field */}
                <div className="mb-4">
                    <label
                        htmlFor="academicFaculty"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Academic Faculty
                    </label>
                    <select
                        id="academicFaculty"
                        {...register('academicFaculty', {
                            required: 'Please select an academic faculty',
                        })}
                        className={`mt-1 block w-full px-3 py-2 border ${errors.academicFaculty
                            ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                            : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                            } rounded-md shadow-sm sm:text-sm`}
                    >
                        <option value="">Select Faculty</option>
                        {academicFaculty?.data.map((item: { _id: string, name: string }) => (
                            <option key={item._id} value={item._id}>{item.name}</option>
                        ))}


                    </select>
                    {errors.academicFaculty && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.academicFaculty.message?.toString()}
                        </p>
                    )}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default CreateAcademicDepartment;