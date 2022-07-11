import React, { useState } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Button, PageHeader, Typography } from 'antd';
import { BellOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom';
import Notification from '../../features/Notification';
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
const Topbar: React.FC = () => {
    const [showNotify, setShowNotify] = useState(false);
    return (
        <div>
            <PageHeader title="Dashboard" style={{ position: 'absolute', zIndex: 1 }} extra={[
                <div>
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
                    <a href='/admin/userdetail' ><h5>Xin chào <br /> Trần Trí Trung</h5></a>
                </>]
            }>
            </PageHeader >

        </div >
    )
}

export default Topbar