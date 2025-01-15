import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

const CreateAcademicSemester = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        console.log(data);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg w-full">
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
                            {["Summer", "Autumn", "Fall"].map((name) => (
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
                        <input
                            type="number"
                            id="year"
                            {...register("year", {
                                required: "Year is required",
                                min: { value: 2000, message: "Year must be 2000 or later" },
                                max: { value: 2100, message: "Year must be 2100 or earlier" },
                            })}
                            placeholder="Enter year"
                            className="mt-1 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                        {errors.year?.message && (
                            <span className="text-red-600">{errors.year.message.toString()}</span>
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
    );
};

export default CreateAcademicSemester;
