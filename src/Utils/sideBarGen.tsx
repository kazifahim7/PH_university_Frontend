import { NavLink } from "react-router-dom"
import { TItem, TUserPath } from "../types"





const sidebarGenerator =(items:TUserPath[],role:"admin" |"faculty"|"student")=>{
    const sidebarItems = items.reduce((acc: TItem[] , item) => {
        if (item.name && item.path) {
            acc.push({
                key: item.name,
                label: <NavLink to={`/${role}/${item.path}`}>{item.name}</NavLink>
            })


        }
        if (item.children) {
            acc.push({
                key: item.name,
                label: item.name,
                children: item.children.map((child) => {
                    if(child.name){

                        return {
                            key: child.name,
                            label: <NavLink to={`/${role}/${child.path}`}>{child.name}</NavLink>
                        }
                    }
                })
            })
        }
        return acc
    }, [])

    return sidebarItems
    
}

export default sidebarGenerator