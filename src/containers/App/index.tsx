import React from 'react';
import LayoutPage from '../../layout/LayoutPage';
import { BrowserRouter as Routes, Route, Switch } from "react-router-dom";
import LoginPage from '../../pages/LoginPage/index';
import NotFound from '../../pages/NotFound';
import ForgetPassword from '../../features/Login/components/ForgetPassword';
import '../../App.css';
import '../../App.less'

const App = () => {
    return (
        <Routes>
            <Switch>
                <Route path='/sdas' exact={true}>
                    <NotFound />
                </Route>
                <Route path='/login' component={LoginPage} />
                <Route path="/forgetpassword">
                    <ForgetPassword />
                </Route>
                <LayoutPage />
            </Switch>
        </Routes>
    );
}

export default App;