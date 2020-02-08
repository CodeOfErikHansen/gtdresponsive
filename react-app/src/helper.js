export function sortActions (actionList) {
    let sortedActionList = [];
    let leftArray =[];
    let rightArray = [];
    let count = 0;
    for(let i =0; i < actionList.length; i++){
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
    return sortedActionList;
};
