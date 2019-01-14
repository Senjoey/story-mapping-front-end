import React, { Component } from 'react';
import StoryCard from './StoryCard';
import styles from './StoryMappingDetail.less';
export default class Activity extends Component {
    render() {
        let activityList = this.props.data;
        return(
            <div className={styles.activity}>
                {/*<StoryCard name="activity"/>*/}
                {
                    activityList.map(card => {
                        return(
                            <StoryCard key={card.id} name="activity" content={card.content}>
                            </StoryCard>
                        );
                    })
                }
            </div>
        );
    }
}