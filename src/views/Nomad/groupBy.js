var _ = require('lodash');
export const groupBy = (dataToGroupOn, fieldNameToGroupOn, fieldNameForGroupName, fieldNameForChildren)=> {
    var result = _.chain(dataToGroupOn)
        .groupBy(fieldNameToGroupOn)
        .toPairs()
        .map(function (currentItem) {
            return _.zipObject([fieldNameForGroupName, fieldNameForChildren], currentItem);
        })
        .value();
    result.map(function(item,index){
      item.key = index;
      return true;
    })
    return result;
}
