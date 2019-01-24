import * as friendNotificationService from '../services/friendNotification';

export default {
    namespace: 'friendNotification',

    state: {
        notification: [],
        readNotification: [],
        unreadNotification: []
    },

    effects: {
        *queryList({ _ }, { call, put }) {
            const rsp = yield call(friendNotificationService.queryList);
            let notification = rsp.content.friendNotificationVOList;
            // let notification = [
            //     {
            //         invitationId: 1,
            //         senderEmail: '1289934458@qq.com',
            //         senderName: 'Tan',
            //         status: 1,
            //     },
            //     {
            //         invitationId: 2,
            //         senderEmail: 'mf1832103@smail.nju.edu.cn',
            //         senderName: 'LiuXing',
            //         status: 2
            //     },
            //     {
            //         invitationId: 3,
            //         senderEmail: '1289934458@qq.com',
            //         senderName: 'Tan',
            //         status: 0
            //     },
            //     {
            //         invitationId: 4,
            //         senderEmail: 'mf1832103@smail.nju.edu.cn',
            //         senderName: 'LiuXing',
            //         status: 0
            //     }
            // ];
            let readNotification = notification.filter(item => item.status > 0);
            let unreadNotification = notification.filter(item => item.status === 0);
            yield put(
                {
                    type: 'saveList',
                    payload: {
                        notification: notification,
                        readNotification: readNotification,
                        unreadNotification: unreadNotification
                    }
                }
            );
        },
        *replyInvitation({ payload }, { call, put }) {
            const rsp = yield call(friendNotificationService.replyInvitation, payload);
            return rsp;
        },
    },

    reducers: {
        saveList(state, { payload: { notification, readNotification, unreadNotification} }) {
            return {
                ...state,
                notification,
                readNotification,
                unreadNotification
            }
        },
    }
}