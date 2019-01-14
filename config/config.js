export default {
    plugins: [
        ['umi-plugin-react', {
            antd: true,
            dva: true,
        }],
    ],
    routes: [
        //App
        {
            path: '/dashboard',
            component: 'Dashboard/BasicLayout',
            routes: [
                {path: '/dashboard', component: 'Dashboard/Analysis'},
                {path: '/dashboard/storymapiingdetail', component: 'StoryMapping/StoryMappingDetail'},
                {path: '/dashboard/storymapping', component: 'StoryMapping/StoryMappingOverview'},
                {path: '/dashboard/test', component: 'StoryMapping/StoryMappingDetail'}
            ]
        },
        // User
        {
            path: '/',
            component: 'User/UserLayout',
            routes: [
                { path: '/', component: 'User/Register/RegistrationForm'},
                { path: '/user/login', component: 'User/Login/LoginForm'}
        ]},

    ],
};