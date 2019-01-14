import React, { Component } from 'react';
import StoryCard from './StoryCard';
import styles from './StoryMappingDetail.less';
export default class UserStory extends Component {
    render() {
        let storyList = this.props.data;
        return(
            <div className={styles.userStory}>
                {
                    storyList.map(card => {
                        return(
                            <StoryCard key={card.id} name="story" content={card.content}>
                            </StoryCard>
                        );
                    })
                }
            </div>
        );
    }
}