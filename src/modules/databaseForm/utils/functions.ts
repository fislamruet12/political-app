import { districts } from "./district"

export const districtInfo = (divisionId: string) => {

    let districtlist = districts.filter(item => item.division_id === divisionId)

    return districtlist
}

export const singledistrictInfo = (divisionId: string) => {

    let districtlist = districts.filter(item => item.division_id === divisionId)
    console.log(districtlist[0])
    return parseInt(districtlist[0].id)
}


export const partyObjToArr=(info)=>{
  let arr=[]
  for(let i in info){
    arr.push(info[i])
  }
  arr.sort((a,b)=> {
    return a.podobi-b.podobi
  })
  return arr
}