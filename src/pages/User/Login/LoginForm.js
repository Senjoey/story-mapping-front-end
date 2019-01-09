import React from 'react';
import {Form, Button, Input, Icon} from 'antd';
import Link from 'umi/link';
import styles from '../Register/registerForm.less';
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
                fetch('http://172.19.168.235:8080/user/login', {
                    method: 'POST',
                    mode: "cors",
                    headers: new Headers({
                        'Content-Type': 'application/json'
                    }),
                    body: JSON.stringify(values)
                }).then((res)=>{
                    return res.json()
                }).then((res)=>{
                    console.log(res)
                }).catch((err)=>{
                    console.log("error: ", err)
                });
            }
        });
    }
    render() {
        const {getFieldDecorator}  = this.props.form;
        const formItemLayout = {
            wrapperCol: {
              xs: { span: 24 },
              sm: {
                  span: 12,
                  offset: 6
              },
            },
          };
        const tailFormItemLayout = {
            wrapperCol: {
              xs: {
                span: 24,
                offset: 0,
              },
              sm: {
                span: 12,
                offset: 8,
              },
            },
        };

        return(
            <Form onSubmit={this.handleSubmit}>
                <Form.Item
                    {...formItemLayout}
                >
                {getFieldDecorator('email', {
                        rules: [{
                            type: 'email', message: 'The input is not valid E-mail!',
                        }, {
                            required: true, message: 'Please input your E-mail!',
                        }],
                })(
                    <Input prefix={<Icon type="mail" className={styles["login-input"]} />} placeholder="Email" />
                )}
                </Form.Item>
                <Form.Item
                    {...formItemLayout}
                >
                {getFieldDecorator('password', {
                    rules: [{ required: true, message: 'Please input your Password!' }],
                })(
                    <Input prefix={<Icon type="lock" className={styles["login-input"]} />} type="password" placeholder="Password" />
                )}
                </Form.Item>
                <Form.Item
                    {...tailFormItemLayout}
                >
                     <Button type="primary" htmlType="submit">
                        Log in
                    </Button>
                     &nbsp;&nbsp;Or <Link to="/">Register now!</Link>
                </Form.Item>
            </Form>
        );
    }
}
const WrappedLoginForm = Form.create({ name: 'login' })(LoginForm);
export default WrappedLoginForm;