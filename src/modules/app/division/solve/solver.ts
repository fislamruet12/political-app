import { HelperType } from "../../../../../typings/form-data";
import { RankData } from "../../../../utils/dataObj";

export const generateSolverItem=(helperInfo:any)=>{
    let solverItems = [];
    let items = {
        name: "সমাধানকারী",
        id: 0,
        children: [],
      };
      let tempInfo = [];
      for (let i in helperInfo) {
        let single = {
          name:
            helperInfo[i].helper +
            "   (" +
            RankData[helperInfo[i].userRank] +
            ")",
          id: helperInfo[i].bp,
        };
        tempInfo.push(single);
      }
      items.children = tempInfo;
      solverItems.push(items);
      return solverItems

}

export const getHelperQuery=(bp:string,helperinfo:HelperType[])=>{

    const singlehelper=helperinfo.find(item=>item.bp===bp)
    return singlehelper
}