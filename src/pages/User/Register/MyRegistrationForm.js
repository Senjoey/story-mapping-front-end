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

        return (
          <div className={styles.main}>
            <Form onSubmit={this.handleSubmit}>
                <Form.Item 
                    label="邮箱"
                    className={styles["override-ant-form-item-label"]}
                    >
                    {getFieldDecorator('email', {
                        rules: [{
                            type: 'email', message: 'The input is not valid E-mail!',
                        }],
                    })(
                    <Input autoComplete="off"/>
                    )}
                </Form.Item>
                <Form.Item
                    label="昵称"
                    className={styles["override-ant-form-item-label"]}
                    >
                    {getFieldDecorator('name', {
                        rules: [],
                    })(
                    <Input autoComplete="off"/>
                    )}
                </Form.Item>
                <Form.Item
                    label="密码"
                    className={styles["override-ant-form-item-label"]}
                >
                    {getFieldDecorator('password', {
                        rules: [],
                    })(
                    <Input type="password" autoComplete="off"/>
                    )}
                </Form.Item>
                <Form.Item>
                    <Button
                        size="large"
                        className={styles.submit}
                        type="primary"
                        htmlType="submit"
                    >
                        注册
                    </Button>
                </Form.Item>
                <Form.Item>
                    <div className={styles.login}>
                        已有账号？<Link to="/user/login">现在登录</Link>
                    </div>
                </Form.Item>
            </Form>
          </div>
        )
    }
}

const WrappedRegistrationForm = Form.create({ name: 'register' })(RegistrationForm);
export default WrappedRegistrationForm;