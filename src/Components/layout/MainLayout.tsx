import { Layout, Menu } from 'antd';

import React, { } from 'react';
import { items } from '../../Routes/admin.routes';
import { Outlet } from 'react-router-dom';


const { Header, Content, Footer, Sider } = Layout;




const MainLayout: React.FC = () => {
    return (
        <Layout style={{ height: "100vh" }}>
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
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} items={items} />
            </Sider>
            <Layout>
                <Header style={{ padding: 0, textAlign: "center", color: "white", fontSize: "30px", textTransform: 'capitalize' }} >PH university</Header>
                <Content style={{ margin: '24px 16px 0' }}>
                    <div
                        style={{
                            padding: 24,
                            // Optional: for better contrast
                        }}
                    >
                        <Outlet></Outlet>
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    Develop by ©{new Date().getFullYear()} Kazi Fahim
                </Footer>
            </Layout>
        </Layout>
    );
};

export default MainLayout;
