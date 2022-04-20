//封装的js的基础操作函数

//数组深拷贝
function copy (obj) {
  var newobj = obj.constructor === Array ? [] : {};
  if(typeof obj !== 'object'){
    return;
  }
  for(var i in obj){
    newobj[i] = typeof obj[i] === 'object' ? copy(obj[i]) : obj[i];
  }
  return newobj
}

//判断值是否在数组中
function contains(a, obj) {
  var i = a.length;
  while (i--) {
    if (a[i] === obj) {
      return i;
    }
  }
  return -1;
}


module.exports = {
  copy,
  contains
}