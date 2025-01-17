import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { useCreateAcademicSemesterMutation } from "../../../Redux/Features/Admin/academicManagement";
import { toast } from "sonner";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

const CreateAcademicSemester = () => {
    const academicSemesterSchema = z.object({
        name: z.string({ required_error: "Name is Required" }),
        year: z.string({ required_error: "Name is Required" }),
        code: z.enum(["01", "02", "03"], { required_error: "code is required" }),
        startMonth: z.enum([
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ], { required_error: "start Month is required" }),
        endMonth: z.enum([
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ], { required_error: "End Month is required" })
    })





    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(academicSemesterSchema)
    });

    const [CreateAcademicSemester] = useCreateAcademicSemesterMutation()

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const id = toast.loading(" Creating...")


        const result = await CreateAcademicSemester(data)
        if (result.data) {

            toast.success(`${result?.data.message}`, { id: id })
            reset({
                name: "",
                year: "",
                code: "",
                startMonth: "",
                endMonth: "",
            })

        }
        else if (result.error) {
            console.log(result.error)
            const error = result.error as FetchBaseQueryError
            if (error.data) {

                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                toast.error(`${(error.data as any).message}`, { id: id })
            }
        }

    };

    return (
        <div className="">
            <div className="flex items-center justify-center min-h-screen  bg-[url('https://i.postimg.cc/FFYpwr7D/top-view-school-supplies-with-microscope.jpg')] bg-cover ">
                <div className="bg-gray-100 bg-opacity-95 rounded-lg shadow-lg p-8 max-w-lg w-full">
                    <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
                        Create Academic Semester
                    </h2>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        {/* Name Field */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                Name
                            </label>
                            <select
                                id="name"
                                {...register("name", { required: "Name is required" })}
                                className="mt-1 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="" disabled selected>
                                    Select a name
                                </option>
                                {["Autumn", "Summer", "Fall"].map((name) => (
                                    <option key={name} value={name}>
                                        {name}
                                    </option>
                                ))}
                            </select>
                            {errors.name?.message && (
                                <span className="text-red-600">{errors.name.message.toString()}</span>
                            )}
                        </div>

                        {/* Year Field */}
                        <div>
                            <label htmlFor="year" className="block text-sm font-medium text-gray-700">
                                Year
                            </label>
                            <select
                                id="year"
                                {...register("year", { required: "year is required" })}
                                className="mt-1 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="" disabled selected>
                                    Select a year
                                </option>
                                {[Number(new Date().getFullYear()).toString(), (Number(new Date().getFullYear()) + 1).toString(), (Number(new Date().getFullYear()) + 2).toString(), (Number(new Date().getFullYear()) + 3).toString()].map((name) => (
                                    <option key={name} value={name}>
                                        {name}
                                    </option>
                                ))}
                            </select>
                            {errors.year?.message && (
                                <span className="text-red-600">{errors?.year?.message.toString()}</span>
                            )}
                        </div>

                        {/* Code Field */}
                        <div>
                            <label htmlFor="code" className="block text-sm font-medium text-gray-700">
                                Code
                            </label>
                            <select
                                id="code"
                                {...register("code", { required: "Code is required" })}
                                className="mt-1 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="" disabled selected>
                                    Select a code
                                </option>
                                {["01", "02", "03"].map((code) => (
                                    <option key={code} value={code}>
                                        {code}
                                    </option>
                                ))}
                            </select>
                            {errors.code?.message && (
                                <span className="text-red-600">{errors.code.message.toString()}</span>
                            )}
                        </div>

                        {/* Start Month Field */}
                        <div>
                            <label htmlFor="startMonth" className="block text-sm font-medium text-gray-700">
                                Start Month
                            </label>
                            <select
                                id="startMonth"
                                {...register("startMonth", { required: "Start month is required" })}
                                className="mt-1 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="" disabled selected>
                                    Select start month
                                </option>
                                {[
                                    "January",
                                    "February",
                                    "March",
                                    "April",
                                    "May",
                                    "June",
                                    "July",
                                    "August",
                                    "September",
                                    "October",
                                    "November",
                                    "December",
                                ].map((month) => (
                                    <option key={month} value={month}>
                                        {month}
                                    </option>
                                ))}
                            </select>
                            {errors.startMonth?.message && (
                                <span className="text-red-600">{errors.startMonth.message.toString()}</span>
                            )}
                        </div>

                        {/* End Month Field */}
                        <div>
                            <label htmlFor="endMonth" className="block text-sm font-medium text-gray-700">
                                End Month
                            </label>
                            <select
                                id="endMonth"
                                {...register("endMonth", { required: "End month is required" })}
                                className="mt-1 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="" disabled selected>
                                    Select end month
                                </option>
                                {[
                                    "January",
                                    "February",
                                    "March",
                                    "April",
                                    "May",
                                    "June",
                                    "July",
                                    "August",
                                    "September",
                                    "October",
                                    "November",
                                    "December",
                                ].map((month) => (
                                    <option key={month} value={month}>
                                        {month}
                                    </option>
                                ))}
                            </select>
                            {errors.endMonth?.message && (
                                <span className="text-red-600">{errors.endMonth.message.toString()}</span>
                            )}
                        </div>

                        {/* Submit Button */}
                        <div>
                            <button
                                type="submit"
                                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 rounded-lg shadow-md transition duration-200"
                            >
                                Create Semester
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateAcademicSemester;
