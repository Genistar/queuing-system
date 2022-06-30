import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, PageHeader, Typography } from 'antd';
import { BellOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom';
const { Title } = Typography;
const Topbar: React.FC = () => {
    return (
        <div>
            <PageHeader title="Dashboard" style={{ position: 'absolute', zIndex: 1 }} extra={[
                <Avatar size={40} icon={<BellOutlined />} style={{ marginLeft: 920 }} />,
                <>
                    <Avatar size={40} icon={<UserOutlined />} />
                    <Link to='/admin/userdetail' ><h5>Xin chào <br /> Trần Trí Trung</h5></Link>
                </>]}>
            </PageHeader >

        </div >
    )
}

export default Topbar