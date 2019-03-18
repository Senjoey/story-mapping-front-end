import React from 'react';
import {Form, Button, Input, Icon, message} from 'antd';
import Link from 'umi/link';
import styles from '../Register/RegisterForm.less';
import {serverIP} from "../../../util/GlobalConstants";

class LoginForm extends  React.Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if(!err) {
                console.log('Received values of form: ', values);
                fetch(`${serverIP}/user/login`, {
                    method: 'POST',
                    mode: "cors",
                    headers: new Headers({
                        'Content-Type': 'application/json'
                    }),
                    body: JSON.stringify(values)
                }).then((res)=>{
                    return res.json()
                }).then((res)=>{
                    console.log(res);
                    this.handleRequestResult(res, values);
                }).catch((err)=>{
                    console.log('error: ', err)
                });
            }
        });
    }

    handleRequestResult = (res, values) => {
        // status = ;
        if(res.success) {
            localStorage.clear();
            localStorage.setItem('token', res.content);
            localStorage.setItem('user', values.email);
            this.props.history.push('/dashboard/storymapping');
        } else {
            message.error(res.message);
        }
    };

    render() {
        const {getFieldDecorator}  = this.props.form;
        return(
          <div className={styles.main}>
            <Form onSubmit={this.handleSubmit}>
                <Form.Item>
                {getFieldDecorator('email', {
                        rules: [{
                            type: 'email', message: '邮箱格式错误',
                        }, {
                            required: true, message: '请输入您的邮箱',
                        }],
                })(
                    <Input prefix={<Icon type="mail" className={styles["login-input"]} />} placeholder="邮箱"/>
                )}
                </Form.Item>
                <Form.Item>
                {getFieldDecorator('password', {
                    rules: [{ required: true, message: '请输入您的密码' }],
                })(
                    <Input prefix={<Icon type="lock" className={styles["login-input"]} />} type="password" placeholder="密码"/>
                )}
                </Form.Item>
                <Form.Item>
                     <Button type="primary" htmlType="submit" className={styles.submit}>
                        Log in
                    </Button>
                </Form.Item>
                <Form.Item>
                    <div className={styles.login}>
                        没有账号？<Link to="/user/register">现在注册</Link>
                    </div>
                </Form.Item>
            </Form>
          </div>
        );
    }
}
const WrappedLoginForm = Form.create({ name: 'login' })(LoginForm);
export default WrappedLoginForm;