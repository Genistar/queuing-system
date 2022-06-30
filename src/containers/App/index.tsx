import React from 'react';
import LayoutPage from '../../layout/LayoutPage';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoginPage from '../../pages/LoginPage/index';
import NotFound from '../../pages/NotFound';
import ForgetPassword from '../../components/ForgetPassword';
import '../../App.css';
import 'antd/dist/antd.css'

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/sdas'>
                    <NotFound />
                </Route>
                <Route path="/login" >
                    <LoginPage />
                </Route>
                <Route path="/forgetpassword">
                    <ForgetPassword />
                </Route>

                <LayoutPage />
            </Switch>
        </BrowserRouter>
    );
}

export default App;