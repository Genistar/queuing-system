import { AppstoreOutlined, DesktopOutlined, SettingOutlined, WechatOutlined, MoreOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLayerGroup, faChartLine } from '@fortawesome/free-solid-svg-icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key?: React.Key | null,
    icon?: React.ReactNode,
    expandIcon?: React.ReactNode,
    children?: MenuItem[],
): MenuItem {
    return {
        key,
        icon,
        label,
        expandIcon,
        children,
    } as MenuItem;
}

const items: MenuItem[] = [
    getItem(<Link to='/admin/dashboard'>Dashboard</Link>, '/admin/dashboard', <AppstoreOutlined />),

    getItem(<Link to='/admin/devices'>Thiết bị</Link>, '/admin/devices', <DesktopOutlined />),

    getItem(<Link to='/admin/service'>Dịch vụ</Link>, '/admin/service', <WechatOutlined />),

    getItem(<Link to='/admin/givenumber'>Cấp số</Link>, '/admin/givenumber', <FontAwesomeIcon icon={faLayerGroup} />),

    getItem(<Link to='/admin/report'>Báo cáo</Link>, '/admin/report', <FontAwesomeIcon icon={faChartLine} />),

    getItem('Cài đặt hệ thống', 'sub6', <SettingOutlined />,
        <MoreOutlined style={{
            position: 'absolute',
            top: '50%',
            right: 10,
            transform: 'translateY(-50%)'
        }}
        />,
        [
            getItem(<Link to='/admin/role'>Quản lý vai trò</Link>, '/admin/role'),
            getItem(<Link to='/admin/account'>Quản lý tài khoản</Link>, '/admin/account'),
            getItem(<Link to='/admin/dairy'>Nhật ký người dùng</Link>, '/admin/dairy')
        ]),
];

const onClick: MenuProps['onClick'] = e => {
    console.log('click', e);
};

const MenuLeft: React.FC = () => {

    return (
        <div>
            <Menu onClick={onClick} style={{ width: 200, color: '#7E7D88' }} mode="vertical" items={items} />
        </div>
    )
}

export default MenuLeft