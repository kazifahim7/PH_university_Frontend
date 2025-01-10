import { ReactNode } from "react"

export type TUserPath = {
    name: string,
    path?: string,
    element?: JSX.Element,
    children?: {
        name: string,
        path: string,
        element: JSX.Element,
    }[]
}

export type TItem = {
    key: string,
    label: ReactNode

    children?:TItem[]
}