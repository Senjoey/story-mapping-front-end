import React from 'react';
import {Layout} from 'antd';
import MyGlobalHeader from "../../component/MyGlobalHeader/index";
import styles from './BasicLayout.less';
import { connect } from 'dva';

const {Header, Content} = Layout;
const namespace = 'userInfo';

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
        this.props.dispatch({
            type: `${namespace}/queryUserInfo`,
        });
    };
    render () {
        return (
            <Layout>
                <Header className={styles["override-ant-layout-header"]}>
                    <MyGlobalHeader
                        currentUser={{
                          name: this.props.userInfo.name,
                          avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
                        }}
                        history={this.props.history}
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
function mapStateToProps(state) {
    return {
        userInfo: state[namespace].userInfo,
    };
}
export default connect(mapStateToProps)(BasicDashBoardLayout);
