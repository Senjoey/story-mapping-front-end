import React, { Component } from 'react';
import StoryCard from './StoryCard';
import styles from './StoryMappingDetail.less';
import UserStory from "./UserStory";
import TaskCard from "./TaskCard";

export default class Task extends Component {
    handleTaskDelete(taskId){
        this.props.handleTaskDelete(taskId);
    }
    render() {
        let task = this.props.data;
        let storyList = task.storyList;
        return(
            <div className={styles.taskWrapper}>
                <TaskCard name="task" content={task.task.title} handleTaskDelete={this.handleTaskDelete.bind(this)}/>
                <UserStory data={storyList} task={task.task.id}/>
            </div>
        );
    }
}
