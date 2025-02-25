/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../../api/baseApi";

export type TResponse = {


    data?: any,
    meta?: {
        limit: number,
        page: number,
        total: number,
        totalPage: number,
    },
    error: any,
    success: boolean,
    message: string


}

const academicManagementApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllSemesters: builder.query({
            query: (args) => {
                const params = new URLSearchParams();
                if (args) {
                    args.forEach((arg: { name: string; value: string; }) => params.append(arg.name, arg.value))
                }
                return {
                    url: '/academic-semesters',
                    method: "GET",
                    params: params
                }
            },

            transformResponse: (response: TResponse) => {

                return {
                    data: response.data,
                    meta: response.meta
                }
            }
        }),
        createAcademicSemester: builder.mutation({
            query: (data) => ({
                url: "/academic-semesters/create-academic-semester",
                method: "POST",
                body: data

            })
        }),
        createAcademicFaculty: builder.mutation({
            query: (data) => ({
                url: "/academic-faculties/create-academic-faculty",
                method: "POST",
                body: data

            })
        }),
        getAllAcademicFaculty:builder.query({
            query:()=>({
                url:"/academic-faculties",
                method:"GET"
            })
        }),
        createAcademicDepartment: builder.mutation({
            query: (data) => ({
                url: "/academic-departments/create-academic-department",
                method: "POST",
                body: data

            })
        }),
        getAllAcademicDepartMent: builder.query({
            query: () => ({
                url: "/academic-departments",
                method: "GET"
            })
        }),
    })
})


export const { useGetAllSemestersQuery, useCreateAcademicSemesterMutation , useCreateAcademicFacultyMutation, useGetAllAcademicFacultyQuery,useCreateAcademicDepartmentMutation,useGetAllAcademicDepartMentQuery} = academicManagementApi