export function basicAuth(userId)
{
    var base64 = require('base-64');
    var encoded = base64.encode(userId+":"+getValues(userId)).toString();
    
return encoded;

}


function getValues(userId){
var sb='';
    for(var i = 0; i < userId.length; ++i) {
        switch(userId.charAt(i)) {
        case '0':
            sb=sb+'1';
            break;
        case '1':
        sb=sb+'2';
            break;
        case '2':
        sb=sb+'3';
            break;
        case '3':
        sb=sb+'4';
            break;
        case '4':
        sb=sb+'5';
            break;
        case '5':
        sb=sb+'6';
            break;
        case '6':
        sb=sb+'7';
            break;
        case '7':
        sb=sb+'8';
            break;
        case '8':
        sb=sb+'9';
            break;
        case '9':
        sb=sb+'9';
            break;
        default:
            sb=sb+userId.charCodeAt(i);
        }
        
    }
    return sb.toString();

}
