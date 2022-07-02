import { Col, Image, Layout, Row } from 'antd'
import React from 'react'
import { Switch, Route } from 'react-router-dom'
import ForgetPassword from '../../components/Login/ForgetPassword'
import LoginForm from '../../components/Login/LoginForm'
import ResetPassword from '../../components/Login/ResetPassword'
var logo = require('../../assets/Logo-removebg-preview.png')

const { Sider, Header, Content, Footer } = Layout
const LoginPage: React.FC = (): JSX.Element => {
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
                        style={{ marginLeft: '1%', minWidth: '400px' }}
                    >
                        <Route path='/login' exact>
                            <LoginForm />
                        </Route>
                        <Route path="/login/forgetpassword">
                            <ForgetPassword />
                        </Route>
                        <Route path="/login/renewpassword">
                            <ResetPassword />
                        </Route>
                    </Content>
                    <Footer style={{ backgroundColor: '#F7F7F7' }}>Footer</Footer>
                </Layout>
            </Col>
            <Col span={14}>image</Col>
        </Row>
    )
}

export default LoginPage