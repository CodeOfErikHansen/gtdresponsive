export function sortActions (actionList, cap) {
    let sortedActionList = [];
    let count = 0;
    for(let i =0; i < actionList.length; i++){
        if(actionList[i].sortOrder <= 0){
            return;
        }
        if(actionList[i].sortOrder > sortedActionList.length){
            sortedActionList.push(actionList[i]);
        } else if(actionList[i].sortOrder <= sortedActionList.length){
            if(actionList[i].sortOrder < actionList[i-1].sortOrder){
                sortedActionList.unshift(actionList[i])
            } else {
                sortedActionList.push(actionList[i]);
            }
            count ++;
        }
    }

    if(count !==0 ){
        sortedActionList = sortActions(sortedActionList)
    }
    if(cap < sortedActionList.length){
        return sortedActionList.splice(0,cap)
    }
    return sortedActionList;
};
