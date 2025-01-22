import { baseApi } from "../../api/baseApi";
import { TResponse } from "./academicManagement";

const userManagementApi = baseApi.injectEndpoints({
    endpoints:(builder)=>({
        createStudent:builder.mutation({
            query:(data)=>({
                url:"/users/create-student",
                method:"POST",
                body:data
            }),
            invalidatesTags:["student"]
        }),
        getAllStudent: builder.query({
            query: (args) => {
                const params = new URLSearchParams();
                if (args) {
                    args.forEach((arg: { name: string; value: string; }) => params.append(arg.name, arg.value))
                }
                return {
                    url: '/students',
                    method: "GET",
                    params: params
                }
            },

            providesTags:["student"],

            transformResponse: (response: TResponse) => {

                return {
                    data: response.data,
                    meta: response.meta
                }
            },
            
            
        }),
        getAllFaculty: builder.query({
            query: (args) => {
                const params = new URLSearchParams();
                if (args) {
                    args.forEach((arg: { name: string; value: string; }) => params.append(arg.name, arg.value))
                }
                return {
                    url: '/faculties',
                    method: "GET",
                    params: params
                }
            },

            providesTags:["student"],

            transformResponse: (response: TResponse) => {

                return {
                    data: response.data,
                    meta: response.meta
                }
            },
            
            
        }),
        getSingleStudent:builder.query({
            query: (id: string |undefined) =>{
                return {
                    url: `/students/${id}`,
                    method:"GET"
                }
            },
           
            
        }),

        updateStudent: builder.mutation({
            query: ({data,id}) => {
                console.log("form redux", data, id)
              return {
                  url: `/students/${id}`,
                  method: "PATCH",
                  body: data
              }
            },
            invalidatesTags: ["student"]
           
        }),

        getCourseFaculties: builder.query({
            query: (id) => {
                return {
                    url: `/courses/${id}/get-faculties`,
                    method: 'GET',
                };
            },
            transformResponse: (response: TResponse) => {
                return {
                    data: response.data,
                    meta: response.meta,
                };
            },
        }),
       

    })
})


export const {useCreateStudentMutation,useGetAllStudentQuery,useGetSingleStudentQuery,useUpdateStudentMutation,useGetAllFacultyQuery,useGetCourseFacultiesQuery}=userManagementApi