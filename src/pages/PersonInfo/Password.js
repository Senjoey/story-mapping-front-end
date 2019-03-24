import React, { Component } from 'react';
import { connect } from 'dva';
import { Divider, Form, Input, Button, message } from 'antd';
import styles from './NickName.less';

const namespace = 'userInfo';

class Password extends Component{

    handleSubmit() {
        this.props.form.validateFields((err, values) => {
            if(!err) {
               //TODO 调用后端接口
                this.props.dispatch({
                    type: `${namespace}/updatePassword`,
                    payload: {
                        oldPassword: values.originalPassword,
                        newPassword: values.newPassword
                    },
                }).then((res) => {
                    if(res.success) {
                        message.success('密码更新成功，请重新登录');
                        localStorage.clear();
                        this.props.history.push('/');
                    } else {
                        message.error(res.message);
                    }
                });
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
                                <Input type="password"/>
                            )}
                        </Form.Item>

                        <Form.Item label="确认新密码">
                            {getFieldDecorator('confirmPassword', {
                                rules: [
                                    { required: true, message: '请再次输入您的新密码' },
                                    { validator: this.checkNewAndConformPsw }
                                ],
                            })(
                                <Input type="password"/>
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