export default {
    plugins: [
        ['umi-plugin-react', {
            antd: true,
            dva: true,
        }],
    ],
    routes: [
        //Test
        {
            path: 'test',
            component: 'StoryMapping/AddCard'
        },
        //App
        {
            path: '/dashboard',
            component: 'Dashboard/BasicLayout',
            routes: [
                {path: '/dashboard', component: 'Dashboard/Analysis'},
                {path: '/dashboard/storymapiingdetail', component: 'StoryMapping/StoryMappingDetail'},
                {path: '/dashboard/storymapping', component: 'StoryMapping/StoryMappingOverview'},
                {path: '/dashboard/friends', component: 'Friends/FriendsList'},
                {path: '/dashboard/test', component: 'StoryMapping/StoryMappingDetail'}
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