import { Button } from "antd";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useLoginMutation } from "../Redux/Features/auth/authApi";
import { useAppDispatch } from "../Redux/hook";
import { setUser, TUser } from "../Redux/Features/auth/authSlice";
import { verifyToken } from "../Utils/verifytoken";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const LogIn = () => {
    const { register, handleSubmit } = useForm();

    const dispatch = useAppDispatch()

    const [login] = useLoginMutation()
    const navigate=useNavigate()


    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
     const toastId=   toast.loading("logging...")

        try {
            
            const res = await login(data).unwrap()
            const user = verifyToken(res.data.accessToken) as TUser
            dispatch(setUser({ user: { ...user }, token: res.data.accessToken }))
            if (res) {
                navigate(`/${user.role}/dashboard`)
            }
            toast.success('Login successful', { id: toastId })
        // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
        } catch (error:any) {
            toast.error("something went wrong", { id: toastId })
        }
        
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md"
            >
                <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">
                    Log In
                </h2>
                <div className="mb-4">
                    <label
                        htmlFor="id"
                        className="block text-gray-600 font-medium mb-2"
                    >
                        ID:
                    </label>
                    <input
                        type="text"
                        id="id"
                        {...register("id")}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your ID"
                    />
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="password"
                        className="block text-gray-600 font-medium mb-2"
                    >
                        Password:
                    </label>
                    <input
                        type="password"
                        id="password"
                        {...register("password")}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your password"
                    />
                </div>
               
                <Button
                    type="primary"
                    htmlType="submit"
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg"
                >
                    Log In
                </Button>
                
            </form>
        </div>
    );
};

export default LogIn;
