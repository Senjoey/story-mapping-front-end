import React from 'react';
import {Row, Col} from 'antd';
import styles from './Register/registerForm.less';
import Sky from 'react-sky';

class BasicLayout extends React.Component {
    render () {
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
        return (
            <div>
                <Sky
                    images = {sky}
                    how = {130}
                    time = {100}
                    size = {'100px'}
                    background={'#2F3939'}
                />
                <Row type="flex" justify="center" align="middle" className={styles.wrapper}>
                    <Col span={12} className={styles["input-area"]}>
                        {this.props.children}
                     </Col>
                </Row>

            </div>

        );
    }
}
export default BasicLayout;
