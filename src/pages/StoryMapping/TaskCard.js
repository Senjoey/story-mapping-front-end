import React, { Component } from 'react';
import {Card, Col} from 'antd';
import styles from './StoryCard.less';
import IconFont from '../../util/IconFont';
export default class TaskCard extends Component {
    handleTaskDelete(taskId){
        this.props.handleTaskDelete(taskId);
    }
    render() {
        let cardType = this.props.name;
        return(
            <Col>
                <Card
                    bordered={false}
                    hoverable={true}
                    className={`${styles[cardType]} ${styles.cardItem} ${styles["override-ant-card"]}`}
                >
                    <p>{this.props.content}</p>
                    <IconFont type="icon-delete" className={styles.deleteIcon} onClick={this.handleTaskDelete.bind(this, 1)}/>
                </Card>
            </Col>
        );
    }
}