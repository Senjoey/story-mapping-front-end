import React, { Component } from 'react';
import { Card, List, Button, Icon, Menu, Dropdown} from 'antd';
import styles from './storyMappingOverview.less';
import {translateTimestampToTime} from '../../util/DateUtil'

export default class StoryMappingOverviewPage extends Component {
    constructor() {
        super();
        this.state = {
            createMapList: [
                {
                    id: '1',
                    title: 'StoryMappingTool',
                    createTime: '1'
                },
                {
                    id: '2',
                    title: '大学生出游协同工具',
                    createTime: '1'
                },
                {
                    id: '3',
                    title: '大学生出游协同工具',
                    createTime: '1'
                },
                {
                    id: '4',
                    title: '大学生出游协同工具',
                    createTime: '1'
                }
            ]
        }
    }

    componentWillMount () {
        this._getMapList();
    }
    _getMapList = ()=> {
        let createMapList = [];
        let memberMapList = [];
        fetch('http://172.19.240.8:8080/map', {
                    method: 'GET',
                    mode: "cors",
                    headers: new Headers({
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }),
                }).then((res)=>{
                    return res.json()
                }).then((res)=>{
                    console.log(res);
                    createMapList = res.content.createMapList.map(item =>{
                        return {
                            title: item.title,
                            createTime: translateTimestampToTime(new Date(item.createTime))
                        }
                    });
                    memberMapList = res.content.memberMapList;
                    this.setState({createMapList: createMapList, memberMapList: memberMapList})
                }).catch((err)=>{
                    console.log('error: ', err)
                });
    };

    render() {
        const menu = (
            <Menu className={styles.menu}>
                <Menu.Item><Icon type="edit" />修改</Menu.Item>
                <Menu.Item><Icon type="minus" />删除</Menu.Item>
            </Menu>
        );
        const dropdownGroup = (
            <span className={styles.iconGroup}>
                <Dropdown overlay={menu} placement="bottomRight">
                    <Icon type="ellipsis" />
                </Dropdown>
            </span>
        );
        return(
            <div style={{maxWidth: "1200px", margin:"0 auto"}}>
                <div className={styles.cardList}>
                    <List
                        rowKey="id"
                        grid={{ gutter: 24, column: 3, lg: 3, md: 2, sm: 1, xs: 1 }}
                        dataSource={['', ...this.state.createMapList]}
                        renderItem={item =>
                            item ? (
                                <List.Item>
                                    <Card
                                        hoverable
                                        title={item.title}
                                        extra={dropdownGroup}
                                    >
                                        <p>创建时间：</p>
                                        <p>{item.createTime}</p>
                                    </Card>
                                </List.Item>
                            ) : (
                                <List.Item>
                                    <Button type="dashed" className={styles.newButton}>
                                        <Icon type="plus" /> 新增故事地图
                                    </Button>
                                </List.Item>
                            )
                        }
                    />
                </div>
            </div>
        );
    }
}