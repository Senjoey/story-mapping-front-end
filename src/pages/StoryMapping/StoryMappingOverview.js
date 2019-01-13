import React, { Component } from 'react';
import { Card, List, Button, Icon, Menu, Dropdown, Modal, message, Form, Input} from 'antd';
import styles from './storyMappingOverview.less';
import {translateTimestampToTime} from '../../util/DateUtil'

class StoryMappingOverviewPage extends Component {
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
                            createTime: translateTimestampToTime(new Date(item.createTime)),
                            id: item.id
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
            confirmLoading: true,
        });
        this.props.form.validateFields((err, values) => {
            if(!err) {
                console.log('Received values of form: ', values);
                fetch('http://172.19.240.8:8080/map', {
                    method: 'POST',
                    mode: "cors",
                    headers: new Headers({
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }),
                    body: JSON.stringify(values)
                }).then((res)=>{
                    return res.json()
                }).then((res)=>{
                    console.log(res);
                    createMapList.push({
                        title: res.content.title,
                        createTime: translateTimestampToTime(res.content.createTime),
                        id: res.content.id
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
        });

    }
    handleCancel() {
        this.setState({
            visible: false,
        });
    }
    handleMapDelete(mapID) {
        fetch(`http://172.19.240.8:8080/map?mapId=${mapID}`, {
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
    handleMapEdit(mapID) {
        //TODO 获取当前的mapID
        message.success(`当前ID: ${mapID}`);
    }
    render() {
        // const menu = (
        //     <Menu className={styles.menu}>
        //         <Menu.Item onClick={()=>console.log()}><Icon type="edit" />修改</Menu.Item>
        //         <Menu.Item onClick={this.handleMapDelete.bind(this)}><Icon type="minus" />删除</Menu.Item>
        //     </Menu>
        // );
        // const dropdownGroup = (
        //     <span className={styles.iconGroup}>
        //         <Dropdown overlay={menu} placement="bottomRight">
        //             <Icon type="ellipsis" />
        //         </Dropdown>
        //     </span>
        // );
        const { visible, confirmLoading} = this.state;
        const { getFieldDecorator } = this.props.form;
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
                                        // extra={dropdownGroup}
                                        extra={
                                            <span className={styles.iconGroup}>
                                                <Dropdown placement="bottomRight" overlay={
                                                    <Menu className={styles.menu}>
                                                        <Menu.Item onClick={this.handleMapEdit.bind(this, item.id)}><Icon type="edit" />修改</Menu.Item>
                                                        <Menu.Item onClick={this.handleMapDelete.bind(this, item.id)}><Icon type="minus" />删除</Menu.Item>
                                                    </Menu>
                                                }>
                                                    <Icon type="ellipsis" />
                                                </Dropdown>
                                            </span>
                                        }
                                    >
                                        <p>创建时间: {item.createTime}</p>
                                        <p>ID: {item.id}</p>
                                    </Card>
                                </List.Item>
                            ) : (
                                <List.Item>
                                    <Button type="dashed" className={styles.newButton} onClick={this.showModal.bind(this)}>
                                        <Icon type="plus" /> 新增故事地图
                                    </Button>
                                    <Modal
                                        title="新增故事地图"
                                        visible={visible}
                                        onOk={this.handleOk.bind(this)}
                                        confirmLoading={confirmLoading}
                                        onCancel={this.handleCancel.bind(this)}
                                    >
                                        <Form>
                                            <Form.Item label="标题">
                                                {getFieldDecorator('title', {
                                                    rules: [{ required: true }],
                                                })(
                                                    <Input />
                                                )}
                                            </Form.Item>
                                        </Form>
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
export default Form.create()(StoryMappingOverviewPage);