// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {
  var stringified = '';
  if (typeof obj === 'function' || obj === undefined){
    return '';
  } else if (typeof obj === 'number' || typeof obj === 'boolean'){
    return obj.toString();
  } else if (obj === null){
    return 'null';
  } else if (typeof obj === 'string'){
    return `"${obj}"`
  } else if (Array.isArray(obj)){
    for(var i = 0; i < obj.length; i++){
      stringified += stringifyJSON(obj[i]) + ',';
    }
    return `[${stringified.slice(0, stringified.length - 1)}]`
  } else if (typeof obj === 'object'){
    for(var i in obj){
      if (typeof obj[i] === 'function' || obj[i] === undefined){
        return '{}';
      }
      stringified += stringifyJSON(i) + ':';
      stringified += stringifyJSON(obj[i]) + ',';
    }
    return `{${stringified.slice(0, stringified.length - 1)}}`
  }
  return stringified;
};
