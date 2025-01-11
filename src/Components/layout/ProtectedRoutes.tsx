import { ReactNode } from "react";
import { useAppSelector } from "../../Redux/hook";
import { RootState } from "../../Redux/store";
import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ children }: { children: ReactNode }) => {
    const token = useAppSelector((state: RootState) => state.auth.token)
    // const user =useAppSelector((state :RootState)=>state.auth.user)

    if (!token) {
        return <Navigate to={'/login'} replace={true}></Navigate>
    }

    return children;
};

export default ProtectedRoutes;