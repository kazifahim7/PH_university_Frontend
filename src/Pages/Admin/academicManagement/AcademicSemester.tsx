import { useGetAllSemestersQuery } from "../../../Redux/Features/academicSemester/ASApi";


const AcademicSemester = () => {

    const {data}=useGetAllSemestersQuery(undefined)
    console.log(data)
    return (
        <div>
            
        </div>
    );
};

export default AcademicSemester;