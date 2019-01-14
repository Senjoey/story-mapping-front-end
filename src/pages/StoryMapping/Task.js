import React, { Component } from 'react';
import StoryCard from './StoryCard';
import styles from './StoryMappingDetail.less';
export default class Task extends Component {
    render() {
        let taskList = this.props.data;
        return(
            <div className={styles.task}>
                {
                    taskList.map(card => {
                        return(
                            <StoryCard key={card.id} name="task" content={card.content}>
                            </StoryCard>
                        );
                    })
                }
            </div>
        );
    }
}