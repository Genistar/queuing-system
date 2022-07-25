import { Col, Image, Layout, Row } from 'antd'
import React, { CSSProperties } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import ForgetPassword from './components/ForgetPassword'
import LoginForm from './components/LoginForm'
import ResetPassword from './components/ResetPassword';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../../config/firebase'

var logo = require('../../../assets/Logo-removebg-preview.png');
var login = require('../../../assets/login.png');
var login2 = require('../../../assets/login2.png');

const { Sider, Header, Content, Footer } = Layout
interface Props {
}
const LoginPage: React.FC<Props> = (props: Props): JSX.Element => {
    let navigate = useNavigate();
    const style: CSSProperties = {
        width: 680, height: 614.0, position: 'absolute', top: 55, left: 80
    }
    return (
        <Row>
            <Col span={10}>
                <Layout style={{ minHeight: '100vh', backgroundColor: '#F7F7F7' }} >
                    <Header style={{ backgroundColor: '#F7F7F7', minHeight: '30vh' }}>
                        <Image
                            style={{
                                margin: '2% 0 0 14%'
                            }}
                            width={400}
                            src={logo}
                            preview={false}
                        />
                    </Header>
                    <Content
                        style={{ marginLeft: '1%', minWidth: '400   px' }}
                    >
                        <Routes>
                            <Route path='/login' element={<LoginForm />} />
                            <Route path="/forgetpassword" element={<ForgetPassword />} />
                            <Route path="/renewpassword" element={<ResetPassword />} />
                        </Routes>

                    </Content>
                    <Footer style={{ backgroundColor: '#F7F7F7' }}></Footer>
                </Layout>
            </Col>
            <Col span={14}>
                <Routes>
                    <Route path='/login' element={<Image style={style} src={login} />} />
                    <Route path="/forgetpassword" element={<Image style={style} src={login2} />} />
                    <Route path="/renewpassword" element={<Image style={style} src={login2} />} />
                </Routes>
            </Col>
        </Row>
    )
}

export default LoginPage