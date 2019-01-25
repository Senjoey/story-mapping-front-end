import {serverIP} from "../util/GlobalConstants";

export function queryList() {
    return  fetch(`${serverIP}/map`, {
            method: 'GET',
            mode: "cors",
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')}),
            }).then((res)=>{
                return res.json()
            }).then((res)=>{
                console.log(res);
                return res;
            }).catch((err)=>{
                console.log('error: ', err)
            });
}

export function deleteOne(id) {
    return  fetch(`${serverIP}/map?mapId=${id}`, {
            method: 'DELETE',
            mode: "cors",
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')}),
            }).then((res)=>{
                return res.json()
            }).then((res)=>{
                console.log(res);
                return res;
            }).catch((err)=>{
                console.log('error: ', err)
            });
}

export function addOne({title, memberList}) {
    return  fetch(`${serverIP}/map`, {
            method: 'POST',
            mode: "cors",
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')}),
            body: JSON.stringify({
                title: title,
                memberList: memberList
            })
            }).then((res)=>{
                return res.json()
            }).then((res)=>{
                console.log(res);
                return res;
            }).catch((err)=>{
                console.log('error: ', err)
            });
}