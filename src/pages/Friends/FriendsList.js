import React, { Component } from 'react';
import {List, Icon, Button, Modal, Form, Input} from 'antd';
import styles from './FriendsList.less';
import IconFont from '../../util/IconFont';
import { connect } from 'dva';

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

    queryList = () => {
        this.props.dispatch({
            type: 'friendsList/queryList',
        });
    };
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
    render() {
        // const data = [
        //     {
        //         name: 'LiuXing',
        //         email: 'mf1832103@smail.nju.edu.cn'
        //     },
        //     {
        //         name: 'TanQiong',
        //         email: 'mf1832143@smail.nju.edu.cn'
        //     }
        // ];
        const deleteButton = (
                <IconFont type="icon-delete" className={styles.deleteButton}/>
        );

        const { visible, confirmLoading} = this.state;
        const { getFieldDecorator } = this.props.form;

        return(
            <div style={{padding: '50px'}}>
                <h1>好友列表</h1>
                <List
                    dataSource={['', ...this.props.friendsList]}
                    renderItem={ item =>
                        item ? (
                            <List.Item actions={[deleteButton]} >
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