import React, { Component } from 'react';
import styles from './StoryMappingDetail.less';
import Task from "./Task";
import {Button, Icon, Modal, Form, Input, message} from 'antd';
import {serverIP} from "../../util/GlobalConstants";
import ActivityCard from "./ActivityCard";
import {myRemoveCard} from "../../util/ArrayUtil";
import {CardType} from "../../util/CardType";

class Activity extends Component {
    constructor() {
        super();
        this.state = {
            taskList : [],
            visible: false,
            confirmLoading: false,
            activityId: -1,
        };
    }
    showModal() {
        this.setState({
            visible: true,
        });
    }
    handleOk(){
        let taskList = this.state.taskList;
        this.setState({
            confirmLoading: true,
        });
        this.props.form.validateFields((err, values) => {
            let bodyPara = {
                title: values.title,
                content: 'task content',
                mapId: localStorage.getItem('mapID'),
                activityId: this.state.activityId,
            };
            if(!err) {
                console.log('Received values of form: ', values);
                fetch(`${serverIP}/task`, {
                    method: 'POST',
                    mode: "cors",
                    headers: new Headers({
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }),
                    body: JSON.stringify(bodyPara)
                }).then((res)=>{
                    return res.json()
                }).then((res)=>{
                    console.log(res);
                    if(res.success) {
                        taskList.push(
                            {
                                task:{
                                    id: res.content.id,
                                    title: res.content.title,
                                    content: res.content.content
                                },
                                storyList: []
                            }
                        );
                        this.setState({
                            taskList: taskList,
                            visible: false,
                            confirmLoading: false,
                        })
                    }
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
    handleTaskDelete(taskId) {
        let taskList = this.state.taskList;
        let canBeDelete = true;
        for (let i = 0; i < taskList.length; i++) {
            let ta = taskList[i];
            if (ta.task.id === taskId) {
                if (ta.storyList.length > 0) {
                    canBeDelete = false;
                    break;
                }
            }
        }
        //不能删
        if (!canBeDelete) {
            message.warning('该task还有story，不能删除该task!');
        } else {
            //能删
            fetch(`${serverIP}/task?taskId=${taskId}`, {
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
                    taskList = myRemoveCard(taskList, taskId, CardType.TASK);
                    this.setState({
                        taskList: taskList,
                    })
                }
            }).catch((err)=>{
                console.log('error: ', err)
            });
        }
    }


    render() {
        let activity = this.props.data;
        this.state.activityId = activity.activity.id;
        this.state.taskList = activity.taskList;
        const { visible, confirmLoading} = this.state;
        const { getFieldDecorator } = this.props.form;
        return(
            <div className={styles.activityWrapper}>
                <ActivityCard name="activity" content={activity.activity.title}
                    handleActivityDelete={this.props.handleActivityDelete}
                />
                <div style={{display: 'flex'}}>
                   {
                    this.state.taskList.map(task => {
                        return(
                            <Task data={task} key={`task${task.task.id}`} handleTaskDelete={this.handleTaskDelete.bind(this, task.task.id)}/>
                        );
                    })
                    }
                    <Button type="dashed" className={styles.addCard} onClick={this.showModal.bind(this)}>
                        <Icon type="plus" /> 新增task
                    </Button>
                    <Modal
                        title="新增task"
                        visible={visible}
                        onOk={this.handleOk.bind(this)}
                        confirmLoading={confirmLoading}
                        onCancel={this.handleCancel.bind(this)}
                        okText="确认"
                        cancelText="取消"
                    >
                        <Form>
                            <Form.Item label="标题">
                            {getFieldDecorator('title', {
                                rules: [{ required: true }],
                            })(
                                <Input autoComplete="off"/>
                            )}
                            </Form.Item>
                        </Form>
                    </Modal>
                </div>
            </div>
        );
    }
}

export default Form.create()(Activity);