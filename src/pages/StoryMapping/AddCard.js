import React, { Component } from 'react';
import {Button, Icon} from 'antd';
import styles from './StoryMappingDetail.less'
export default class AddCard extends Component {
    render() {
        return(
            <Button type="dashed" className={styles.addCard}>
                    <Icon type="plus" /> 新增{this.props.content}
            </Button>
        );
    }
}