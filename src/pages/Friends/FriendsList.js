import React, { Component } from 'react';
import {List, Icon, Button, Modal, Form, Input, message, Popconfirm} from 'antd';
import styles from './FriendsList.less';
import { connect } from 'dva';

const namespace = 'friendsList';

class FriendsListPage extends Component {
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
                alert(res.content);
            }
        });
    };
    render() {
        const { visible, confirmLoading} = this.state;
        const { getFieldDecorator } = this.props.form;

        return(
            <div style={{padding: '50px'}}>
                <h1>好友列表</h1>
                <List
                    dataSource={['', ...this.props.friendsList]}
                    renderItem={ item =>
                        item ? (
                            <List.Item actions={[
                                <Popconfirm
                                    title="确认删除该好友吗？" okText="确认" cancelText="取消"
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
                                    <Icon type="plus"/>添加好友
                                </Button>
                                <Modal
                                    title="添加好友"
                                    visible={visible}
                                    onOk={this.handleOK.bind(this)}
                                    onCancel={this.handleCancel.bind(this)}
                                    confirmLoading={confirmLoading}
                                >
                                    <Form>
                                        <Form.Item label="email">
                                            {getFieldDecorator('title', {
                                                rules: [{type: 'email', message: 'The input is not valid E-mail!',}],
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
        friendsList: state.friendsList.friends,
    };
}
export default connect(mapStateToProps)(Form.create()(FriendsListPage));