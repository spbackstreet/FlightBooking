export function uniqueList(dropDownList) {
        let _ = require('underscore')
        var ctempdclist = [];
        if (dropDownList.length> 0) {
            dropDownList.forEach(function (itm) {
                var unique = true;
                ctempdclist.forEach(function (itm2) {
                    if (_.isEqual(itm, itm2)) unique = false;
                });
                if (unique) ctempdclist.push(itm);
            });
        }
    return ctempdclist;
    };
