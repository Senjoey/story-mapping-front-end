import React, { Component } from 'react';
import { connect } from 'dva';
import { Divider, Form, Input, Button, message } from 'antd';

const namespace = 'storyMapList';

class MapInfo extends Component{

    constructor() {
        super();
        this.state = {
            title: ''
        };
    }

    componentDidMount() {
        let mapID = this.props.match.params.mapID;
        this.props.dispatch({
            type: `${namespace}/queryOne`,
            payload: {
                mapID: mapID,
            },
        }).then((res) => {
            if(res.success) {
                this.setState({title: res.content.title});
            } else {
                alert(res.message);
            }
        });
    }

    handleTitleChange(event){
        this.setState({title: event.target.value});
    }

    handleSubmit() {
        this.props.dispatch({
            type: `${namespace}/updateTitle`,
            payload: {
                mapID: this.props.match.params.mapID,
                title: this.state.title
            },
        }).then((res) => {
            if(res.success) {
                message.success('更新成功');
            } else {
                alert(res.message);
            }
        });
    }

    render() {
        const {getFieldDecorator}  = this.props.form;
        return(
            <div>
                <h2>地图基本信息</h2>
                <Divider/>
                <div style={{width: "50%"}}>
                    <Form >
                        <Form.Item label='标题'>
                            <Input type="title" value={this.state.title} onChange={this.handleTitleChange.bind(this)}/>
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" onClick={this.handleSubmit.bind(this)}>
                                更新信息
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        );
    }
}
function mapStateToProps(state) {
    return {

    }
}

export default connect(mapStateToProps)(Form.create({})(MapInfo));