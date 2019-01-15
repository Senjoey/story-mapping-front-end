import React, { Component } from 'react';
import {serverIP} from '../../util/GlobalConstants';
import styles from './StoryMappingDetail.less';
import Activity from "./Activity";

export default class StoryMappingDetailInfo extends Component{
    constructor() {
        super();
        this.state = {
            mapTitle: '用户故事标题',
            activityList: [

            ],
        }
    }

    componentWillMount () {
        this._getMapOverviewInfo(localStorage.getItem('mapID'));
        this._getMapDetailInfo(localStorage.getItem('mapID'))
    }

    _getMapOverviewInfo(mapID) {
        fetch(`${serverIP}/map/${mapID}`, {
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
            this.setState({mapTitle: res.content.title})
        }).catch((err)=>{
            console.log('error: ', err)
        });
    }

    _getMapDetailInfo(mapID) {
        fetch(`${serverIP}/map/detail?mapId=${mapID}`, {
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
            this.setState({activityList: res.content})
        }).catch((err)=>{
            console.log('error: ', err)
        });
    }

    render() {
        return(
            <div className={styles.wrapper}>
                <h1>{this.state.mapTitle}</h1>
                <div style={{display: "flex"}}>
                    {
                        this.state.activityList.map(activity => {
                            return(
                                <Activity data={activity}/>
                            );
                        })
                    }
                </div>
            </div>
        );
    }
}