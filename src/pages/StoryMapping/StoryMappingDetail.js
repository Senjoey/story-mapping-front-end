import React, { Component } from 'react';
import {serverIP} from '../../util/GlobalConstants';
import styles from './StoryMappingDetail.less';
import Activity from "./Activity";
import Task from "./Task";
import UserStory from "./UserStory";

export default class StoryMappingDetailInfo extends Component{
    constructor() {
        super();
        this.state = {
            mapTitle: '用户故事标题',
            activityList: [
                {
                    id: 6,
                    title: 'activity1',
                    content: 'activity1 content',
                    creatorId: 9,
                    createTime: 1547397207000,
                    mapId: 9
            }
            ],
            taskList: [
                {
                    id: 2,
                    title: 'ctivity1',
                    content: 'activity1 content',
                    creatorId: 9,
                    createTime: 1547399500000,
                    mapId: 9,
                    activityId: 6
                }
            ],
            storyList:[
                {
                    id: 25,
                    title: 'story1',
                    content: 'story1 content',
                    creatorId: 9,
                    createTime: 1547426444000,
                    mapId: 9,
                    taskId: 2,
                    sprint: 1
                }
            ],
        }
    }

    componentWillMount () {
        this._getMapOverviewInfo(localStorage.getItem('mapID'));
    }

    _getMapOverviewInfo(mapID) {
        fetch(`${serverIP}/map/${mapID}`, {
            method: 'GET',
            mode: "cors",
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }),
        }).then((res)=>{
            return res.json()
        }).then((res)=>{
            console.log(res);
            this.setState({mapTitle: res.content.title})
        }).catch((err)=>{
            console.log('error: ', err)
        });
    }

    render() {
        return(
            <div className={styles.wrapper}>
                <h1>{this.state.mapTitle}</h1>
                <div style={{display: "flex"}}>
                    {/* 其中一个Activity的全部内容 */}
                    <div className={styles.poolOne}>
                        <div className={styles.activityAndTaskWrapper}>
                            {/* Activity */}
                            <Activity data={this.state.activityList}/>
                            {/* Task */}
                            <Task data={this.state.taskList}/>
                        </div>
                        <div className={styles.divider}></div>
                        {/* User Story */}
                        <div className={styles.userStoryWrapper}>
                            {/* 对应第一个task */}
                            <UserStory data={this.state.storyList}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}