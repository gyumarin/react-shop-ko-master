
const offset = new Date().getTimezoneOffset() * 60000;
const today = new Date(Date.now() - offset);
var date = today;
var nextDate = today;

var firstDateArr = new Array(date.toISOString());
date.setDate(nextDate.getDate()+6)
var secondDateArr = new Array(date.toISOString());


for(var i=1; i<5; i++){
    date.setDate(date.getDate()+7)
    firstDateArr.push(date.toISOString())
}

for(var i=1; i<4; i++){
    nextDate.setDate(nextDate.getDate()+7)
    secondDateArr.push(nextDate.toISOString())
}
nextDate.setDate(nextDate.getDate()+1500)
secondDateArr.push(nextDate.toISOString())



//console.log('date.toISOString(), date.setDate(date.getDate() + 1) =>', date.toISOString(), nextDate.toISOString())

const positions = [
    {
        "_id" :1,
        "name": "웹페이지 퍼블리싱"
    },
    {
        "_id" :2,
        "name": "웹 프론트 개발"
    },
    {
        "_id" :3,
        "name": "웹 백엔드 개발"
    },
    {
        "_id" :4,
        "name": "웹 풀스택 개발"
    },
    {
        "_id" :5,
        "name": "데이터 베이스 관리"
    },
    {
        "_id" :6,
        "name": "빅데이터 개발"
    },
    {
        "_id" :7,
        "name": "데이터 분석 및 시각화"
    }

]
const deadline =[
    {
        "_id" : 0,
        "name" : "Any",
        "array" : []
    },
    {
        "_id" : 1,
        "name" : "D-Day to 1 Week",        
        "array" : [firstDateArr[0], secondDateArr[0]]
    },
    {
        "_id" : 2,
        "name" : "7-Day to 2 Week",
        "array" : [firstDateArr[1], secondDateArr[1]]
    },
    {
        "_id" : 3,
        "name" : "14-Day to 3 Week",
        "array" : [firstDateArr[2], secondDateArr[2]]
    },
    {
        "_id" : 4,
        "name" : "21-Day to 4 Week",
        "array" : [firstDateArr[3], secondDateArr[3]]
    },
    {
        "_id" : 5,
        "name" : "more than 4Week",
        "array" : [firstDateArr[4], secondDateArr[4]]
    },

]


export{
    positions,
    deadline
}