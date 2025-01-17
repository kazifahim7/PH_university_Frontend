import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { useCreateAcademicFacultyMutation } from "../../../Redux/Features/Admin/academicManagement";
import { toast } from "sonner";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";


const CreateAcademicFaculty = () => {
    const [createAcademicFaculty]=useCreateAcademicFacultyMutation()

    const academicFacultySchema=z.object({
        name:z.string()
    })


    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver:zodResolver(academicFacultySchema)
    });

    const onSubmit:SubmitHandler<FieldValues> = async (data) => {
        const id = toast.loading("creating...")
        console.log('Submitted Data:', data);
        const result = await createAcademicFaculty(data)
        if(result.data){
            toast.success(result.data.message,{id})
            reset({
                name:""
            })

        }else if(result.error){
            const error=result.error as FetchBaseQueryError
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
                className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
            >
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                    Create Academic Faculty
                </h2>
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

export default CreateAcademicFaculty;