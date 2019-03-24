import React, { Component } from 'react';
import { Card, List, Button, Icon, Menu, Dropdown, Modal, message, Form, Input, Select} from 'antd';
import styles from './StoryMappingOverview.less';
import { connect } from 'dva';

const namespace = 'storyMapList';

class StoryMappingOverviewPage extends Component {
    constructor() {
        super();
        this.state = {
            visible: false,
            confirmLoading: false,
            collaboratorsSelected: [],
        };
    }

    componentDidMount() {
        this.queryList();
    }

    queryList = () => {
        this.props.dispatch({
            type: `${namespace}/queryList`,
        });
    };

    showModal() {
        this.props.dispatch({
            type: 'friendsList/queryList',
        });

        this.setState({
            visible: true,
        });
    }
    handleOk(){
        this.setState({
            confirmLoading: true,
        });
        this.props.form.validateFields((err, values) => {
            if(!err) {
                console.log('新增地图Received values of form: ', values);
                // 传入的collaborator的是id
                this.props.dispatch({
                    type: `${namespace}/addOne`,
                    payload: {
                        title: values.title,
                        memberList: this.state.collaboratorsSelected
                    },
                }).then((res) => {
                    this.setState({
                        visible: false,
                        confirmLoading: false,
                    });
                    if(res.success) {
                        this.queryList();

                    } else {
                        alert(res.message);
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
    handleMapDelete(mapID) {
        this.props.dispatch({
            type: `${namespace}/deleteOne`,
            payload: mapID,
        }).then((res) => {
            if(res.success) {
                message.success('删除成功');
                this.queryList();
            } else {
                alert(res.message);
            }
        });
    }

    handleMapEdit(mapID) {
        //TODO 还需要完善修改故事地图信息
        this.props.history.push(`/dashboard/storymapiinginfoedit/${mapID}/info`);
    }

    handleMapDetailInfo(mapID) {
        // localStorage.setItem('mapID', mapID);
        this.props.history.push(`/dashboard/storymapiingdetail/${mapID}`);
    }

    handleCollaboratorsChange = collaboratorsSelected => {
        this.setState({ collaboratorsSelected });
    };

    render() {
        if(!localStorage.getItem('token')) {
            this.props.history.push('/');
        }
        const { visible, confirmLoading} = this.state;
        const { getFieldDecorator } = this.props.form;

        return(
            <div style={{maxWidth: "1200px", margin:"0 auto"}}>
                <h1>我创建的</h1>
                <div className={styles.cardList}>
                    <List
                        rowKey="id"
                        grid={{ gutter: 24, column: 3, lg: 3, md: 2, sm: 1, xs: 1 }}
                        dataSource={['', ...this.props.createMapList]}
                        renderItem={item =>
                            item ? (
                                <List.Item>
                                    <Card
                                        hoverable
                                        title={item.title}
                                        extra={
                                            <span className={styles.iconGroup}>
                                                <Dropdown placement="bottomRight" overlay={
                                                    <Menu className={styles.menu}>
                                                        <Menu.Item onClick={this.handleMapDetailInfo.bind(this, item.id)}><Icon type="file" />查看</Menu.Item>
                                                        <Menu.Item onClick={this.handleMapEdit.bind(this, item.id)}><Icon type="edit" />修改</Menu.Item>
                                                        <Menu.Item onClick={this.handleMapDelete.bind(this, item.id)}><Icon type="delete" />删除</Menu.Item>
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
                                        okText="确认"
                                        cancelText="取消"

                                    >
                                        <Form>
                                            <Form.Item label="标题">
                                                {getFieldDecorator('title', {
                                                    rules: [],
                                                })(
                                                    <Input autoComplete="off"/>
                                                )}
                                            </Form.Item>

                                            <Form.Item label={'协作者'}>
                                                <Select
                                                    mode="multiple"
                                                    placeholder="请选择协作者"
                                                    onChange={this.handleCollaboratorsChange}

                                                >
                                                    {
                                                        this.props.friendsList.map(item => (
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
                    <h1>我参与的</h1>
                    <List
                        rowKey="id"
                        grid={{ gutter: 24, column: 3, lg: 3, md: 2, sm: 1, xs: 1 }}
                        dataSource={[...this.props.memberMapList]}
                        renderItem={item =>
                             (
                                <List.Item>
                                    <Card
                                        hoverable
                                        title={item.title}
                                        extra={
                                            <span className={styles.iconGroup}>
                                                <Dropdown placement="bottomRight" overlay={
                                                    <Menu className={styles.menu}>
                                                        <Menu.Item onClick={this.handleMapDetailInfo.bind(this, item.id)}><Icon type="file" />查看</Menu.Item>
                                                    </Menu>
                                                }>
                                                    <Icon type="ellipsis" />
                                                </Dropdown>
                                            </span>
                                        }
                                         onClick={this.handleMapDetailInfo.bind(this, item.id)}
                                    >
                                        <p>创建时间: {item.createTime}</p>
                                        <p>ID: {item.id}</p>
                                    </Card>
                                </List.Item>
                            )
                        }
                    />
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        friendsList: state['friendsList'].friends,
        createMapList: state[namespace].createMapList,
        memberMapList: state[namespace].memberMapList,
    };
}
export default connect(mapStateToProps)(Form.create()(StoryMappingOverviewPage));