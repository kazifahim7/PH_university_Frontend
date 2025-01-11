/* eslint-disable prefer-const */
import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import sidebarGenerator from "../../Utils/sideBarGen";
import { admin2 } from "../../Routes/admin.routes";
import { facultyPaths } from "../../Routes/faculty.routes";
import { studentPaths } from "../../Routes/student.routes";

const Sidebar = () => {
    let role: string = "admin"
    return (
        <>
            <Sider
                breakpoint="lg"
                collapsedWidth="0"
                onBreakpoint={(broken) => {
                    console.log('Breakpoint:', broken);
                }}
                onCollapse={(collapsed, type) => {
                    console.log('Collapsed:', collapsed, 'Type:', type);
                }}
            >
                <div style={{ padding: "0 30%", textAlign: "center", color: "white", fontSize: "30px", textTransform: 'capitalize', fontWeight: 700 }}>
                    <img src="https://i.ibb.co.com/26QqpMt/browsing.png" alt="" style={{ width: "55px", color: "purple" }} />
                </div>
                {
                    role === "admin" && <Menu theme="dark" mode="inline" defaultSelectedKeys={['Dashboard']} items={sidebarGenerator(admin2, "admin")} />
                }
                {
                    role === "faculty" && <Menu theme="dark" mode="inline" defaultSelectedKeys={['Dashboard']} items={sidebarGenerator(facultyPaths, "faculty")} />
                }
                {
                    role === "student" && <Menu theme="dark" mode="inline" defaultSelectedKeys={['Dashboard']} items={sidebarGenerator(studentPaths, "student")} />
                }

            </Sider>
        </>
    );
};

export default Sidebar;