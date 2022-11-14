import { deviceItemsInfo } from "./dataObj"


export const DataObjDeviceInfo=(selectedItems:[])=>{
  let selectedItem=selectedItems.sort()
    if(selectedItem.length===0)
    return ""
   let info=""
    for(let i in selectedItem){
        console.log(selectedItem[i])
        for(let j in deviceItemsInfo){
            let children=deviceItemsInfo[j].children
             for(let k in children){
                if(children[k].id===selectedItem[i]){
                    info+=children[k].name+" "
                }
             }
        }
    }
    return info
}


