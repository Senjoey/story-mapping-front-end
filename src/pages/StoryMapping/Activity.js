import React, { Component } from 'react';
import StoryCard from './StoryCard';
import styles from './StoryMappingDetail.less';
import Task from "./Task";
export default class Activity extends Component {
    render() {
        let activity = this.props.data;
        let taskList = activity.taskList;
        return(
            <div className={styles.activityWrapper}>
                <StoryCard key={activity.id} name="activity" content={activity.content}/>
                <div style={{display: 'flex'}}>
                   {
                    taskList.map(task => {
                        return(
                            <Task data={task}/>
                        );
                    })
                    }
                </div>

            </div>
        );
    }
}