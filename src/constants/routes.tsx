import React from 'react';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
interface IRoute {
    path: string,
    exact: boolean,
    main: any
}
export const routes: IRoute[] = [
    {
        path: '/',
        exact: true,
        main: () => <HomePage />
    },
    {
        path: '/LoginPage',
        exact: false,
        main: () => <LoginPage />
    }
]
