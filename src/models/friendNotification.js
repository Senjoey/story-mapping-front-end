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