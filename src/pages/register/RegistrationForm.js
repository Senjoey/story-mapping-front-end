import React from 'react';
import Sky from 'react-sky';
import {Form, Button, Input, Row, Col} from 'antd';
import styles from './registerForm.less';

class RegistrationForm extends React.Component {
    constructor() {
        super();
        this.state = {
            username : '',
            password: ''
        }
    }
    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                fetch('http://172.19.168.235:8080/user/register', {
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
                })
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
            <Form onSubmit={this.handleSubmit.bind(this)}>
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
                    <Input />
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
                    <Input />
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
                    <Input type="password" />
                    )}
                </Form.Item>
                <Form.Item {...tailFormItemLayout}
                    // className={styles["override-ant-form-item-label"]}
                >
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        register
                    </Button>
                     &nbsp;&nbsp;Or <a href="">Log in now!</a>
                </Form.Item>
            </Form>
        )
    }
}

const WrappedRegistrationForm = Form.create({ name: 'register' })(RegistrationForm);

class Register extends React.Component {
    render() {
        const sky = {
            0: "https://image.flaticon.com/icons/svg/124/124574.svg",
            1: "https://image.flaticon.com/icons/svg/124/124570.svg",
            2: "https://image.flaticon.com/icons/svg/124/124567.svg",
            3: "https://image.flaticon.com/icons/svg/124/124560.svg",
            4: "https://image.flaticon.com/icons/svg/124/124559.svg",
            5: "https://image.flaticon.com/icons/svg/124/124582.svg",
            // 6: "https://image.flaticon.com/icons/svg/124/124558.svg",
            // 7: "https://image.flaticon.com/icons/svg/124/124588.svg",
            // 8: "https://image.flaticon.com/icons/svg/124/124542.svg",
            // 9: "https://image.flaticon.com/icons/svg/124/124569.svg",
            // 10: "https://image.flaticon.com/icons/svg/124/124573.svg",
            // 11: "https://image.flaticon.com/icons/svg/124/124586.svg",
            // 12: "https://image.flaticon.com/icons/svg/124/124548.svg",
            // 13: "https://image.flaticon.com/icons/svg/124/124555.svg"
        };
        return(
            <div>
                <Row type="flex" justify="center" align="middle" className={styles.wrapper}>
                    <Col span={12} className={styles["input-area"]}>
                        <WrappedRegistrationForm />
                     </Col>
                </Row>
                <Sky
                    images = {sky}
                    how = {130}
                    time = {100}
                    size = {'100px'}
                    background={'#2F3939'}
                />
            </div>

        )
    }
}
export default Register;