import { AppstoreOutlined, DesktopOutlined, SettingOutlined, WechatOutlined } from '@ant-design/icons';
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
    children?: MenuItem[],
    type?: 'group',
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
        type,
    } as MenuItem;
}

const items: MenuItem[] = [
    getItem(<a href='/admin/dashboard'>Dashboard</a>, 'sub1', <AppstoreOutlined />),

    getItem(<a href='/admin/devices'>Thiết bị</a>, 'sub2', <DesktopOutlined />),

    getItem('Dịch vụ', 'sub3', <WechatOutlined />),

    getItem('Cấp số', 'sub4', <FontAwesomeIcon icon={faLayerGroup} />),

    getItem('Báo cáo', 'sub5', <FontAwesomeIcon icon={faChartLine}></FontAwesomeIcon>),

    getItem('Cài đặt hệ thống', 'sub6', <SettingOutlined />),
];

const onClick: MenuProps['onClick'] = e => {
    console.log('click', e);
};

const MenuLeft: React.FC = () => {

    return (
        <div>
            <Menu onClick={onClick} style={{ width: 200 }} mode="vertical" items={items} />
        </div>
    )
}

export default MenuLeft