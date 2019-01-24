import {serverIP} from "../util/GlobalConstants";

export function queryList() {
    return  fetch(`${serverIP}/friend`, {
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

export function queryIdByEmail(email) {
    return  fetch(`${serverIP}/user/search?emailPrefix=${email}`, {
            method: 'POST',
            mode: "cors",
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')}),
            body:{}
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
    return  fetch(`${serverIP}/friend?friendId=${id}`, {
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

export function addOne(id) {
    return  fetch(`${serverIP}/friend?friendId=${id}`, {
            method: 'POST',
            mode: "cors",
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')}),
            body: {},
            }).then((res)=>{
                return res.json()
            }).then((res)=>{
                console.log(res);
                return res;
            }).catch((err)=>{
                console.log('error: ', err)
            });
}