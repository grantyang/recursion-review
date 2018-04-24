// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function(json) {
  var index = 0;
  var current = json[index];
  var next = function(){
    // console.log(`current is ${current}`)
    index ++;
    current = json[index]
  }
  var white = function(){
    while (current === ' '){
      next();
    }
  }
  var value = function(){
    if (current === '{'){
      return objects();
    } else if (current === '['){
      return arrays();
    } else if (current === '"'){
      return strings();
    } else if (current === 't' || current === 'f' || current === 'n'){
      return word();
    } else if (current && current >= 0 && current <= 9 || current === '-'){
      return numbers();
    }
    
  }
  
  // vocab section
  
  // ------------------------objects function------------------------------
  var objects = function(){
    var obj = {};
    if(json[index + 1] === '}'){
      next();
      return obj;
    }
    while(current !== '}'){
      next();
      // console.log('current is ' + current)
      white();
      var key = value();
      console.log('key is ' + key)
      // console.log('current is now ' + current)
      next();
      white();
      if(current === ':'){
        next();
      }
      white();
      obj[key] = value();
      console.log('value is ' + obj[key]);
      white();
      next();
    }
    return obj;
  }
  
  
  
  
  // --------------------------array function------------------------
  var arrays = function(){
    var arr = [];
    console.log('arr is ' + current);
    if(!current){
      throw undefined;
    }
    if(json[index + 1] === ']'){
      next();
      return arr;
    }
    while(current !== ']'){
      // console.log(arr)
      white();
      arr.push(value());
      next();
      white();
      if(current === ','){
        next();
      }
    }
    next();
    // console.log(arr)
    return arr;
  }
  
  
  
  
  // -----------------------------string function----------------------------
  var escapes = {
    '"' : '"',
    'n': '\n',
    '\\': '\\',
    'r': '\r',
    's': '\s',
    
  }
  var strings = function(){
    var str = '';
    next();
    while (current !== '"'){
      console.log(current);
      // if (current === '\\'){
      //   next();
      //   if (escapes.hasOwnProperty(current)){
      //     str += escapes[current];
      //   }
      // }
      str += current;
      next();
    }
    next();
    console.log('after next, current is ' + current)
    console.log(str)
    return str;
  }
  
  //----------------------------------word-------------------------------
  var word = function(){
    if (current === 't'){
      next();
      next();
      next();
      next();
      return true;
    }
    if (current === 'f'){
      next();
      next();
      next();
      next();
      next();
      return false;
    }
    if (current === 'n'){      
      next();
      next();
      next();
      next();
      return null;
    }
  }
  // numbers
  var numbers = function(){
    num = '';
    
    function calculate(){
      console.log(current)
      // console.log(next())
      if(current === '.'){
        num += '.';
        next()
        calculate();
      } else if (current === '-'){
        num += '-';
        next();
        calculate();
      } else if (current && current >= 0 && current <= 9){
          num += current;
          if(json[index + 1] !== ']' && json[index + 1] !== '}'){
            next();
            calculate();
          }
      } 
      // return;
    }
    calculate();
    console.log('num is ' + num)
    console.log('current is ' +current)
    return Number(num);
  };
  
  return value();
};

