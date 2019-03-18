import React, { Component } from 'react';
import { connect } from 'dva';
import { Divider, Form, Input, Button, message } from 'antd';
import styles from './NickName.less';
import {serverIP} from "../../util/GlobalConstants";

const namespace = 'userInfo';

class Password extends Component{

    handleSubmit() {
        this.props.form.validateFields((err, values) => {
            if(!err) {
               //TODO 调用后端接口
            }
        });
    }

    checkOldAndNewPsw = (rule, value, callback) => {
        const { getFieldValue } = this.props.form;
        if(value === getFieldValue("originalPassword")){
            callback("新旧密码不能相同");
            return
        }
        callback()
    };

    checkNewAndConformPsw = (rule, value, callback) => {
        const { getFieldValue } = this.props.form;
        if(value !== getFieldValue("newPassword")){
            callback("输入的新密码不一致");
            return
        }
        callback()
    };

    render() {
        const {getFieldDecorator}  = this.props.form;
        return(
            <div>
                <h3>修改密码</h3>
                <Divider/>
                <div className={styles.info}>
                    <Form >
                        <Form.Item label='原密码'>
                            {getFieldDecorator('originalPassword', {
                                rules: [
                                    { required: true, message: '请输入您的原密码' },
                                ],
                            })(
                                <Input type="password" id="originalPassword"/>
                            )}
                        </Form.Item>

                        <Form.Item label="新密码">
                            {getFieldDecorator('newPassword', {
                                rules: [
                                    { required: true, message: "请输入您的新密码" },
                                    { validator: this.checkOldAndNewPsw }
                                ],
                            })(
                                <Input type="password" id="newPassword"/>
                            )}
                        </Form.Item>

                        <Form.Item label="确认新密码">
                            {getFieldDecorator('confirmPassword', {
                                rules: [
                                    { required: true, message: '请再次输入您的新密码' },
                                    { validator: this.checkNewAndConformPsw }
                                ],
                            })(
                                <Input type="password" id="confirmPassword"/>
                            )}
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" onClick={this.handleSubmit.bind(this)}>
                                更新密码
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

export default connect(mapStateToProps)(Form.create({ name: 'password' })(Password));