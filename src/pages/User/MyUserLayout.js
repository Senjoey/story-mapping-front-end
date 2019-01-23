import React from 'react';
import styles from './UserLayout.less';

class BasicLayout extends React.Component {
    render () {
        return (
            <div className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.top}>
                        <div className={styles.header}>
                            <span className={styles.title}>Story Mapping Tool</span>
                        </div>
                        <div className={styles.desc}>
                            鼓楼区最具影响力的故事地图工具
                        </div>
                    </div>
                    {this.props.children}
                </div>
            </div>

        );
    }
}
export default BasicLayout;
