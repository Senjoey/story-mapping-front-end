export default {
    plugins: [
        ['umi-plugin-react', {
            antd: true
        }],
    ],
    routes: [{
        path: "/",
        component: "./register/RegistrationForm",
    },{
        path: "/hello",
        component: "./hello"
    }],
};