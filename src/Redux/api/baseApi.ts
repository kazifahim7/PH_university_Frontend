
import { BaseQueryApi, createApi, FetchArgs, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '../store'
import { logout, setUser } from '../Features/auth/authSlice'


const baseQuery = fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/v1",
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth.token
        if (token) {
            headers.set("authorization", `${token}`)
        }
        return headers
    }

})


// eslint-disable-next-line @typescript-eslint/no-empty-object-type
const baseQueryWithRefreshToken = async (args: string | FetchArgs, api: BaseQueryApi, extraOption: {}) => {
    let result = await baseQuery(args, api, extraOption)

    if (result?.error?.status === 401) {
        const res = await fetch('http://localhost:5000/api/v1/auth/refresh-token', {
            method: "POST",
            credentials: "include"
        })
        const data = await res.json()
        if(data?.data.accessToken){
            const user = (api.getState() as RootState).auth.user
            api.dispatch(setUser({
                user,
                token: data.data?.accessToken
            }))
        }else{
            api.dispatch(logout())
        }

       

        result = await baseQuery(args, api, extraOption)
       

    }
    return result
}




export const baseApi = createApi({
    reducerPath: "baseApi",
    baseQuery: baseQueryWithRefreshToken,
    endpoints: () => ({})
})