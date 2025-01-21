
import { useForm, Controller, SubmitHandler, FieldValues, useWatch } from "react-hook-form";
import { Select, TimePicker } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";


const OfferCourse = () => {
    const [id,SetId]=useState('')


    const {
        control,
        handleSubmit,
        register,
        formState: { errors },
    } = useForm();

    const inputValue=useWatch({
        control,
        name:"course"
    })
    useEffect(()=>{
        SetId(inputValue)
    },[inputValue])
    

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        console.log(data);
    };

    return (
        <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
            <h2 className="text-2xl font-semibold mb-6 text-center">Offer Course</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* Semester Registration */}
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Semester Registration</label>
                    <Controller
                        name="semesterRegistration"
                        control={control}
                        defaultValue=""
                        rules={{ required: "Semester Registration is required" }}
                        render={({ field }) => (
                            <Select
                                {...field}
                                placeholder="Select semester registration"
                                className="w-full"
                                options={[
                                    { value: "65b6185f13c0a33cdf61589a", label: "Semester 1" },
                                ]}
                            />
                        )}
                    />
                    {errors.semesterRegistration && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.semesterRegistration.message?.toString()}
                        </p>
                    )}
                </div>

                {/* Academic Faculty */}
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Academic Faculty</label>
                    <Controller
                        name="academicFaculty"
                        control={control}
                        defaultValue=""
                        rules={{ required: "Academic Faculty is required" }}
                        render={({ field }) => (
                            <Select
                                {...field}
                                placeholder="Select academic faculty"
                                className="w-full"
                                options={[
                                    { value: "65b00f3510b74fcbd7a25d86", label: "Faculty A" },
                                ]}
                            />
                        )}
                    />
                    {errors.academicFaculty && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.academicFaculty.message?.toString()}
                        </p>
                    )}
                </div>

                {/* Academic Department */}
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Academic Department</label>
                    <Controller
                        name="academicDepartment"
                        control={control}
                        defaultValue=""
                        rules={{ required: "Academic Department is required" }}
                        render={({ field }) => (
                            <Select
                                {...field}
                                placeholder="Select academic department"
                                className="w-full"
                                options={[
                                    { value: "65b00fb010b74fcbd7a25d8e", label: "Department A" },
                                ]}
                            />
                        )}
                    />
                    {errors.academicDepartment && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.academicDepartment.message?.toString()}
                        </p>
                    )}
                </div>

                {/* Course */}
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Course</label>
                    <Controller
                        name="course"
                        control={control}
                        defaultValue=""
                        rules={{ required: "Course is required" }}
                        render={({ field }) => (
                            <Select
                                {...field}
                                placeholder="Select course"
                                className="w-full"
                                options={[{ value: "65b6001fd6ffdd9bfc058329", label: "Course A" }]}
                            />
                        )}
                    />
                    {errors.course && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.course.message?.toString()}
                        </p>
                    )}
                </div>

                {/* Faculty */}
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Faculty</label>
                    <Controller
                        name="faculty"
                        control={control}
                        defaultValue=""
                        rules={{ required: "Faculty is required" }}
                        render={({ field }) => (
                            <Select
                                {...field}
                                placeholder="Select faculty"
                                className="w-full"
                                disabled={!id}
                                options={[{ value: "65b0844ccb87974826d0b7af", label: "Faculty A" }]}
                            />
                        )}
                    />
                    {errors.faculty && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.faculty.message?.toString()}
                        </p>
                    )}
                </div>

                {/* Section */}
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Section</label>
                    <input
                        type="number"
                        {...register("section", { required: "Section is required" })}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.section && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.section.message?.toString()}
                        </p>
                    )}
                </div>

                {/* Max Capacity */}
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Max Capacity</label>
                    <input
                        type="number"
                        {...register("maxCapacity", { required: "Max capacity is required" })}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.maxCapacity && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.maxCapacity.message?.toString()}
                        </p>
                    )}
                </div>

                {/* Days */}
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Days</label>
                    <Controller
                        name="days"
                        control={control}
                        defaultValue={[]}
                        rules={{ required: "Please select days" }}
                        render={({ field }) => (
                            <Select
                                {...field}
                                mode="multiple"
                                placeholder="Select days"
                                className="w-full"
                                options={[
                                    { value: "Sat", label: "Saturday" },
                                    { value: "Sun", label: "Sunday" },
                                    { value: "Mon", label: "Monday" },
                                    { value: "Tue", label: "Tuesday" },
                                    { value: "Wed", label: "Wednesday" },
                                    { value: "Thu", label: "Thursday" },
                                    { value: "Fri", label: "Friday" },
                                ]}
                            />
                        )}
                    />
                    {errors.days && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.days.message?.toString()}
                        </p>
                    )}
                </div>

                {/* Start Time */}
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Start Time</label>
                    <Controller
                        name="startTime"
                        control={control}
                        defaultValue={dayjs("12:30", "HH:mm")}
                        render={({ field }) => (
                            <TimePicker
                                {...field}
                                format="HH:mm"
                                className="w-full"
                                value={field.value} // Ensure the value is a `dayjs` object
                                onChange={(time) => field.onChange(time)} // Pass `dayjs` object
                            />
                        )}
                    />
                </div>

                {/* End Time */}
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">End Time</label>
                    <Controller
                        name="endTime"
                        control={control}
                        defaultValue={dayjs("14:00", "HH:mm")}
                        render={({ field }) => (
                            <TimePicker
                                {...field}
                                format="HH:mm"
                                className="w-full"
                                value={field.value} // Ensure the value is a `dayjs` object
                                onChange={(time) => field.onChange(time)} // Pass `dayjs` object
                            />
                        )}
                    />
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

export default OfferCourse;