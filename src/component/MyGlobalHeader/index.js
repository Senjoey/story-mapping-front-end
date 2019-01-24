import React, { PureComponent } from 'react';
import { Menu, Icon, Spin, Dropdown, Avatar, Badge} from 'antd';
import styles from './index.less';

export default class MyGlobalHeader extends PureComponent {
    constructor() {
        super();
        this.state = {
            current: 'map'
        }

    }
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

    handleClickNotification() {
        this.props.history.push('/dashboard/notification/friends');
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
                <Menu.Item key="person">
                    <Icon type="user" />个人中心
                </Menu.Item>
                <Menu.Item key="logout">
                    <Icon type="logout" />退出登录
                </Menu.Item>
            </Menu>
        );
        return(
            <div className={styles.header}>
                <div className={styles.right}>
                    <div style={{marginRight: '15px', display: 'inline-block', cursor: 'pointer'}} >
                        <Badge dot onClick={this.handleClickNotification.bind(this)}>
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
                        <Spin size="middle" style={{ marginLeft: 8 }} />
                    )}
                </div>
            </div>
        );
    }
}