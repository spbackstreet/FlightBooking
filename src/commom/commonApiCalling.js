import config from "../config";

export function apiCall (name) {
    // console.log(`config`,config.lstGrpMS)
    for(let i=0 ;i< config.lstGrpMS.length;i++){
    if(name==config.lstGrpMS[i].MICROSERVICENAME){
return config.lstGrpMS[i]
    }
    else{
// console.log(`ok`)
    }
}
}