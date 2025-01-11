import { Layout} from 'antd';
import React, { } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
const { Header, Content } = Layout;

const MainLayout: React.FC = () => {
    return (
        <Layout style={{ height: "100vh" }}>
            <Sidebar></Sidebar>
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
            </Layout>
        </Layout>
    );
};

export default MainLayout;
