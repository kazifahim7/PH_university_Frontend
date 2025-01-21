import { Select } from "antd";
import React from "react";
import { FieldValues, SubmitHandler, useForm, Controller } from "react-hook-form";
import { useCreateCourseMutation, useGetAllCoursesQuery } from "../../../Redux/Features/Admin/courseManagementApi";
import { toast } from "sonner";

const CreateCourse: React.FC = () => {
    const { control, register, reset, handleSubmit, formState: { errors } } = useForm();

    const { data: Courses } = useGetAllCoursesQuery(undefined)
    console.log(Courses?.data)

    const [createCourse] = useCreateCourseMutation()

    const coursesOption = Courses?.data.map((item: { _id: string, title: string }) => {
        return {
            value: item?._id,
            label: item?.title
        }
    })

    const onSubmit: SubmitHandler<FieldValues> =async (data) => {
        data.isDeleted = false
        data.credits = Number(data.credits)
        data.code = Number(data.code)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        data.preRequisiteCourses = data.preRequisiteCourses.map((item: any)=>({
            course:item,
            isDeleted:false

        }))
        console.log(data);
        const id=toast.loading("creating.....")

      
        try {
            const result = await createCourse(data).unwrap()
            console.log(result);
            if (result?.data) {
                toast.success(result?.message, { id })

                reset()
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.log(error)
            toast.error(error?.data.message, { id })
        }
       




    };

    return (
        <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
            <h2 className="text-2xl font-semibold mb-4 text-center">Create Course</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* Title */}
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1" htmlFor="title">
                        Course Title
                    </label>
                    <input
                        id="title"
                        type="text"
                        {...register("title", { required: "Course title is required" })}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.title && (
                        <p className="text-red-500 text-sm mt-1">{errors.title.message?.toString()}</p>
                    )}
                </div>

                {/* Prefix */}
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1" htmlFor="prefix">
                        Course Prefix
                    </label>
                    <input
                        id="prefix"
                        type="text"
                        {...register("prefix", { required: "Prefix is required" })}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.prefix && (
                        <p className="text-red-500 text-sm mt-1">{errors.prefix.message?.toString()}</p>
                    )}
                </div>

                {/* Code */}
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1" htmlFor="code">
                        Course Code
                    </label>
                    <input
                        id="code"
                        type="number"
                        {...register("code", { required: "Code is required" })}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.code && (
                        <p className="text-red-500 text-sm mt-1">{errors.code.message?.toString()}</p>
                    )}
                </div>

                {/* Credits */}
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1" htmlFor="credits">
                        Credits
                    </label>
                    <input
                        id="credits"
                        type="number"
                        {...register("credits", { required: "Credits are required" })}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.credits && (
                        <p className="text-red-500 text-sm mt-1">{errors.credits.message?.toString()}</p>
                    )}
                </div>

                {/* Prerequisite Courses */}
                <div className="mb-6">
                    <label className="block text-sm font-medium mb-2">Prerequisite Courses</label>
                    <Controller
                        name="preRequisiteCourses"
                        control={control}
                        defaultValue={[]}
                        render={({ field }) => (
                            <Select
                                {...field}
                                options={coursesOption}
                                mode="multiple"
                                size="large"
                                style={{ width: "100%" }}
                                placeholder="Select prerequisite courses"
                                onChange={(value) => field.onChange(value)}
                            />
                        )}
                    />
                    {errors.preRequisiteCourses && (
                        <p className="text-red-500 text-sm mt-1">This field is required</p>
                    )}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full px-4 py-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600"
                >
                    Create Course
                </button>
            </form>
        </div>
    );
};

export default CreateCourse;
