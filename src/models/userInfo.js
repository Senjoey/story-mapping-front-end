import * as userInfoService from '../services/userInfo';
import * as friendsService from "../services/friendsList";

export default {
    namespace: 'userInfo',

    state: {
        userInfo: {},
    },

    effects: {
        *queryUserInfo({ _ }, { call, put }) {
            const rsp = yield call(userInfoService.queryUserInfo);
            console.log('rsp.content: ', rsp.content);
            yield put({ type: 'saveUserInfo', payload: { userInfo: rsp.content }});
        },
        *updateInfo({ payload }, { call, put }) {
            const rsp = yield call(userInfoService.updateInfo, payload);
            return rsp;
        },
        *updatePassword({ payload }, { call, put }) {
            const rsp = yield call(userInfoService.updatePassword, payload);
            return rsp;
        },

    },

    reducers: {
        saveUserInfo(state, { payload: { userInfo } }) {
            return {
                ...state,
                userInfo,
            }
        },
    }

}