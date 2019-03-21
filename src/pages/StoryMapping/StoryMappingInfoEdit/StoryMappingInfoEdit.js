import React, { Component } from 'react';
import {Tabs} from 'antd';
import { connect } from 'dva';

class StoryMappingInfoEdit extends Component{
    static TabPane = Tabs.TabPane;

    render() {
        let mapID = this.props.match.params.mapID;

        return(
            <div style={{margin: '128px'}}>
                <Tabs defaultActiveKey={'info'} tabPosition={'left'}
                      onChange={(activeKey)=>{this.props.history.push(`/dashboard/storymapiinginfoedit/${mapID}/${activeKey}`);}}
                >
                    <Tabs.TabPane tab={'基本信息'} key={'info'}>
                        {this.props.children}
                    </Tabs.TabPane>
                    <Tabs.TabPane tab={'协作者'} key={'collaborator'}>
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

export default connect(mapStateToProps)(StoryMappingInfoEdit);