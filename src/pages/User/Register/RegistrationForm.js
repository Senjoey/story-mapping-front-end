import React from 'react';
import {Form, Button, Input} from 'antd';
import styles from './RegisterForm.less';
import Link from 'umi/link';
import {serverIP} from "../../../util/GlobalConstants";

class RegistrationForm extends React.Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                fetch(`${serverIP}/user/register`, {
                    method: 'POST',
                    mode: "cors",
                    headers: new Headers({
                        'Content-Type': 'application/json' // 指定提交方式为表单提交
                    }),
                    body: JSON.stringify(values)
                }).then((res)=>{
                    return res.json()
                }).then((res)=>{
                    console.log(res)
                }).catch((err)=>{
                    console.log('error: ', err)
                });
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
              xs: { span: 24 },
              sm: { span: 7 },
            },
            wrapperCol: {
              xs: { span: 24 },
              sm: { span: 10 },
            },
          };
          const tailFormItemLayout = {
            wrapperCol: {
              xs: {
                span: 24,
                offset: 0,
              },
              sm: {
                span: 16,
                offset: 7,
              },
            },
          };
        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Item 
                    {...formItemLayout}
                    label="E-mail"
                    className={styles["override-ant-form-item-label"]}
                    >
                    {getFieldDecorator('email', {
                        rules: [{
                            type: 'email', message: 'The input is not valid E-mail!',
                        }, {
                            required: true, message: 'Please input your E-mail!',
                        }],
                    })(
                    <Input autoComplete="off"/>
                    )}
                </Form.Item>
                <Form.Item
                    {...formItemLayout}
                    label="name"
                    className={styles["override-ant-form-item-label"]}
                    >
                    {getFieldDecorator('name', {
                        rules: [{
                            required: true, message: 'Please input your name!',
                        }],
                    })(
                    <Input autoComplete="off"/>
                    )}
                </Form.Item>
                <Form.Item
                    {...formItemLayout} 
                    label="Password"
                    className={styles["override-ant-form-item-label"]}
                >
                    {getFieldDecorator('password', {
                        rules: [{
                            required: true, message: 'Please input your password!',
                            }],
                    })(
                    <Input type="password" autoComplete="off"/>
                    )}
                </Form.Item>
                <Form.Item {...tailFormItemLayout}
                    // className={styles["override-ant-form-item-label"]}
                >
                    <Button type="primary" htmlType="submit">
                        Register
                    </Button>
                     &nbsp;&nbsp;Or <Link to="/user/login">Log in now!</Link>
                </Form.Item>
            </Form>
        )
    }
}

const WrappedRegistrationForm = Form.create({ name: 'register' })(RegistrationForm);
export default WrappedRegistrationForm;