import { Button, Layout} from 'antd';
import React, { } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useAppDispatch } from '../../Redux/hook';
import { logout } from '../../Redux/Features/auth/authSlice';
import {  toast } from 'sonner'
const { Header, Content } = Layout;

const MainLayout: React.FC = () => {

    const dispatch=useAppDispatch()
    const handleLogout=()=>{
        dispatch(logout())
        toast.success('logOut successfully')
    }
    return (
        <Layout>
            <Sidebar></Sidebar>
            <Layout>
                
                <Header style={{ padding: 0, textAlign: "center", color: "white", fontSize: "30px", textTransform: 'capitalize' }} >PH university
                    
                    <Button onClick={handleLogout} style={{marginLeft:'70%'}}>logOut</Button>
                    
                </Header>
                
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
