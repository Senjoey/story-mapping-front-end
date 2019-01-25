import * as storyMapListService from '../services/storyMapList';
import {translateTimestampToTime} from "../util/DateUtil";

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
                    id: item.id
                }
            });
            let memberMapList = rsp.content.memberMapList.map(item => {
                return {
                    title: item.title,
                    createTime: translateTimestampToTime(new Date(parseInt(item.createTime) - 1000 * 60 * 60*14)),
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
    },

    reducers: {
        saveList(state, { payload: { createMapList, memberMapList } }) {
            return {
                ...state,
                createMapList,
                memberMapList,
            }
        },
    }

}