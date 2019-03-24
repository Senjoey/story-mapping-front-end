import * as friendNotificationService from '../services/friendNotification';
import {translateTimestampToTime} from "../util/DateUtil";

export default {
    namespace: 'friendNotification',

    state: {
        notification: [],
        readNotification: [],
        unreadNotification: [],
        mapNotification: []
    },

    effects: {
        *queryList({ _ }, { call, put }) {
            const rsp = yield call(friendNotificationService.queryList);
            let notification = rsp.content.friendNotificationVOList;
            let readNotification = notification.filter(item => item.status > 0);
            let unreadNotification = notification.filter(item => item.status === 0);
            let mapNotification = rsp.content.mapNotificationVOList.map(item => {
                return {
                    title: item.title,
                    operationTIme: translateTimestampToTime(new Date(parseInt(item.operationTIme) - 1000 * 60 * 60*14)),
                    // createTime: item.createTime,
                    status: item.status,
                    name: item.name,

                }
            });
            yield put(
                {
                    type: 'saveList',
                    payload: {
                        notification: notification,
                        readNotification: readNotification,
                        unreadNotification: unreadNotification,
                        mapNotification: mapNotification
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
        saveList(state, { payload: { notification, readNotification, unreadNotification, mapNotification} }) {
            return {
                ...state,
                notification,
                readNotification,
                unreadNotification,
                mapNotification
            }
        },
    }
}