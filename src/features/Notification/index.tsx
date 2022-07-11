import { List, Typography } from 'antd'
import React from 'react'
const { Title, Text } = Typography;
interface Props {
    show: boolean,
    data: {
        name: string;
        time: string;
    }[]
}

const Notification: React.FC<Props> = (props: Props) => {
    const { show, data } = props
    return (
        <List
            itemLayout='horizontal'
            style={{
                display: show ? 'block' : 'none',
                width: 360,
                height: 526,
                zIndex: 1,
                position: 'fixed',
                top: 69,
                right: 30,
                backgroundColor: '#fff',
                borderRadius: 10,
                boxShadow: '2px 2px 15px rgba(70, 64, 67, 0.1)'
            }}
            header={
                <Title
                    level={4}
                    style={{
                        marginTop: 2,
                        marginLeft: 10,
                        color: '#fff'
                    }}
                >
                    Thông báo
                </Title>
            }
            dataSource={data}
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
                                Thời gian nhận số: {item.time}
                            </Text>
                        }
                    />
                </List.Item>
            )}
        />
    )
}

export default Notification