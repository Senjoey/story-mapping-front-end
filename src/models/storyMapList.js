import * as storyMapListService from '../services/storyMapList';
import {translateTimestampToTime} from "../util/DateUtil";
import * as friendsService from "../services/friendsList";

export default {
    namespace: 'storyMapList',

    state: {
        createMapList: [],
        memberMapList: []
    },

    effects: {
        *queryList({ _ }, { call, put }) {
            const rsp = yield call(storyMapListService.queryList);
            let createMapList = rsp.content.createMapList.map(item =>{
                return {
                    title: item.title,
                    createTime: translateTimestampToTime(new Date(parseInt(item.createTime) - 1000 * 60 * 60*14)),
                    // createTime: item.createTime,
                    id: item.id
                }
            });
            let memberMapList = rsp.content.memberMapList.map(item => {
                return {
                    title: item.title,
                    createTime: translateTimestampToTime(new Date(parseInt(item.createTime) - 1000 * 60 * 60*14)),
                    // createTime: item.createTime,
                    id: item.id
                }
            });
            yield put({ type: 'saveList',
                payload: {
                    createMapList: createMapList,
                    memberMapList: memberMapList,
            }
            });
        },
        *addOne({ payload }, { call, put }) {
            const rsp = yield call(storyMapListService.addOne, payload);
            return rsp;
        },
        *deleteOne({ payload }, { call, put }) {
            const rsp = yield call(storyMapListService.deleteOne, payload);
            return rsp;
        },
        *queryOne({ payload }, { call, put }) {
            const rsp = yield call(storyMapListService.queryOne, payload);
            return rsp;
        },
        *updateTitle({ payload }, { call, put }) {
            const rsp = yield call(storyMapListService.updateTitle, payload);
            return rsp;
        },
        *queryCollaboratorList( {payload} , { call, put }) {
            const rsp = yield call(storyMapListService.queryCollaboratorList, payload);
            yield put({ type: 'saveCollaboratorList', payload: { collaborators: rsp.content }});
        },
        *deleteCollaborator({ payload }, { call, put }) {
            const rsp = yield call(storyMapListService.deleteCollaborator, payload);
            return rsp;
        },
        *addCollaborators({ payload }, { call, put }) {
            const rsp = yield call(storyMapListService.addCollaborators, payload);
            return rsp;
        },
    },

    reducers: {
        saveList(state, { payload: { createMapList, memberMapList } }) {
            return {
                ...state,
                createMapList,
                memberMapList,
            }
        },
        saveCollaboratorList(state, { payload: { collaborators } }) {
            return {
                ...state,
                collaborators,
            }
        },
    }

}