import React, { Component } from 'react';
import {serverIP} from '../../util/GlobalConstants';
import styles from './StoryMappingDetail.less';
import Activity from "./Activity";
import {Button, Icon, Modal, Form, Input, message} from 'antd';
import {CardType} from "../../util/CardType";
import {myRemoveCard} from "../../util/ArrayUtil";

class StoryMappingDetailInfo extends Component{
    constructor() {
        super();
        this.state = {
            mapTitle: '用户故事标题',
            activityList: [],
            visible: false,
            confirmLoading: false,
        }
    }

    componentWillMount () {
        this._getMapOverviewInfo(localStorage.getItem('mapID'));
        this._getMapDetailInfo(localStorage.getItem('mapID'))
    }

    _getMapOverviewInfo(mapID) {
        fetch(`${serverIP}/map/${mapID}`, {
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
            this.setState({mapTitle: res.content.title})
        }).catch((err)=>{
            console.log('error: ', err)
        });
    }

    _getMapDetailInfo(mapID) {
        fetch(`${serverIP}/map/detail?mapId=${mapID}`, {
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
            this.setState({activityList: res.content})
        }).catch((err)=>{
            console.log('error: ', err)
        });
    }

    showModal() {
        this.setState({
            visible: true,
        });
    }
    handleOk(){
        let activityList = this.state.activityList;
        this.setState({
            confirmLoading: true,
        });
        this.props.form.validateFields((err, values) => {
            let bodyPara = {
                title: values.title,
                content: 'task content',
                mapId: localStorage.getItem('mapID'),
            };
            if(!err) {
                console.log('Received values of form: ', values);
                fetch(`${serverIP}/activity`, {
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
                        activityList.push(
                            {
                                activity:{
                                    id: res.content.id,
                                    title: res.content.title,
                                    content: res.content.content
                                },
                                taskList: []
                            }
                        );
                        this.setState({
                            activityList: activityList,
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

    handleActivityDelete(activityId) {
        let activityList = this.state.activityList;
        let canBeDelete = true;
        for (let i = 0; i < activityList.length; i++) {
            let ac = activityList[i];
            if (ac.activity.id === activityId) {
                if (ac.taskList.length > 0) {
                    canBeDelete = false;
                    break;
                }
            }
        }
        //不能删
        if (!canBeDelete) {
            message.warning('该activity还有task，不能删除该activity!');
        } else {
            //能删
            fetch(`${serverIP}/activity?activityId=${activityId}`, {
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
                    activityList = myRemoveCard(activityList, activityId, CardType.ACTIVITY);
                    this.setState({
                        activityList: activityList,
                    })
                }
            }).catch((err)=>{
                console.log('error: ', err)
            });
        }
    }

    render() {
        const { visible, confirmLoading} = this.state;
        const { getFieldDecorator } = this.props.form;
        return(
            <div className={styles.wrapper}>
                <h1>{this.state.mapTitle}</h1>
                <div style={{display: "flex"}}>
                    {
                        this.state.activityList.map(activity => {
                            return(
                                    <Activity data={activity} key={`activity${activity.activity.id}`}
                                      handleActivityDelete={this.handleActivityDelete.bind(this, activity.activity.id)}
                                    />
                            );
                        })
                    }
                    <Button type="dashed" className={styles.addCard} onClick={this.showModal.bind(this)}>
                        <Icon type="plus" /> 新增activity
                    </Button>
                    <Modal
                        title="新增activity"
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
                </div>
            </div>
        );
    }
}
export default Form.create()(StoryMappingDetailInfo);