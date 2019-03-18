import {serverIP} from "../util/GlobalConstants";

export function queryUserInfo() {
    return  fetch(`${serverIP}/user/info`, {
            method: 'GET',
            mode: "cors",
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')}),
            }).then((res)=>{
                return res.json()
            }).then((res)=>{
                return res;
            }).catch((err)=>{
                console.log('error: ', err)
            });
}

export function updateInfo({name}) {
    return  fetch(`${serverIP}/user/info`, {
            method: 'PUT',
            mode: "cors",
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')}),
            body: JSON.stringify({
                name: name
            }),
            }).then((res)=>{
                return res.json()
            }).then((res)=>{
                console.log('更新个人信息: ', res);
                return res;
            }).catch((err)=>{
                console.log('error: ', err)
            });
}

