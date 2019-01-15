import React, { Component } from 'react';
import {Card, Col} from 'antd';
import styles from './StoryCard.less';
import IconFont from '../../util/IconFont';
import {myRemove} from "../../util/ArrayUtil";

export default class StoryCard extends Component {
    constructor() {
        super();
        this.state = {
            storyList: [],
            deleteStoryId: -1
        }
    }
    handleDeleteStory(storyId) {
        myRemove(a, 1);

    }
    render() {
        this.state.storyList = this.props.storyList;
        this.state.deleteStoryId = this.props.storyId;
        let cardType = this.props.name;
        return(
            <Col>
                <Card
                    bordered={false}
                    hoverable={true}
                    className={`${styles[cardType]} ${styles.cardItem} ${styles["override-ant-card"]}`}
                >
                    <p>{this.props.content}</p>
                    <IconFont type="icon-delete" className={styles.deleteIcon} onClick={this.handleDeleteStory.bind(this, this.state.deleteStoryId)}/>
                </Card>
            </Col>
        );
    }
}