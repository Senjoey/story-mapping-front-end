import React, { Component } from 'react';
import { Card, List, Button, Icon, Menu, Dropdown, Modal} from 'antd';
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
                    createTime: 'null'
                },
            ],
            ModalText: 'Content of the modal',
            visible: false,
            confirmLoading: false,
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
    showModal() {
        this.setState({
            visible: true,
        });
    }
    handleOk(){
        let createMapList = this.state.createMapList;
        this.setState({
            ModalText: '正在添加用户故事地图...',
            confirmLoading: true,
        });
        fetch('http://172.19.240.8:8080/map', {
            method: 'POST',
            mode: "cors",
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }),
            //TODO title获取用户输入
            body: JSON.stringify({'title': '用户故事地图1'})
        }).then((res)=>{
            return res.json()
        }).then((res)=>{
            console.log(res);
            createMapList.push({
                title: res.content.title,
                createTime: translateTimestampToTime(res.content.createTime)
            });
            this.setState({
                createMapList: createMapList,
                visible: false,
                confirmLoading: false,
            })
        }).catch((err)=>{
            console.log('error: ', err)
        });
    }
    handleCancel() {
        this.setState({
            visible: false,
        });
    }
    handleMapDelete() {
        //TODO 获取当前的mapID
        fetch('http://172.19.240.8:8080/map?mapId=14', {
            method: 'DELETE',
            mode: "cors",
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }),
        }).then((res)=>{
            return res.json()
        }).then((res)=>{
            console.log(res);
            if(res.success) {
                this._getMapList();
            }
        }).catch((err)=>{
            console.log('error: ', err)
        });
    }
    render() {
        const menu = (
            <Menu className={styles.menu}>
                <Menu.Item ><Icon type="edit" />修改</Menu.Item>
                <Menu.Item onClick={this.handleMapDelete.bind(this)}><Icon type="minus" />删除</Menu.Item>
            </Menu>
        );
        const dropdownGroup = (
            <span className={styles.iconGroup}>
                <Dropdown overlay={menu} placement="bottomRight">
                    <Icon type="ellipsis" />
                </Dropdown>
            </span>
        );
        const { visible, confirmLoading, ModalText } = this.state;
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
                                    <Button type="dashed" className={styles.newButton} onClick={this.showModal.bind(this)}>
                                        <Icon type="plus" /> 新增故事地图
                                    </Button>
                                    <Modal
                                        title="Title"
                                        visible={visible}
                                        onOk={this.handleOk.bind(this)}
                                        confirmLoading={confirmLoading}
                                        onCancel={this.handleCancel.bind(this)}
                                    >
                                        <p>{ModalText}</p>
                                    </Modal>
                                </List.Item>
                            )
                        }
                    />
                </div>
            </div>
        );
    }
}