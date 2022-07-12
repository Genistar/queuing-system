import React from 'react';
import { Layout } from 'antd';
import TopBar from '../layout/TopBar/index';
import MenuBar from '../layout/MenuLeft/index';
import HomePage from '../pages/HomePage/index'
import { routes } from '../constants/routes';
import { Link, Route, useHistory } from 'react-router-dom';
import NotFound from '../pages/NotFound';
import DetailUserPage from '../pages/DetailUserPage';
import DashBoard from '../features/Dashboard';
import DevicesPage from '../features/Devices';
import ServicePage from '../features/Service';
import GiveNumberPage from '../features/GiveNumber';
import ReportPage from '../features/Report';
import RolePage from '../features/SystemSetting/Role';
import AccountPage from '../features/SystemSetting/Account';
import DairyPage from '../features/SystemSetting/DairyUser';
var logo = require('../assets/Logo-removebg-preview.png')

const { Header, Footer, Sider, Content } = Layout;

const LayoutPage: React.FC = (): JSX.Element => {
    const history = useHistory()
    const onHandleClick = () => {
        history.push('/admin')
        window.location.reload()
    }
    return (
        <Layout style={{
            minHeight: '100vh',
        }}>
            <Sider style={{ backgroundColor: '#fff' }}>
                <Link to='/admin' onClick={onHandleClick}>
                    <img src={logo} alt="" className='logo' />
                </Link>

                <MenuBar />
                <h3 style={{ textAlign: 'center', marginTop: '100%' }}>Đăng xuất</h3>
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
                    <div>
                        <Route path="/admin" exact={true}>
                            <HomePage></HomePage>
                        </Route>
                        <Route path='/admin/dashboard'>
                            <DashBoard />
                        </Route>
                        <Route path='/admin/userdetail'>
                            <DetailUserPage />
                        </Route>
                        <DevicesPage />
                        <ServicePage />
                        <GiveNumberPage />
                        <ReportPage />
                        <RolePage />
                        <AccountPage />
                        <DairyPage />
                    </div>
                </Content>

            </Layout>
        </Layout>
    )
}

export default LayoutPage