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