

export  function deteUtil(increamentYr,increamentMonth,increamentDate,fomrat)
{
    var date=new Date();
    var yr=date.getFullYear()+increamentYr
    var month=date.getMonth()+increamentMonth;
    var dateInc=date.getDate()+increamentDate;
   return  yr+fomrat+month+fomrat+dateInc;
}




export  function timeUtil(increamentHr,increamentMin,increamentSec,format)
{
    var date=new Date();
    var yr=date.getHours()+increamentHr
    var month=date.getMinutes()+increamentMin;
    var dateInc=date.getSeconds()+increamentSec;
   return  yr+format+month+format+dateInc;
}