import { TUserPath } from "../types";



const routeGenerator = (items: TUserPath[]) => {
     const routes = items.reduce<{ path: string, element: JSX.Element }[]>((acc, item) => {
        if (item.path && item.element) {
            acc.push({ path: item.path, element: item.element });
        }
        if (item.children) {
            item.children.forEach(child => {
                acc.push({ path: child.path, element: child.element });
            });
        }
        return acc;
    }, []);
    return routes
}

export default routeGenerator