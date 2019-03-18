import React, { Component } from 'react';
import {Tabs} from 'antd';
import { connect } from 'dva';

class PersonInfo extends Component{
    static TabPane = Tabs.TabPane;

    handleTabClick(){
        this.forceUpdate();
    }

    render() {
        return(
            <div style={{margin: '128px'}}>
                <Tabs defaultActiveKey={'info'} tabPosition={'left'} >
                    <Tabs.TabPane tab={'个人信息'} key={'info'} forceRender={true}>
                        {this.props.children}
                    </Tabs.TabPane>
                    <Tabs.TabPane tab={'修改密码'} key={'password'}>
                        notification of maps
                    </Tabs.TabPane>
                </Tabs>
            </div>
        );
    }

}

function mapStateToProps(state) {
    return {

    };
}

export default connect(mapStateToProps)(PersonInfo);