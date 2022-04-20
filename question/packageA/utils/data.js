
const app=getApp();                               //获取app
const question_all=app.globalData.question_all;
function randomNum(minNum, maxNum) {//选题的范围
 // console.log("1234")
  switch (arguments.length) {
    case 1://只传入了最小值
      return parseInt(Math.random() * minNum + 1, 10);
      break;
    case 2://两个值都传入
      return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);//解析为10进制数
      break;
    default:
      return 0;
      break;
  }
}
let question = new Array(); 


// 单选
function generateQuestions() {
  question.splice(0,question.length);
  for (let i=0;i<15; i++){
    let index = buildItem(question_all);
    if (index != -1) {
      pushQuestion(index, question_all);
    } else {//生成的随机数不成功则继续生成
      while (true) {
        index = buildItem(question_all);
        if (index != -1) {
          pushQuestion(index, question_all);
          break;
        }   
      }
    }  
  }
}

generateQuestions()

module.exports = {
  data: question,
  resetQuestion: generateQuestions,
  data_all: question_all,
}

function pushQuestion(idx, quesObj) {
  if (idx < quesObj.length) {
    question.push(quesObj[idx]);
  }
}

function buildItem(quesObj) {
  var j = randomNum(0, quesObj.length - 1);//随机生成一个数字
  if (contains(question, quesObj[j])) {
    return -1;
  } else {
    return j;
  }
}

function contains(arr, obj) {
  var i = arr.length;
  while (i--) {
   // console.log(arr[i] + '*****' + obj);
    if (arr[i] === obj) {
      return true;
    }
  }
  return false;
}



