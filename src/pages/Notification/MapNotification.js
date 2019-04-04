import React, { Component } from 'react';
import {List} from 'antd';
import { connect } from 'dva';

const namespace = 'friendNotification';

class MapNotification extends Component{

    render() {
        if(!localStorage.getItem('token')) {
            this.props.history.push('/');
        }
        return(
            <div>
                <List
                    dataSource={this.props.mapNotification}
                    renderItem={ item => (
                        <List.Item >
                            <List.Item.Meta
                                title={item.title}
                                description={item.status ? `${item.operationTIme}  ${item.name}被移除` : `${item.operationTIme}  ${item.name}被添加为协作者`}
                            />
                        </List.Item>
                    )}
                    style={{width: '50%', paddingLeft: '2%'}}
                />
            </div>
        );
    }

}

function mapStateToProps(state) {
    return {
       mapNotification: state[namespace].mapNotification,
    }
}

export default connect(mapStateToProps)(MapNotification);