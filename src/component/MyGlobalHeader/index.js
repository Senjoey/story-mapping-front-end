import React, { PureComponent } from 'react';
import { Menu, Icon, Spin, Dropdown, Avatar} from 'antd';
import styles from './index.less';

export default class MyGlobalHeader extends PureComponent {
    render() {
        const {
            currentUser = {},
        } = this.props;
        const menu = (
            <Menu className={styles.menu} selectedKeys={[]}>
                <Menu.Item>
                    <Icon type="table" />故事地图
                </Menu.Item>
                <Menu.Item>
                    <Icon type="team" />管理好友
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item>
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
                    {currentUser.name ? (
                        <Dropdown overlay={menu}>
                            <span className={`${styles.action} ${styles.account}`}>
                                <Avatar size="middle" className={styles.avatar} src={currentUser.avatar} />
                                <span className={styles.name}>{currentUser.name}</span>
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