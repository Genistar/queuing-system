import React, { useState } from 'react';
import { Button, Image, Layout, Typography } from 'antd';
import TopBar from '../layout/TopBar/index';
import MenuBar from '../layout/MenuLeft/index';
import { Link, Navigate, Route, Routes } from 'react-router-dom';
import DetailUserPage from '../pages/DetailUserPage';
import DashBoard from '../features/Dashboard';
import DevicesPage from '../features/Devices';
import ServicePage from '../features/Service';
import GiveNumberPage from '../features/GiveNumber';
import ReportPage from '../features/Report';
import { useAppDispatch, useAppSelector } from '../store';
import { userSelector, logout } from '../features/SystemSetting/Account/userSlice';
import SettingPage from '../features/SystemSetting';
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';
import Icon, { HomeOutlined } from '@ant-design/icons';
var logo = require('../assets/Logo-removebg-preview.png')
var logoutImage = require('../assets/logout.png')
const { Header, Footer, Sider, Content } = Layout;

interface Props {
}
const logoutIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style={{ width: 20, height: 20, marginTop: 9, marginLeft: -120 }}>
        <path d="M160 416H96c-17.67 0-32-14.33-32-32V128c0-17.67 14.33-32 32-32h64c17.67 0 32-14.33 32-32S177.7 32 160 32H96C42.98 32 0 74.98 0 128v256c0 53.02 42.98 96 96 96h64c17.67 0 32-14.33 32-32S177.7 416 160 416zM502.6 233.4l-128-128c-12.51-12.51-32.76-12.49-45.25 0c-12.5 12.5-12.5 32.75 0 45.25L402.8 224H192C174.3 224 160 238.3 160 256s14.31 32 32 32h210.8l-73.38 73.38c-12.5 12.5-12.5 32.75 0 45.25s32.75 12.5 45.25 0l128-128C515.1 266.1 515.1 245.9 502.6 233.4z" />
    </svg>
);
const LogoutIcon = (props: Partial<CustomIconComponentProps>) => (
    <Icon component={logoutIcon} {...props} />
);
const LayoutPage: React.FC<Props> = (props: Props): JSX.Element => {
    const onHandleClick = () => {
        <Navigate to='/admin' replace={true} />
        window.location.reload()
    }
    const dispatch = useAppDispatch();
    const { userLogin } = useAppSelector(userSelector)
    if (userLogin) {
        return (
            <Layout style={{
                minHeight: '100vh',
            }}>
                <Sider style={{ backgroundColor: '#fff' }}>
                    <Link to='/admin' onClick={onHandleClick}>
                        <img src={logo} alt="" className='logo' />
                    </Link>

                    <MenuBar />
                    <Button
                        style={{
                            textAlign: 'center',
                            marginTop: '100%',
                            marginLeft: 12,
                            width: 176,
                            height: 48,
                            backgroundColor: '#FFF2E7',
                            color: '#FF7506',
                            fontSize: 16,
                            fontWeight: 600,
                            borderRadius: 8
                        }}
                        icon={
                            <Image src={logoutImage} style={{ width: 20, height: 20, marginTop: 0, marginLeft: -120 }} />
                        }
                        onClick={() => { dispatch(logout()) }}
                        title='Đăng xuất'
                    >
                        <Typography.Text style={{ marginTop: 3, marginLeft: -40, color: '#ff7506' }}>
                            Đăng xuất
                        </Typography.Text>
                    </Button>
                </Sider>
                <Layout className="site-layout">
                    <Header
                        style={{
                            padding: 0,
                            backgroundColor: '#f0f2f5',
                        }}
                    >
                        <TopBar />
                    </Header>
                    <Content style={{
                        margin: '10% 4%'
                    }}>
                        <Routes>
                            <Route path='/dashboard' element={<DashBoard />} />
                            <Route path='/userdetail' element={<DetailUserPage />} />
                            <Route path='/devices/*' element={<DevicesPage />} />
                            <Route path='/service/*' element={<ServicePage />} />
                            <Route path='/givenumber/*' element={<GiveNumberPage />} />
                            <Route path='/report/*' element={<ReportPage />} />
                            <Route path='/setting/*' element={<SettingPage />} />
                        </Routes>
                    </Content>

                </Layout>
            </Layout>
        )

    }
    else {
        return <Navigate to='/auth/login' />
    }

}

export default LayoutPage