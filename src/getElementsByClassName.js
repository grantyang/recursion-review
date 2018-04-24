// If life was easy, we could just do things the easy way:
// var getElemelassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className) {
  //console.log(document.body)
  
  var arr = [];
  
  function getData(data){
    // console.log(data);
    // console.log(data.childNodes);
    // console.log(data.classList);
    if (data.classList && data.classList.contains(className)){
      arr.push(data);
      if (data.childNodes){
        for(var i of data.childNodes){
          getData(i);
        }
      }
    } else {
      if (data.childNodes){
        for(var i of data.childNodes){
          getData(i);
        }
      }
    }
  }
  // console.log(document.getElementsByClassName(className));
  // console.log('arr is:')
  // console.log(arr);
  getData(document.body);
  return arr;
};
