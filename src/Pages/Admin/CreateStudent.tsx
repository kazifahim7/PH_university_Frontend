import React from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useGetAllAcademicDepartMentQuery, useGetAllSemestersQuery } from '../../Redux/Features/Admin/academicManagement';
import { useCreateStudentMutation } from '../../Redux/Features/Admin/usermanageManagementApi';
import { toast } from 'sonner';

type FormData = {
    image?: string | File,
    student: {
        name: {
            firstName: string;
            middleName?: string;
            lastName: string;
        };
        gender: string;
        dateOfBirth: string;
        email: string;
        contactNo: string;
        emergencyContactNo: string;
        bloogGroup: string;
        admissionSemester: string;
        academicDepartment: string;
        presentAddress: string;
        permanentAddress: string;
        guardian: {
            fatherName: string;
            fatherOccupation: string;
            fatherContactNo: string;
            motherName: string;
            motherOccupation: string;
            motherContactNo: string;
        };
        localGuardian: {
            name: string;
            occupation: string;
            contactNo: string;
            address: string;
        };
    };
};

const CreateStudent: React.FC = () => {
    const [CreateStudent] = useCreateStudentMutation()
    const { data, isLoading } = useGetAllSemestersQuery(undefined)
    const { data: academicDepartment } = useGetAllAcademicDepartMentQuery(undefined, { skip: isLoading })
    console.log(academicDepartment)
    const {
        register,
        reset,
        handleSubmit,
    } = useForm<FormData>();

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {

        data.image = data.image?.[0]
       

        const id = toast.loading("creating..")

        const formData = new FormData()
        formData.append("data", JSON.stringify(data))
        formData.append("file", data.image)
        const result = await CreateStudent(formData)
        console.log(result)
        if (result.data) {
            toast.success(result.data.message, { id })
            reset()
        } else if (result.error) {
            toast.error("something went wrong", { id })
        }
        //!just for checking data is ok this talk on this below console
        // console.log(Object.fromEntries(formData))

    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Student Information */}
            <div>
                <h3 className="text-lg font-bold text-gray-700">Student Information</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-gray-700">First Name</label>
                        <input
                            {...register("student.name.firstName", { required: "First name is required" })}
                            type="text"
                            className="w-full px-4 py-2 border rounded-md"
                            placeholder="First Name"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Middle Name</label>
                        <input
                            {...register("student.name.middleName")}
                            type="text"
                            className="w-full px-4 py-2 border rounded-md"
                            placeholder="Middle Name (Optional)"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Last Name</label>
                        <input
                            {...register("student.name.lastName", { required: "Last name is required" })}
                            type="text"
                            className="w-full px-4 py-2 border rounded-md"
                            placeholder="Last Name"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Gender</label>
                        <select
                            {...register("student.gender", { required: "Gender is required" })}
                            className="w-full px-4 py-2 border rounded-md"
                        >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-gray-700">Date of Birth</label>
                        <input
                            {...register("student.dateOfBirth", { required: "Date of Birth is required" })}
                            type="date"
                            className="w-full px-4 py-2 border rounded-md"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Email</label>
                        <input
                            {...register("student.email", { required: "Email is required" })}
                            type="email"
                            className="w-full px-4 py-2 border rounded-md"
                            placeholder="Email"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">image</label>
                        <input
                            {...register("image")}
                            type="file"
                            className="w-full px-4 py-2 border rounded-md"
                            placeholder="image"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Contact No</label>
                        <input
                            {...register("student.contactNo", { required: "Contact number is required" })}
                            type="text"
                            className="w-full px-4 py-2 border rounded-md"
                            placeholder="Contact No"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Emergency Contact No</label>
                        <input
                            {...register("student.emergencyContactNo", { required: "Emergency contact number is required" })}
                            type="text"
                            className="w-full px-4 py-2 border rounded-md"
                            placeholder="Emergency Contact No"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Blood Group</label>
                        <select
                            {...register("student.bloogGroup", { required: "Blood group is required" })}
                            className="w-full px-4 py-2 border rounded-md"
                        >
                            <option value="">Select Blood Group</option>
                            <option value="A+">A+</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B-">B-</option>
                            <option value="AB+">AB+</option>
                            <option value="AB-">AB-</option>
                            <option value="O+">O+</option>
                            <option value="O-">O-</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-gray-700">Admission Semester</label>
                        <select
                            {...register("student.admissionSemester", { required: "Admission semester is required" })}
                            className="w-full px-4 py-2 border rounded-md"
                        >
                            <option value="">Select Semester</option>
                            {data?.data.map((item: { _id: string, name: string, year: string }) => (<option key={item._id} value={item._id}>{item.name} ({item.year})</option>))}


                        </select>

                    </div>
                    <div>
                        <label className="block text-gray-700">Academic Department</label>
                        <select
                            {...register("student.academicDepartment", { required: "Academic department is required" })}
                            className="w-full px-4 py-2 border rounded-md"
                        >
                            <option value="">Select Department</option>
                            {academicDepartment?.data.map((item: { _id: string, name: string }) => (
                                <option key={item._id} value={item._id}>{item.name}</option>
                            ))}


                        </select>
                    </div>

                </div>
            </div>

            {/* Address */}
            <div>
                <h3 className="text-lg font-bold text-gray-700">Address</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-gray-700">Present Address</label>
                        <input
                            {...register("student.presentAddress", { required: "Present address is required" })}
                            type="text"
                            className="w-full px-4 py-2 border rounded-md"
                            placeholder="Present Address"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Permanent Address</label>
                        <input
                            {...register("student.permanentAddress", { required: "Permanent address is required" })}
                            type="text"
                            className="w-full px-4 py-2 border rounded-md"
                            placeholder="Permanent Address"
                        />
                    </div>
                </div>
            </div>

            {/* Guardian Information */}
            <div>
                <h3 className="text-lg font-bold text-gray-700">Guardian Information</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-gray-700">Father's Name</label>
                        <input
                            {...register("student.guardian.fatherName", { required: "Father's name is required" })}
                            type="text"
                            className="w-full px-4 py-2 border rounded-md"
                            placeholder="Father's Name"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Father's Occupation</label>
                        <input
                            {...register("student.guardian.fatherOccupation", { required: "Father's occupation is required" })}
                            type="text"
                            className="w-full px-4 py-2 border rounded-md"
                            placeholder="Father's Occupation"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Father's Contact No</label>
                        <input
                            {...register("student.guardian.fatherContactNo", { required: "Father's contact number is required" })}
                            type="text"
                            className="w-full px-4 py-2 border rounded-md"
                            placeholder="Father's Contact No"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Mother's Name</label>
                        <input
                            {...register("student.guardian.motherName", { required: "Mother's name is required" })}
                            type="text"
                            className="w-full px-4 py-2 border rounded-md"
                            placeholder="Mother's Name"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Mother's Occupation</label>
                        <input
                            {...register("student.guardian.motherOccupation", { required: "Mother's occupation is required" })}
                            type="text"
                            className="w-full px-4 py-2 border rounded-md"
                            placeholder="Mother's Occupation"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Mother's Contact No</label>
                        <input
                            {...register("student.guardian.motherContactNo", { required: "Mother's contact number is required" })}
                            type="text"
                            className="w-full px-4 py-2 border rounded-md"
                            placeholder="Mother's Contact No"
                        />
                    </div>
                </div>
            </div>

            {/* Local Guardian Information */}
            <div>
                <h3 className="text-lg font-bold text-gray-700">Local Guardian Information</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-gray-700">Name</label>
                        <input
                            {...register("student.localGuardian.name", { required: "Local guardian name is required" })}
                            type="text"
                            className="w-full px-4 py-2 border rounded-md"
                            placeholder="Guardian Name"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Occupation</label>
                        <input
                            {...register("student.localGuardian.occupation", { required: "Occupation is required" })}
                            type="text"
                            className="w-full px-4 py-2 border rounded-md"
                            placeholder="Occupation"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Contact No</label>
                        <input
                            {...register("student.localGuardian.contactNo", { required: "Contact number is required" })}
                            type="text"
                            className="w-full px-4 py-2 border rounded-md"
                            placeholder="Contact No"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Address</label>
                        <input
                            {...register("student.localGuardian.address", { required: "Address is required" })}
                            type="text"
                            className="w-full px-4 py-2 border rounded-md"
                            placeholder="Address"
                        />
                    </div>
                </div>
            </div>

            <button
                type="submit"
                className="px-6 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
                Submit
            </button>
        </form>
    );
};

export default CreateStudent;
