import * as friendsService from '../services/friendsList';

export default {
    namespace: 'friendsList',

    state: {
        friends: []
    },

    effects: {
        *queryList({ _ }, { call, put }) {
            const rsp = yield call(friendsService.queryList);
            console.log('rsp.content: ', rsp.content);
            yield put({ type: 'saveList', payload: { friends: rsp.content } });
        },
        *deleteOne({ payload }, { call, put }) {
            const rsp = yield call(friendsService.deleteOne, payload);
            return rsp;
        },
    },

    reducers: {
        saveList(state, { payload: { friends } }) {
            return {
                ...state,
                friends,
            }
        },
    }
};