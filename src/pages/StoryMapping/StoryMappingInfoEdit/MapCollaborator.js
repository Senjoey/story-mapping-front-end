import React, { Component } from 'react';
import {List, Icon, Button, Modal, Form, Select, message, Popconfirm} from 'antd';
import styles from '../../Friends/FriendsList.less';
import { connect } from 'dva';

const namespace = 'storyMapList';

class MapCollaborator extends Component {
    constructor() {
        super();
        this.state = {
            visible: false,
            confirmLoading: false,
            collaboratorsSelected: [],
        };
    }
    componentDidMount() {
        this._queryCollaboratorList();
        this.props.dispatch({
            type: 'friendsList/queryList',
        });
    }

    _queryCollaboratorList() {
         this.props.dispatch({
            type: `${namespace}/queryCollaboratorList`,
            payload: {
                mapID: this.props.match.params.mapID,
            },
        });
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
         this.props.dispatch({
             type: `${namespace}/addCollaborators`,
             payload: {
                 mapID: this.props.match.params.mapID,
                 memberIDList: this.state.collaboratorsSelected
             },
         }).then((res) => {
             this.setState({
                 visible: false,
                 confirmLoading: false,
             });
             if(res.success) {
                 this._queryCollaboratorList();
             } else {
                 alert(res.message);
             }
         });

    }

    handleCancel() {
        this.setState({
            visible: false,
        });
    }

    deleteOne = (id) => {
        this.props.dispatch({
            type: `${namespace}/deleteCollaborator`,
            payload: {
                mapID: this.props.match.params.mapID,
                deleteUserID: id
            },
        }).then((res) => {
            if(res.success) {
                message.success('删除成功');
                this._queryCollaboratorList();
            } else {
                alert(res.message);
            }
        });
    };

    handleCollaboratorsChange = collaboratorsSelected => {
        this.setState({ collaboratorsSelected });
    };

    _getPossibleCollaborators() {
        let length = this.props.collaborators ? this.props.collaborators.length : 0;
        let ids = [];
        for(let i = 0; i < length; i++) {
            ids.push(this.props.collaborators[i].id)
        }
        let possibleCollaborators = this.props.friendsList.filter(item => !ids.includes(item.id)) || [];
        return possibleCollaborators || [];
    }

    render() {
        if(!localStorage.getItem('token')) {
            this.props.history.push('/');
        }
        let possibleCollaborators = this._getPossibleCollaborators();
        const { visible, confirmLoading} = this.state;
        return(
            <div style={{width: '70%'}}>
                <h2>协作者列表</h2>
                <List
                    dataSource={['', ...(this.props.collaborators || [])]}
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
                                    destroyOnClose={true}
                                >
                                    <Form>
                                        <Form.Item label="协作者">
                                            <Select
                                                mode="multiple"
                                                placeholder="请选择协作者"
                                                onChange={this.handleCollaboratorsChange}
                                                allowClear={true}
                                            >
                                                {
                                                    possibleCollaborators.map(item => (
                                                        <Select.Option key={item.id}>
                                                            {`${item.name} ${item.email}`}
                                                        </Select.Option>
                                                    ))
                                                }
                                            </Select>
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
        friendsList: state['friendsList'].friends,
        collaborators: state[namespace].collaborators,
    };
}

export default connect(mapStateToProps)(Form.create()(MapCollaborator));