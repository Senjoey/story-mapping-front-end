import React, { Component } from 'react';
import { connect } from 'dva';
import { Divider, Form, Input, Button, message } from 'antd';
import styles from './NickName.less';
import {serverIP} from "../../util/GlobalConstants";

const namespace = 'userInfo';

class Nickname extends Component{
    constructor() {
        super();
        this.state = {
            name: ''
        };
        this._getUserName();
    }

    _getUserName() {
        let user = {};
        fetch(`${serverIP}/user/info`, {
            method: 'GET',
            mode: "cors",
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }),
        }).then((res)=>{
            return res.json()
        }).then((res)=>{
            user = res.content;
            this.setState({name: user.name})
        }).catch((err)=>{
            console.log('error: ', err)
        });
    }

    handleSubmit() {
        this.props.dispatch({
            type: `${namespace}/updateInfo`,
            payload: {
                name: this.state.name
            },
        }).then((res) => {
            if(res.success) {
                message.success('更新成功');
                this.props.dispatch({
                    type: `${namespace}/queryUserInfo`,
                });
            } else {
                alert(res.message);
            }
        });
    }

    handleNicknameChange(event){
        this.setState({name: event.target.value});
    }

    render() {
        const {getFieldDecorator}  = this.props.form;
        return(
            <div>
                <h3>个人信息</h3>
                <Divider/>
                <div className={styles.info}>
                    <Form >
                        <Form.Item label='邮箱'>
                            <Input readOnly='readOnly' value={this.props.userInfo.email}/>
                        </Form.Item>

                        <Form.Item label='昵称'>
                            <Input type="name"  value={this.state.name} onChange={this.handleNicknameChange.bind(this)}/>
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
        userInfo: state[namespace].userInfo,
    }
}

export default connect(mapStateToProps)(Form.create({ name: 'nickname' })(Nickname));