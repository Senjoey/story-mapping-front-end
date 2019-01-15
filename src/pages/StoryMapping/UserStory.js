import React, { Component } from 'react';
import StoryCard from './StoryCard';
import styles from './StoryMappingDetail.less';
export default class UserStory extends Component {
    render() {
        let storyList = this.props.data;
        return(
            <div className={styles.storyWrapper}>
                {
                    storyList.map(story => {
                        return(
                            <StoryCard key={story.id} name="story" content={story.content}>
                            </StoryCard>
                        );
                    })
                }
            </div>
        );
    }
}