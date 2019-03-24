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
            // isExact: true,
            routes: [
                {path: '/dashboard/storymapiingdetail/:mapID', component: 'StoryMapping/StoryMappingDetail'},
                {
                    path: '/dashboard/storymapiinginfoedit/:mapID',
                    component: 'StoryMapping/StoryMappingInfoEdit/StoryMappingInfoEdit',
                    routes: [
                        {path: '/dashboard/storymapiinginfoedit/:mapID/info', component: 'StoryMapping/StoryMappingInfoEdit/MapInfo'},
                        {path: '/dashboard/storymapiinginfoedit/:mapID/collaborator', component: 'StoryMapping/StoryMappingInfoEdit/MapCollaborator'},
                    ]
                },
                {path: '/dashboard/storymapping', component: 'StoryMapping/StoryMappingOverview'},
                {path: '/dashboard/friends', component: 'Friends/FriendsList'},
                {
                    path: '/dashboard/notification/',
                    component: 'Notification/Notification',
                    routes: [
                        {path: '/dashboard/notification/friends', component: 'Notification/FriendNotification'},
                        {path: '/dashboard/notification/maps', component: 'Notification/MapNotification'}
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