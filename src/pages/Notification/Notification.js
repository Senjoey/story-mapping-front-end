import React, { Component } from 'react';
import {Tabs} from 'antd';
import { connect } from 'dva';

class Notification extends Component{
    static TabPane = Tabs.TabPane;

    render() {
        return(
            <div style={{margin: '64px'}}>
                <Tabs defaultActiveKey={'friends'} type={'card'}>
                    <Tabs.TabPane tab={'好友邀请'} key={'friends'}>
                        {this.props.children}
                    </Tabs.TabPane>
                    <Tabs.TabPane tab={'地图通知'} key={'maps'}>
                        notification of maps
                    </Tabs.TabPane>
                </Tabs>
            </div>
        );
    }

}

function mapStateToProps(state) {
    return {
        // friendsList: state.friendsList.friends,
    };
}

export default connect(mapStateToProps)(Notification);