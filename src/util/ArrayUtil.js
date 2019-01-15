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

export {myRemove};