export const timeDifference =(date1,date2,moment=false)=>{
    date1 = parseInt(date1,10)/1000;
    var a = new Date(date1*1000);
    var b = false;
    if(moment){
      b = new Date(date2*1000);
    }else{
      date2 = parseInt(date2,10)/1000
      b = new Date(date2*1000);
    }
    var difference = Math.abs(a - b)/1000;
    return Math.round(Math.floor((difference/60)));
}
