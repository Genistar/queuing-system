import React, { useState } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Breadcrumb, Button, PageHeader, Typography } from 'antd';
import { BellOutlined } from '@ant-design/icons'
import { Link, useLocation } from 'react-router-dom';
import Notification from '../../features/Notification';
import { useAppDispatch, useAppSelector } from '../../store';
import { userSelector } from '../../features/SystemSetting/Account/userSlice';
import { BreadcrumbsRoute } from 'use-react-router-breadcrumbs';
const { Title } = Typography;
const data = [
    {
        name: "Nguyễn Thị Thuỳ Dung",
        time: "12h20 ngày 30/11/2021",
    },
    {
        name: "Nguyễn Thị Thuỳ Dung",
        time: "12h20 ngày 30/11/2021",
    },
    {
        name: "Nguyễn Thị Thuỳ Dung",
        time: "12h20 ngày 30/11/2021",
    },
    {
        name: "Nguyễn Thị Thuỳ Dung",
        time: "12h20 ngày 30/11/2021",
    },
    {
        name: "Nguyễn Thị Thuỳ Dung",
        time: "12h20 ngày 30/11/2021",
    },
    {
        name: "Nguyễn Thị Thuỳ Dung",
        time: "12h20 ngày 30/11/2021",
    },
    {
        name: "Nguyễn Thị Thuỳ Dung",
        time: "12h20 ngày 30/11/2021",
    },
];
interface Props {

}
const routes: BreadcrumbsRoute[] = [
    {
        path: '/admin/devices',
        breadcrumb: 'Danh sách thiết bị'
    }
]
const breadcrumbNameMap: Record<string, string> = {
    '/admin/devices': 'Danh sách thiết bị',
    '/admin/devices/add': 'Thêm thiết bị',
    '/admin/devices/update/:key': 'Cập nhật thiết bị',
    '/admin/devices/detail/:key': 'Chi tiết thiết bị',
    '/apps/2/detail': 'Detail',
};

const Topbar: React.FC<Props> = () => {

    const [showNotify, setShowNotify] = useState(false);
    const dispatch = useAppDispatch();
    const { userLogin } = useAppSelector(userSelector);
    const location = useLocation();
    const pathSnippets = location.pathname.split('/').filter((i) => i);
    const extraBreadcrumbItems = pathSnippets.map((_, index) => {
        const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
        return (
            <Breadcrumb.Item key={url}>
                <Link to={url}>{breadcrumbNameMap[url]}</Link>
            </Breadcrumb.Item>
        );
    });
    const breadcrumbItems = [
        <Breadcrumb.Item key="home">
            <Link to="/admin/dashboard">Dashboard</Link>
        </Breadcrumb.Item>,
    ].concat(extraBreadcrumbItems);
    return (
        <div>
            <PageHeader style={{ position: 'absolute', zIndex: 1 }} extra={[
                <div>
                    <Breadcrumb>{breadcrumbItems}</Breadcrumb>
                    <Button
                        icon={<BellOutlined style={{ color: '#fff' }} />}
                        style={{ marginLeft: 920, backgroundColor: '#ff7506', width: 40, height: 40, borderRadius: '100%' }}
                        onClick={() => { setShowNotify(!showNotify) }}
                    />
                    <Notification show={showNotify} data={data} />
                </div>
                ,
                <>
                    <Avatar size={40} icon={<UserOutlined />} />
                    <Link to='/admin/userdetail' ><h5>Xin chào <br /> {userLogin?.name}</h5></Link>
                </>]
            }>
            </PageHeader >

        </div >
    )
}

export default Topbar