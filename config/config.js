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
                {path: '/dashboard/storymapiingdetail', component: 'StoryMapping/StoryMappingDetail'},
                {path: '/dashboard/storymapping', component: 'StoryMapping/StoryMappingOverview'},
                {path: '/dashboard/friends', component: 'Friends/FriendsList'},
                {
                    path: '/dashboard/notification',
                    component: 'Notification/Notification',
                    routes: [
                        {path: '/dashboard/notification/friends', component: 'Notification/FriendNotification'}
                    ]

                },
                {
                    path: '/dashboard/personinfo',
                    component: 'PersonInfo/PersonInfo',
                    routes: [
                        {path: '/dashboard/personinfo/nickname', component: 'PersonInfo/Nickname'},
                        {path: '/dashboard/personinfo/password', component: 'PersonInfo/Password'},
                    ]

                },
            ]
        },
        // User
        {
            path: '/',
            component: 'User/MyUserLayout',
            routes: [
                { path: '/', component: 'User/Login/MyLoginForm'},
                { path: '/user/login', component: 'User/Login/MyLoginForm'},
                { path: '/user/register', component: 'User/Register/MyRegistrationForm'},
        ]},

    ],
};