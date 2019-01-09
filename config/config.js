export default {
    plugins: [
        ['umi-plugin-react', {
            antd: true
        }],
    ],
    routes: [{
        path: '/',
        component: 'User/BasicLayout',
        routes: [{
            path: '/',
            component: 'User/Register/RegistrationForm'
        },{
            path: '/user/login',
            component: 'User/Login/LoginForm'
        }]
    }],
};