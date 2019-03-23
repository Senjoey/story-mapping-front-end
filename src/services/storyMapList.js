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

export function queryOne({mapID}) {
    return  fetch(`${serverIP}/map/${mapID}`, {
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


export function updateTitle({mapID, title}) {
    return  fetch(`${serverIP}/map`, {
            method: 'PUT',
            mode: "cors",
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')}),
            body: JSON.stringify({
                mapId: mapID,
                title: title
            }),
            }).then((res)=>{
                return res.json()
            }).then((res)=>{
                console.log('更新地图标题: ', res);
                return res;
            }).catch((err)=>{
                console.log('error: ', err)
            });
}

export function queryCollaboratorList({mapID}) {
    return  fetch(`${serverIP}/mapMember/${mapID}`, {
            method: 'GET',
            mode: "cors",
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')}),
            }).then((res)=>{
                return res.json()
            }).then((res)=>{
                console.log('获取协作者: ', res);
                return res;
            }).catch((err)=>{
                console.log('error: ', err)
            });
}

export function deleteCollaborator({mapID, deleteUserID}) {
    return  fetch(`${serverIP}/mapMember`, {
            method: 'DELETE',
            mode: "cors",
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')}),
            body: JSON.stringify({
                mapId: mapID,
                deleteUserId: deleteUserID
            }),
            }).then((res)=>{
                return res.json()
            }).then((res)=>{
                console.log('删除协作者：', res);
                return res;
            }).catch((err)=>{
                console.log('error: ', err)
            });
}

export function addCollaborators({mapID, memberIDList}) {
    return  fetch(`${serverIP}/mapMember`, {
            method: 'POST',
            mode: "cors",
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')}),
            body: JSON.stringify({
                mapId: mapID,
                memberIdList: memberIDList
            })
            }).then((res)=>{
                return res.json()
            }).then((res)=>{
                console.log('增加新的协作者: ', res);
                return res;
            }).catch((err)=>{
                console.log('error: ', err)
            });
}

