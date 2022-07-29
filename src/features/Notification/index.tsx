import { Card, List, Typography } from 'antd'
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
        <div
            style={{
                display: show ? 'block' : 'none',
            }}
        >
            <Card
                style={{
                    marginTop: 35,
                    position: 'fixed',
                    width: 360,
                    height: 70,
                    backgroundColor: '#ff7506',
                    marginLeft: -196,
                }}>
                <Title
                    level={4}
                    style={{
                        marginTop: -10,
                        marginLeft: 10,
                        color: '#fff',

                    }}
                >
                    Thông báo
                </Title>
            </Card>
            <List
                itemLayout='horizontal'
                style={{

                    width: 360,
                    height: 466,
                    position: 'fixed',
                    top: 114,
                    right: 80,
                    backgroundColor: '#fff',
                    borderRadius: 10,
                    borderTopLeftRadius: 0,
                    borderTopRightRadius: 0,
                    boxShadow: '2px 2px 15px rgba(70, 64, 67, 0.1)',
                    overflowY: 'scroll',
                    overflowX: 'hidden'
                }}
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
        </div>

    )
}

export default Notification