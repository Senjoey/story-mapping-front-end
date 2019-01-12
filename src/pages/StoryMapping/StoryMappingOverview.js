import React, { Component } from 'react';
import { Card, Col, Row } from 'antd';
import styles from './storyMappingOverview.less';

export default class StoryMappingOverviewPage extends Component {
    constructor() {
        super();
        this.state = {
            cardList: [
                {
                    id: '1',
                    title: 'StoryMappingTool',
                },
                {
                    id: '2',
                    title: '大学生出游协同工具',
                },
                {
                    id: '3',
                    title: '大学生出游协同工具',
                },
                {
                    id: '4',
                    title: '大学生出游协同工具',
                }
            ]
        }
    }
    render() {
        return(
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                {
                this.state.cardList.map(card => {
                    return (
                        <Col span={8} className={styles["override-ant-col-8"]}>
                            <Card
                                key={card.id}
                                title={card.title}
                                extra={<a href="#">More</a>}
                            >
                                <div>Content</div>
                            </Card>
                        </Col>
                    );
                })
                }
            </Row>
        );
    }
}