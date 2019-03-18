import React, { Component } from 'react';
import {Tabs} from 'antd';
import { connect } from 'dva';
import {serverIP} from "../../util/GlobalConstants";

class PersonInfo extends Component{
    static TabPane = Tabs.TabPane;

    render() {
        return(
            <div style={{margin: '128px'}}>
                <Tabs defaultActiveKey={'nickname'} tabPosition={'left'}
                      onChange={(activeKey)=>{this.props.history.push(`/dashboard/personinfo/${activeKey}`);}}
                >
                    <Tabs.TabPane tab={'个人信息'} key={'nickname'}>
                        {this.props.children}
                    </Tabs.TabPane>
                    <Tabs.TabPane tab={'修改密码'} key={'password'}>
                        {this.props.children}
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