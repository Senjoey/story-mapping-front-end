import React, { Component } from 'react';
import StoryCard from './StoryCard';
import styles from './StoryMappingDetail.less';
import UserStory from "./UserStory";
export default class Task extends Component {
    render() {
        let task = this.props.data;
        let storyList = task.storyList;
        return(
            <div className={styles.taskWrapper}>
                <StoryCard key={task.id} name="task" content={task.content} />
                <UserStory data={storyList}/>
            </div>
        );
    }
}