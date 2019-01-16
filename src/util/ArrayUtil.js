import {CardType} from "./CardType";

function myRemove (toDeleteList, id) {
    let len = toDeleteList.length;
    let index = -1;
    for (let i = 0; i < len; i++) {
        let item = toDeleteList[i];
        if (item.id === id) {
            index = i;
        }
    }
    toDeleteList.splice(index, 1);
    return toDeleteList;
}

function myTaskRemove(toDeleteTaskList, taskId) {
    let len = toDeleteTaskList.length;
    let index = -1;
    for (let i = 0; i < len; i++) {
        let item = toDeleteTaskList[i];
        if (item.task.id === taskId) {
            index = i;
        }
    }
    toDeleteTaskList.splice(index, 1);
    return toDeleteTaskList;
}

function myRemoveCard(toDeleteList, id, type) {
    let len = toDeleteList.length;
    let index = -1;
    for (let i = 0; i < len; i++) {
        let item = toDeleteList[i];
        let typeName = type.getName();
        let itemId = (type === CardType.STORY) ? (item.id) : (item[`${typeName}`].id);
        if (itemId === id) {
            index = i;
        }
    }
    toDeleteList.splice(index, 1);
    return toDeleteList;
}

export {myRemoveCard};