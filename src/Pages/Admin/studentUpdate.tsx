import { useNavigate, useParams } from "react-router-dom";
import { useGetSingleStudentQuery, useUpdateStudentMutation } from "../../Redux/Features/Admin/usermanageManagementApi";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { FormData } from "./CreateStudent";
import { useGetAllAcademicDepartMentQuery, useGetAllSemestersQuery } from "../../Redux/Features/Admin/academicManagement";
import { toast } from "sonner";


const StudentUpdate = () => {
    const { id } = useParams()
    console.log(id)
    const { data,isLoading ,refetch } = useGetSingleStudentQuery(id)
    const { data: semester,isLoading:isLoading2 } = useGetAllSemestersQuery(undefined,{skip:isLoading})
    const { data: academicDepartment } = useGetAllAcademicDepartMentQuery(undefined, { skip: isLoading2 })
    const [updateStudent,{data:updatedData}] = useUpdateStudentMutation()
    console.log(updatedData)
    const navigate=useNavigate()

    const forDefaultValue = data?.data
    console.log(forDefaultValue?._id,"hello world")
    const formData = {

        name: forDefaultValue?.name,
        gender: forDefaultValue?.gender,
        dateOfBirth: forDefaultValue?.dateOfBirth,
        email: forDefaultValue?.email,
        contactNo: forDefaultValue?.contactNo,
        emergencyContactNo: forDefaultValue?.emergencyContactNo,
        bloogGroup: forDefaultValue?.bloogGroup,
        admissionSemester: forDefaultValue?.admissionSemester?._id,
        academicDepartment: forDefaultValue?.academicDepartment?._id,
        presentAddress: forDefaultValue?.presentAddress,
        permanentAddress: forDefaultValue?.permanentAddress,
        guardian: forDefaultValue?.guardian,
        localGuardian: forDefaultValue?.localGuardian,

    }
    const {
        register,
        handleSubmit,
    } = useForm<FormData>({
        defaultValues: {
            student: formData
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {


       

        const id = toast.loading("updating..")


       try {
           const result = await updateStudent({ data: data, id: forDefaultValue?._id }).unwrap()
           console.log(result)

           if (result.data) {
               toast.success(result.message, { id })

               navigate("/admin/students-data")
              await refetch()
           } else if (result.error) {
               toast.error("something went wrong", { id })
           }
      
       } catch (error) {
        console.log(error)
           toast.error("something went wrong", { id })
       }
        //!just for checking data is ok this talk on this below console
        // console.log(Object.fromEntries(formData))

    };

    if(isLoading){
        return <p>loading.......</p>
    }


    return (
        <form  onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Student Information */}
            <div>
                <h3 className="text-lg font-bold text-gray-700">Student Information</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-gray-700">First Name</label>
                        <input
                            {...register("student.name.firstName")}
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
                            {...register("student.name.lastName")}
                            type="text"
                            className="w-full px-4 py-2 border rounded-md"
                            placeholder="Last Name"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Gender</label>
                        <select
                            {...register("student.gender")}
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
                            {...register("student.dateOfBirth")}
                            type="date"
                            className="w-full px-4 py-2 border rounded-md"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Email</label>
                        <input
                            {...register("student.email")}
                            type="email"
                            className="w-full px-4 py-2 border rounded-md"
                            placeholder="Email"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Contact No</label>
                        <input
                            {...register("student.contactNo")}
                            type="text"
                            className="w-full px-4 py-2 border rounded-md"
                            placeholder="Contact No"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Emergency Contact No</label>
                        <input
                            {...register("student.emergencyContactNo")}
                            type="text"
                            className="w-full px-4 py-2 border rounded-md"
                            placeholder="Emergency Contact No"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Blood Group</label>
                        <select
                            {...register("student.bloogGroup")}
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
                            {...register("student.admissionSemester")}
                            className="w-full px-4 py-2 border rounded-md"
                        >
                            <option value="">Select Semester</option>
                            {semester?.data.map((item: { _id: string, name: string, year: string }) => (<option key={item._id} value={item._id}>{item.name} ({item.year})</option>))}


                        </select>

                    </div>
                    <div>
                        <label className="block text-gray-700">Academic Department</label>
                        <select
                            {...register("student.academicDepartment",)}
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
                            {...register("student.presentAddress")}
                            type="text"
                            className="w-full px-4 py-2 border rounded-md"
                            placeholder="Present Address"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Permanent Address</label>
                        <input
                            {...register("student.permanentAddress")}
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
                            {...register("student.guardian.fatherName")}
                            type="text"
                            className="w-full px-4 py-2 border rounded-md"
                            placeholder="Father's Name"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Father's Occupation</label>
                        <input
                            {...register("student.guardian.fatherOccupation")}
                            type="text"
                            className="w-full px-4 py-2 border rounded-md"
                            placeholder="Father's Occupation"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Father's Contact No</label>
                        <input
                            {...register("student.guardian.fatherContactNo")}
                            type="text"
                            className="w-full px-4 py-2 border rounded-md"
                            placeholder="Father's Contact No"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Mother's Name</label>
                        <input
                            {...register("student.guardian.motherName")}
                            type="text"
                            className="w-full px-4 py-2 border rounded-md"
                            placeholder="Mother's Name"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Mother's Occupation</label>
                        <input
                            {...register("student.guardian.motherOccupation")}
                            type="text"
                            className="w-full px-4 py-2 border rounded-md"
                            placeholder="Mother's Occupation"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Mother's Contact No</label>
                        <input
                            {...register("student.guardian.motherContactNo")}
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
                            {...register("student.localGuardian.name",)}
                            type="text"
                            className="w-full px-4 py-2 border rounded-md"
                            placeholder="Guardian Name"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Occupation</label>
                        <input
                            {...register("student.localGuardian.occupation")}
                            type="text"
                            className="w-full px-4 py-2 border rounded-md"
                            placeholder="Occupation"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Contact No</label>
                        <input
                            {...register("student.localGuardian.contactNo")}
                            type="text"
                            className="w-full px-4 py-2 border rounded-md"
                            placeholder="Contact No"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Address</label>
                        <input
                            {...register("student.localGuardian.address")}
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

export default StudentUpdate;