import React, { Component } from 'react';
import StoryCard from './StoryCard';
import styles from './StoryMappingDetail.less';
import {Button, Icon, Modal, Form, Input} from 'antd';
import {serverIP} from "../../util/GlobalConstants";

class UserStory extends Component {
    constructor() {
        super();
        this.state = {
            storyList : [],
            visible: false,
            confirmLoading: false,
            taskId: -1
        }
    }
    showModal() {
        this.setState({
            visible: true,
        });
    }

     handleOk(){
        let storyList = this.state.storyList;
        this.setState({
            confirmLoading: true,
        });
        this.props.form.validateFields((err, values) => {
            let bodyPara = {
                title: values.title,
                content: 'content',
                mapId: localStorage.getItem('mapID'),
                taskId: this.state.taskId,
                sprint: 1
            };
            if(!err) {
                console.log('Received values of form: ', values);
                fetch(`${serverIP}/story`, {
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
                        storyList.push({
                            id: res.content.id,
                            title: res.content.title,
                            content: res.content.content,
                        });
                        this.setState({
                            storyList: storyList,
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

    render() {
        this.state.storyList = this.props.data;
        this.state.taskId = this.props.task;
        const { visible, confirmLoading} = this.state;
        const { getFieldDecorator } = this.props.form;
        return(
            <div className={styles.storyWrapper}>
                {
                    this.state.storyList.map(story => {
                        return(
                            <StoryCard name="story" key={`story${story.id}`} content={story.title}>
                            </StoryCard>
                        );
                    })
                }
                <Button type="dashed" className={styles.addCard} onClick={this.showModal.bind(this)}>
                    <Icon type="plus" /> 新增story
                </Button>
                <Modal
                    title="新增story"
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
        );
    }
}
export default Form.create()(UserStory);