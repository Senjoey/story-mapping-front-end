import React, { Component } from 'react';
import {Card, Col} from 'antd';
import styles from './StoryCard.less';
export default class StoryCard extends Component {
    render() {
        let cardType = this.props.name;
        return(
            <Col>
                <Card
                    bordered={false}
                    hoverable={true}
                    className={`${styles[cardType]} ${styles.cardItem}`}>
                    <p>{this.props.content}</p>
                </Card>
            </Col>
        );
    }
}