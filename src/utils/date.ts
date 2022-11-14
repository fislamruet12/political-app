export const dateDiff = (issueDate: number) => {
    var today = new Date().getTime();
    var IssueTime = new Date(issueDate).getTime();
    var diffMs = Math.abs(IssueTime - today); // milliseconds between now & IssueTime
    var diffDays = Math.floor(diffMs / 86400000); // days
    var diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
    var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
    let dt = (diffDays + " days, " + diffHrs + " hours, " + diffMins + " mins ago");
    return dt
}

let finalEnglishToBanglaNumber = {
    0: "০",
    1: "১",
    2: "২",
    3: "৩",
    4: "৪",
    5: "৫",
    6: "৬",
    7: "৭",
    8: "৮",
    9: "৯",
 };
 
export const getDigitBanglaFromEnglish =  (str:string)=> {
    var retStr = str
    for (var x in finalEnglishToBanglaNumber) {
       retStr = retStr.replace(
          new RegExp(x, "g"),
          finalEnglishToBanglaNumber[x]
       );
    }
    return retStr;
 };

 export const SpliteDate=(dateString:string)=>{
    let Dtarr=dateString.split("-")
  //  console.log(Dtarr)
    let fRmD=''
    for(let i=Dtarr.length-1;i>=0;i--){
     // console.log(Dtarr[i])
      fRmD+=getDigitBanglaFromEnglish(Dtarr[i])
      if(i!=0){
        fRmD+='/'
      }
    }
   return fRmD

 }

 export const  state = {
    tableHead: [
      "নং",
      "শাখার নাম",
      "রুম নাম্বার",
      "কাজের বিবরণ",
      "সমাধান কারী",
      "মন্তব্য",
    ],
    tableData: [
      ["১", "এস এস রাজনৈতিক-১", "৮০১", "ওয়াইফাই সংযোগ", "কং/আশিক ", ""],
      ["১", "এস এস রাজনৈতিক-১", "৮০১", "ওয়াইফাই সংযোগ", "কং/আশিক ", ""],
      ["১", "এস এস রাজনৈতিক-১", "৮০১", "ওয়াইফাই সংযোগ", "কং/আশিক ", ""],
      ],
  };
