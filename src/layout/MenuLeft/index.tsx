import { AppstoreOutlined, DesktopOutlined, SettingOutlined, WechatOutlined, MoreOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLayerGroup, faChartLine } from '@fortawesome/free-solid-svg-icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import React from 'react';

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
    getItem(<a href='/admin/dashboard'>Dashboard</a>, 'sub1', <AppstoreOutlined />),

    getItem(<a href='/admin/devices'>Thiết bị</a>, 'sub2', <DesktopOutlined />),

    getItem(<a href='/admin/service'>Dịch vụ</a>, 'sub3', <WechatOutlined />),

    getItem('Cấp số', 'sub4', <FontAwesomeIcon icon={faLayerGroup} />),

    getItem('Báo cáo', 'sub5', <FontAwesomeIcon icon={faChartLine} />),

    getItem('Cài đặt hệ thống', 'sub6', <SettingOutlined />,
        <MoreOutlined style={{
            position: 'absolute',
            top: '50%',
            right: 10,
            transform: 'translateY(-50%)'
        }}
        />,
        [
            getItem('Quản lý vai trò', '9'),
            getItem('Quản lý tài khoản', '10'),
            getItem('Nâng cấp tài khoản', '11')
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