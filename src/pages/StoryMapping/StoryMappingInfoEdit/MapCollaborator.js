import React, { Component } from 'react';
import {List, Icon, Button, Modal, Form, Input, message, Popconfirm} from 'antd';
import styles from '../../Friends/FriendsList.less';
import { connect } from 'dva';

const namespace = 'friendsList';

class MapCollaborator extends Component {
    constructor() {
        super();
        this.state = {
            visible: false,
            confirmLoading: false,
        };
    }
    componentDidMount() {
        this.queryList();
    }

    showModal() {
        this.setState({
            visible: true,
        });
    }
    handleOK() {
        this.setState({
            confirmLoading: true,
        });
        this.props.form.validateFields((err, values) => {
            if(!err) {
                this.props.dispatch({
                    type: `${namespace}/queryIdByEmail`,
                    payload: values.email,
                }).then((res) => {
                     this.setState({
                         visible: false,
                         confirmLoading: false,
                     });
                    if(res.success && res.content.length) {
                        console.log('before add one friend: ', res);
                        this.props.dispatch({
                            type: `${namespace}/addOne`,
                            payload: res.content[0].id,
                        }).then((res) => {
                            if(!res.success) {
                               message.warn(res.message);
                            } else {
                                message.success('已发送验证消息');
                            }
                        });
                    } else if(res.success) {
                        message.warn('请检查输入的邮箱');
                    } else {
                        message.warn(res.message);
                    }
                });
            }
        });
    }

    handleCancel() {
        this.setState({
            visible: false,
        });
    }

    queryList = () => {
        this.props.dispatch({
            type: `${namespace}/queryList`,
        });
    };

    deleteOne = (id) => {
        this.props.dispatch({
            type: `${namespace}/deleteOne`,
            payload: id,
        }).then((res) => {
            if(res.success) {
                message.success('删除成功');
                this.queryList();
            } else {
                alert(res.message);
            }
        });
    };
    render() {
        if(!localStorage.getItem('token')) {
            this.props.history.push('/');
        }
        const { visible, confirmLoading} = this.state;
        const { getFieldDecorator } = this.props.form;

        return(
            <div style={{width: '70%'}}>
                <h2>协作者列表</h2>
                <List
                    dataSource={['', ...this.props.friendsList]}
                    renderItem={ item =>
                        item ? (
                            <List.Item actions={[
                                <Popconfirm
                                    title="确认删除该协作者吗？" okText="确认" cancelText="取消"
                                    onConfirm={() => this.deleteOne(item.id)}
                                    placement="topRight"
                                >
                                    <Icon type={'delete'}/>
                                </Popconfirm>
                            ]} >
                                <List.Item.Meta
                                    title={item.name}
                                    description={item.email}
                                />
                            </List.Item>
                        ) : (
                            <List.Item>
                                <Button type="dashed" className={styles.newButton} onClick={this.showModal.bind(this)}>
                                    <Icon type="user-add"/>添加协作者
                                </Button>
                                <Modal
                                    title="添加协作者"
                                    visible={visible}
                                    onOk={this.handleOK.bind(this)}
                                    onCancel={this.handleCancel.bind(this)}
                                    confirmLoading={confirmLoading}
                                    okText="确认"
                                    cancelText="取消"
                                >
                                    <Form>
                                        <Form.Item label="邮箱">
                                            {getFieldDecorator('email', {
                                                rules: [{type: 'email', message: '邮箱无效',}],
                                            })(
                                                <Input autoComplete="off"/>
                                            )}
                                        </Form.Item>
                                    </Form>
                                </Modal>
                            </List.Item>
                        )
                    }
                />
            </div>
        );

    }
}

function mapStateToProps(state) {
    return {
        friendsList: state[namespace].friends,
        friendId: state[namespace].friendId,
    };
}
export default connect(mapStateToProps)(Form.create()(MapCollaborator));