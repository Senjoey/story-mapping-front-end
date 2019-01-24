import {serverIP} from "../util/GlobalConstants";

export function queryList() {
    return  fetch(`${serverIP}/notification`, {
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

export function replyInvitation({invitationId, isAgree}) {
    return  fetch(`${serverIP}/friend/response?invitationId=${invitationId}&agree=${isAgree}`, {
            method: 'POST',
            mode: "cors",
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')}),
            body: {}
            }).then((res)=>{
                return res.json()
            }).then((res)=>{
                console.log(res);
                return res;
            }).catch((err)=>{
                console.log('error: ', err)
            });
}