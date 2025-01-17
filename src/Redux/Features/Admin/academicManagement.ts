/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../../api/baseApi";

type TResponse = {


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
                const params= new URLSearchParams();
               if(args){
                args.forEach((arg: { name: string; value: string; })=>params.append(arg.name,arg.value))
               }
                return {
                    url: '/academic-semesters',
                    method: "GET",
                    params:params
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
        })
    })
})


export const { useGetAllSemestersQuery, useCreateAcademicSemesterMutation } = academicManagementApi