import React, { PureComponent } from 'react';
import { Menu, Icon, Spin, Dropdown, Avatar, Badge} from 'antd';
import Link from 'umi/link';
import styles from './index.less';
import { connect } from 'dva';

class MyGlobalHeader extends PureComponent {
    constructor() {
        super();
        this.state = {
            current: 'map',
        }

    }
    componentDidMount() {
        this.queryList();
    }

    queryList = () => {
        this.props.dispatch({
            type: 'friendNotification/queryList',
        });
    };

    handleClickMap(e) {
        this.props.history.push('/dashboard/storymapping');
        this.setState({
            current: e.key
        });
    }

    handleClickFriends(e) {
        this.props.history.push('/dashboard/friends');
        this.setState({
            current: e.key
        });
    }

    handleClickNotification(e) {
        this.props.history.push('/dashboard/notification/friends');
        this.setState({
            current: e.key
        });
    }

    handleClickPersonInfo(e) {
        this.props.history.push('/dashboard/personinfo/nickname');
        this.setState({
            current: e.key
        });
    }

    handleClickLogout() {
        localStorage.clear();
        this.props.history.push('/');
    }

    render() {
        const {
            currentUser = {},
        } = this.props;
        const menu = (
            <Menu className={styles.menu} selectedKeys={[this.state.current]}>
                <Menu.Item onClick={this.handleClickMap.bind(this)} key="map">
                    <Icon type="table" />故事地图
                </Menu.Item>
                <Menu.Item key="friends" onClick={this.handleClickFriends.bind(this)}>
                    <Icon type="team" />好友管理
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item key="person" onClick={this.handleClickPersonInfo.bind(this)}>
                    <Icon type="user" />个人中心
                </Menu.Item>
                <Menu.Item key="logout" onClick={this.handleClickLogout.bind(this)}>
                    <Icon type="logout" />退出登录
                </Menu.Item>
            </Menu>
        );

        return(
            <div className={styles.header}>
                <Link to="/dashboard/storymapping" className={styles.logo}>
                    <span>
                        Story Mapping Tool
                    </span>
                </Link>
                <div className={styles.right}>
                    <div style={{marginRight: '15px', display: 'inline-block', cursor: 'pointer'}} >
                        <Badge dot={this.props.hasFriendNotification} onClick={this.handleClickNotification.bind(this)}>
                            <Icon type={'bell'} style={{fontSize: '18px'}}/>
                        </Badge>
                    </div>
                    {currentUser.name ? (
                        <Dropdown overlay={menu}>
                            <span className={`${styles.action} ${styles.account}`}>
                                <Avatar size="middle" className={styles.avatar} src={currentUser.avatar} />
                                <span>{currentUser.name}</span>
                            </span>
                        </Dropdown>
                    ) : (
                        <Spin size="default" style={{ marginLeft: 8 }} />
                    )}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        hasFriendNotification: state['friendNotification'].unreadNotification.length > 0,
    }
}

export default connect(mapStateToProps)(MyGlobalHeader);