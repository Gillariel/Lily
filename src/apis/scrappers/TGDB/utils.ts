const mapping = {
  "game_s_id": "id",
  "plateform_s_id": "filter[platform]",
  "searchName" : "name",
  "filter": "filter[type]"
};

export const keyParamToGetParam = (key: string) => {
  var result = mapping[key]
  if(result && result != null){
    return result;
  }
  return key;
}

export const formatParam = (params: Object): Array<Array<string>> => {
  var formattedParams: Array<Array<string>> = new Array();
  //var paramLength = Object.keys(params).length;
  Object.keys(params).forEach((key, indexParam) => {
    var value = params[key];
    var formattedValue = value;
    if(typeof value === 'object') {
      if(value.constructor === Array){
        formattedValue = value.map((v, index) => index < value.length - 1 ? v : + v + ",");
      }
    }
    formattedParams.push([keyParamToGetParam(key), formattedValue]);
    // if(indexParam < paramLength - 1)
    //   formattedValue += "&"
  })
  return formattedParams;
}