export function errorMsg(getErrorMessages) {
    

    var data = getErrorMessages;
    var result = [];


    for (var i in data)
        result.push([i, data[i]]);


    var list1 = '';
    for (var j in result) {
        console.log(result);
        list1 = result[j];
        if (list1[1] !== null) {
            break;
        }
    }
    

    return list1;
}