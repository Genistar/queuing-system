import { List, Typography } from 'antd'
import moment from 'moment';
import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../store';
import { getAll, giveNumberSelector } from '../GiveNumber/giveNumberSlice';
const { Title, Text } = Typography;
interface Props {
    show: boolean,
    data: {
        name: string;
        time: string;
    }[]
}

const Notification: React.FC<Props> = (props: Props) => {
    const { show, data } = props;
    const dispatch = useAppDispatch();
    const { giveNumbers } = useAppSelector(giveNumberSelector);
    useEffect(() => {
        dispatch(getAll())
    }, [])
    return (
        <List
            itemLayout='horizontal'
            style={{
                display: show ? 'block' : 'none',
                width: 360,
                height: 526,
                position: 'fixed',
                top: 69,
                right: 30,
                backgroundColor: '#fff',
                borderRadius: 10,
                boxShadow: '2px 2px 15px rgba(70, 64, 67, 0.1)',
                overflowY: 'scroll',
                overflowX: 'hidden'
            }}
            header={
                <Title
                    level={4}
                    style={{
                        marginTop: 2,
                        marginLeft: 10,
                        color: '#fff',
                        width: 380
                    }}
                >
                    Thông báo
                </Title>
            }
            dataSource={giveNumbers}
            renderItem={(item) => (
                <List.Item
                    style={{
                        marginTop: 16,
                        marginLeft: 24,
                        padding: '15px 10px 30px 0px',
                        overflow: 'hidden'
                    }}
                >
                    <List.Item.Meta
                        title={
                            <Text
                                style={{
                                    fontSize: "16px",
                                    color: "#BF5805",
                                    marginTop: -20
                                }}
                            >
                                Người dùng: {item.name}
                            </Text>
                        }
                        description={
                            <Text
                                style={{
                                    fontSize: "16px",
                                    color: "#535261",
                                    fontWeight: 400,
                                }}
                            >
                                Thời gian nhận số: {moment(item.timeGet.toDate()).format('HH:mm DD/MM/YYYY')}
                            </Text>
                        }
                    />
                </List.Item>
            )}
        />
    )
}

export default Notification