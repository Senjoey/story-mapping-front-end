import React, { Component } from 'react';
import {Tabs, List, Button, Tag} from 'antd';
import { connect } from 'dva';

const namespace = 'friendNotification';

class FriendNotification extends Component{

    componentDidMount() {
        this.queryList();
    }

    queryList = () => {
        this.props.dispatch({
            type: `${namespace}/queryList`,
        });
    };

    getTagByStatus(status, id) {
        if(status === 1) {
            return [(
                <Tag color={'green'} key={id}>
                    已通过
                </Tag>
            )];
        } else {
            return [(
                <Tag color={'red'} key={id}>
                    已拒绝
                </Tag>
            )];
        }
    }

    handleNotificationReply(invitationId, isAgree) {
        this.props.dispatch({
            type: `${namespace}/replyInvitation`,
            payload: {
                invitationId: invitationId,
                isAgree: isAgree
            },
        }).then((res) => {
            if(res.success) {
                this.queryList();
            } else {
                alert(res.content);
            }
        });
    }

    render() {
        if(!localStorage.getItem('token')) {
            this.props.history.push('/');
        }
        return(
            <Tabs defaultActiveKey={'friends-read'} tabPosition={'left'}>
                <Tabs.TabPane tab={'未处理'} key={'friends-read'}>
                    <div>
                        <List
                            dataSource={this.props.unreadNotification}
                            renderItem={ item => (
                                <List.Item actions={[
                                    <Button onClick={this.handleNotificationReply.bind(this, item.invitationId, true)} >
                                        接受
                                    </Button>,
                                    <Button onClick={this.handleNotificationReply.bind(this, item.invitationId, false)}>
                                        拒绝
                                    </Button>
                                ]}>
                                    <List.Item.Meta
                                        title={`${item.senderName} ${item.senderEmail}`}
                                        description={'请求添加好友'}
                                    />
                                </List.Item>
                            )}
                        />
                    </div>

                </Tabs.TabPane>
                <Tabs.TabPane tab={'已处理'} key={'friends-unread'}>
                    <div>
                        <List
                            dataSource={this.props.readNotification}
                            renderItem={ item => (
                                <List.Item actions={ [this.getTagByStatus(item.status, item.invitationId)] }>
                                    <List.Item.Meta
                                        title={`${item.senderName} ${item.senderEmail}`}
                                        description={'请求添加好友'}
                                    />
                                </List.Item>
                            )}
                        />
                    </div>
                </Tabs.TabPane>
            </Tabs>
        );
    }

}

function mapStateToProps(state) {
    return {
        unreadNotification: state[namespace].unreadNotification,
        readNotification: state[namespace].readNotification,
    }
}

export default connect(mapStateToProps)(FriendNotification);