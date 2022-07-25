import React, { Fragment, useMemo, useState } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Breadcrumb, Button, Image, PageHeader, Typography } from 'antd';
import { BellOutlined, RightOutlined } from '@ant-design/icons'
import { Link, useLocation } from 'react-router-dom';
import Notification from '../../features/Notification';
import { useAppDispatch, useAppSelector } from '../../store';
import { userSelector } from '../../features/SystemSetting/Account/userSlice';
import useBreadcrumbs, { BreadcrumbsRoute } from 'use-react-router-breadcrumbs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
var image = require('../../assets/HKicon.png')
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
        path: "/admin/devices",
        breadcrumb: "Danh sách thiết bị",
        props: { root: true },
    },
    { path: "/admin/devices/add", breadcrumb: "Thêm thiết bị" },
    { path: "/admin/devices/detail/:id", breadcrumb: "Chi tiết thiết bị" },
    { path: "/admin/devices/edit/:id", breadcrumb: "Cập nhật thiết bị" },
    {
        path: "/admin/service",
        breadcrumb: "Danh sách dịch vụ",
        props: { root: true },
    },
    { path: "/admin/service/add", breadcrumb: "Thêm dịch vụ" },
    { path: "/admin/service/detail/:id", breadcrumb: "Chi tiết dịch vụ" },
    { path: "/admin/service/edit/:id", breadcrumb: "Cập nhật dịch vụ" },
    {
        path: "/admin/givenumber",
        breadcrumb: "Danh sách cấp số",
        props: { root: true },
    },
    { path: "/admin/service/add", breadcrumb: "Cấp số mới" },
    { path: "/admin/service/detail/:id", breadcrumb: "Chi tiết" },
    {
        path: "/admin/report",
        breadcrumb: "Lập báo cáo",
        props: { root: true },
    },

    {
        path: "/admin/setting",
        breadcrumb: "Cài đặt hệ thống",
        props: { isNotLink: true },
    },
    {
        path: "/admin/setting/role",
        breadcrumb: "Danh sách vai trò",
    },
    { path: "/admin/setting/role/add", breadcrumb: "Thêm vai trò" },
    { path: "/admin/setting/role/update/:id", breadcrumb: "Cập nhật vai trò" },
    {
        path: "/admin/setting/account",
        breadcrumb: "Danh sách tài khoản",
    },
    { path: "/admin/setting/account/add", breadcrumb: "Thêm tài khoản" },
    { path: "/admin/setting/account/update/:id", breadcrumb: "Cập nhật tài khoản" },
    {
        path: "/admin/setting/dairy",
        breadcrumb: "Nhật ký hoạt động",
    },
]
const breadcrumbNameMap: Record<string, string> = {
    "/admin/devicesF": "Thiết bị",
    "/admin/serviceF": "Dịch vụ",
    "/admin/givenumberF": "Cấp số",
    "/admin/reportF": "Báo cáo",
};

const Topbar: React.FC<Props> = () => {

    const [showNotify, setShowNotify] = useState(false);
    const dispatch = useAppDispatch();
    const { userLogin } = useAppSelector(userSelector);
    const location = useLocation();
    const breadcrumbs = useBreadcrumbs(routes, { disableDefaults: true });
    console.log(breadcrumbs)

    const extraBreadcrumbItems = breadcrumbs.map(
        ({ match, breadcrumb }, index) => {
            if (match.route?.props?.root) {
                return (
                    <Fragment key={index}>
                        <Breadcrumb.Item>
                            <Link to={match.pathname}>
                                {breadcrumbNameMap[match.pathname + "F"]}
                            </Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <Link to={match.pathname}>{breadcrumb}</Link>
                        </Breadcrumb.Item>
                    </Fragment>
                );
            }

            if (match.route?.props?.isNotLink) {
                return (
                    <Breadcrumb.Item key={match.pathname}>
                        {breadcrumb}
                    </Breadcrumb.Item>
                );
            }
            return (
                <Breadcrumb.Item key={match.pathname}>
                    <Link to={match.pathname}>{breadcrumb}</Link>
                </Breadcrumb.Item>
            );
        }
    );

    const breadcrumbItems = useMemo(
        () =>
            location.pathname === "/admin/dashboard"
                ? [
                    <Breadcrumb.Item key="home">
                        <Link to="/admin/dashboard">Dashboard</Link>
                    </Breadcrumb.Item>,
                ]
                : extraBreadcrumbItems,
        [location, extraBreadcrumbItems]
    );
    return (
        <div>
            <PageHeader style={{ position: 'absolute', zIndex: 1 }} extra={[
                <div>
                    <Breadcrumb separator={<RightOutlined size={12} />}>{breadcrumbItems}</Breadcrumb>

                </div>
                ,
                < div style={{ position: 'absolute', display: 'flex', left: 1004, top: 14 }}>
                    <Button
                        icon={<FontAwesomeIcon icon={faBell} style={{ color: '#ff7506', width: 16.82, height: 20.17, marginTop: 5 }} />}
                        style={{
                            backgroundColor: '#FFF2E7',
                            width: 40, height: 40, borderRadius: '100%',
                        }}
                        onClick={() => { setShowNotify(!showNotify) }}
                    />
                    <Notification show={showNotify} data={data} />
                    <Avatar
                        size={40}
                        icon={<Image
                            width={40}
                            src={image}
                        />}
                        style={{ marginLeft: 10 }}
                    />
                    <Link to='/admin/userdetail' >
                        <Typography.Text style={{ fontSize: 12, marginTop: -3, color: '#7E7D88' }}>
                            Xin chào <br />
                            <Typography.Text style={{ fontSize: 16, fontWeight: 700, marginTop: -3, color: '#535261' }}>{userLogin?.name}</Typography.Text>
                        </Typography.Text>
                    </Link>
                </div>]
            }>
            </PageHeader >

        </div >
    )
}

export default Topbar