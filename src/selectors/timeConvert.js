export const timeConvert = (minute)=>{
  var num = minute;
  var hours = (num / 60);
  var rhours = Math.floor(hours);
  var minutes = (hours - rhours) * 60;
  var rminutes = Math.round(minutes);
  if(rhours === 0){
    return "" + rminutes + " мин.";
  }else{
    return "" + rhours + " ч. " + rminutes + " мин.";
  }
}
