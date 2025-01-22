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
        getAllCourses: builder.query({
            query: (args) => {
                const params = new URLSearchParams();
                console.log(args)
                if (args) {
                    args.forEach((arg: { name: string; value: string; }) => params.append(arg.name, arg.value))
                }
                return {
                    url: '/courses',
                    method: "GET",
                    params: params
                }
            },
            providesTags: ["course"],
            transformResponse: (response: TResponse) => {

                return {
                    data: response.data,
                    meta: response.meta
                }
            }
        }),
        createCourse: builder.mutation({
            query: (data) => ({
                url: "/courses/create-course",
                method: "POST",
                body: data
            }),
            invalidatesTags: ["course"]
        }),
        offerCourse: builder.mutation({
            query: (data) => ({
                url: "/offered-courses/create-offered-course",
                method: "POST",
                body: data
            }),
            invalidatesTags: ["course"]
        }),
        assignFaculties: builder.mutation({
            query: ({ data, id }) => ({
                url: `/courses/${id}/assign-faculties`,
                method: "PUT",
                body: data
            }),
            invalidatesTags: ["course"]
        }),
    })
})


export const { useCreateSemesterRegistrationMutation, useGetAllSemesterRegisteredDataQuery, useUpdateSemesterRegistrationMutation, useGetAllCoursesQuery, useCreateCourseMutation,useAssignFacultiesMutation,useOfferCourseMutation}=courseManagementApi