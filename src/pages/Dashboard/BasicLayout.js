import React from 'react';
import {Layout} from 'antd';
import MyGlobalHeader from "../../component/MyGlobalHeader/index";
import styles from './BasicLayout.less';
import {serverIP} from "../../util/GlobalConstants";

const {Header, Content} = Layout;

class BasicDashBoardLayout extends React.Component {
    constructor() {
        super();
        this.state = {
            userInfo: {
                name: 'user',
            }
        };
    }
    componentWillMount () {
        this._getUserInfo();
    }
    _getUserInfo = () => {
        let userInfo = {};
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
                    console.log(res);
                    userInfo = res.content;
                    this.setState({userInfo: userInfo})
                }).catch((err)=>{
                    console.log('error: ', err)
                });
    };
    render () {
        return (
            <Layout>
                <Header className={styles["override-ant-layout-header"]}>
                    <MyGlobalHeader
                        currentUser={{
                          name: this.state.userInfo.name,
                          avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
                        }}
                    />
                </Header>

                <Content style={{background: '#fff'}}>
                    <div className={styles.content}>
                        {this.props.children}
                    </div>
                </Content>
            </Layout>
        );
    }
}

export default BasicDashBoardLayout;