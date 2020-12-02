function getToday(equalsDay){
    var date = new Date();
    var yyyy = date.getFullYear();
    var mm = date.getMonth() +1;
    var dd = date.getDate();
    
    if(mm < 10)
        mm = "0" + mm;
    if(dd < 10)
        dd = "0" + dd;
    
    var today = [yyyy, mm, dd]

    var dateString = equalsDay;
    var dateArray = dateString.split("-");  
    var dateObj = new Date(dateArray[0], Number(dateArray[1])-1, dateArray[2]);
    var dateTodayObj = new Date(today[0], Number(today[1])-1, today[2]);     
    var betweenDay = ((dateObj.getTime() - dateTodayObj.getTime())/1000/60/60/24);  

    return betweenDay;
}

export{
    getToday
}