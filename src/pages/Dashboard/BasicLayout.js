import React from 'react';
import {Layout} from 'antd';
import MyGlobalHeader from "../../component/MyGlobalHeader/index";
import styles from './basicLayout.less'
const {Header, Content} = Layout;

class BasicDashBoardLayout extends React.Component {
    render () {
        return (
            <Layout>
                <Header className={styles["override-ant-layout-header"]}>
                    <MyGlobalHeader
                        currentUser={{
                          name: 'StarryLemon',
                          avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
                          userid: '00000001',
                        }}
                    />
                </Header>

                <Content>
                    <div style={{ background: '#fff', padding: 48, minHeight: 360 }}>
                        {this.props.children}
                    </div>
                </Content>
            </Layout>
        );
    }
}

export default BasicDashBoardLayout;