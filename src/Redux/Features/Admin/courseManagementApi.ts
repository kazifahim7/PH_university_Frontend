import { baseApi } from "../../api/baseApi";
import { TResponse } from "./academicManagement";

const courseManagementApi =baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createSemesterRegistration: builder.mutation({
            query: (data) => ({
                url: "/semester-registrations/create-semester-registration",
                method: "POST",
                body: data
            }),
            invalidatesTags: ["semester"]
        }),
        updateSemesterRegistration: builder.mutation({
            query: ({data,id}) => ({
                url: `/semester-registrations/${id}`,
                method: "PATCH",
                body: data
            }),
            invalidatesTags:["semester"]
        }),
        getAllSemesterRegisteredData: builder.query({
            query: (args) => {
                const params = new URLSearchParams();
                console.log(args)
                if (args) {
                    args.forEach((arg: { name: string; value: string; }) => params.append(arg.name, arg.value))
                }
                return {
                    url: '/semester-registrations',
                    method: "GET",
                    params: params
                }
            },
            providesTags:["semester"],
            transformResponse: (response: TResponse) => {

                return {
                    data: response.data,
                    meta: response.meta
                }
            }
        }),
    })
})


export const {useCreateSemesterRegistrationMutation,useGetAllSemesterRegisteredDataQuery,useUpdateSemesterRegistrationMutation}=courseManagementApi