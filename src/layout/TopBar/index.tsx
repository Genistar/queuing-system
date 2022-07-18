import React, { useState } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Button, PageHeader, Typography } from 'antd';
import { BellOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom';
import Notification from '../../features/Notification';
import { useAppDispatch, useAppSelector } from '../../store';
import { userSelector } from '../../features/SystemSetting/Account/userSlice';
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

const Topbar: React.FC<Props> = () => {

    const [showNotify, setShowNotify] = useState(false);
    const dispatch = useAppDispatch();
    const { userLogin } = useAppSelector(userSelector);
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
                    <Link to='/admin/userdetail' ><h5>Xin chào <br /> {userLogin?.name}</h5></Link>
                </>]
            }>
            </PageHeader >

        </div >
    )
}

export default Topbar