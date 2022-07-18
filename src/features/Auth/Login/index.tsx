import { Col, Image, Layout, Row } from 'antd'
import React from 'react'
import { Route, useHistory } from 'react-router-dom'
import ForgetPassword from './components/ForgetPassword'
import LoginForm from './components/LoginForm'
import ResetPassword from './components/ResetPassword';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../../config/firebase'
var logo = require('../../../assets/Logo-removebg-preview.png')

const { Sider, Header, Content, Footer } = Layout
interface Props {
}
const LoginPage: React.FC<Props> = (props: Props): JSX.Element => {
    let history = useHistory()
    const forgotPassword = (user: string) => {
        history.push('/login/renewpassword');
        console.log(user)
        return sendPasswordResetEmail(auth, user)
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
                        style={{ marginLeft: '1%', minWidth: '400px' }}
                    >
                        <Route path='/login' exact={true}>
                            <LoginForm />
                        </Route>
                        <Route path="/login/forgetpassword">
                            <ForgetPassword forgotPassword={forgotPassword} />
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