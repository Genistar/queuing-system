import React, { useState } from 'react';
import LayoutPage from '../../layout/LayoutPage';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from '../../features/Auth/Login/index';
import NotFound from '../../pages/NotFound';
import 'antd/dist/antd.css'
import '../../App.css';
import '../../App.less'
import { Provider } from 'react-redux';
import store from '../../store';
import HomePage from '../../pages/HomePage';
import "@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css";


const App = () => {

    return (
        <Router>
            <Provider store={store}>
                <Routes>
                    <Route path='/admin' element={<HomePage />} />
                    <Route path='/auth/*' element={<LoginPage />} />
                    <Route path='/admin/*' element={<LayoutPage />} />

                </Routes>
            </Provider>
        </Router>
    );
}

export default App;