import { districts } from "./district"
import { divisions } from "./division"
import { partyRelatedOrg } from "./partyName"

export const districtInfo = (divisionId: string) => {

    let districtlist = districts.filter(item => item.division_id === divisionId)

    return districtlist
}

export const singledistrictInfo = (divisionId: string) => {

    let districtlist = districts.filter(item => item.division_id === divisionId)
    console.log(districtlist[0])
    return parseInt(districtlist[0].id)
}


export const partyObjToArr=(info:any)=>{
  let arr=[]
  for(let i in info){
    arr.push(info[i])
  }
  arr.sort((a,b)=> {
    return a.podobi-b.podobi
  })
  return arr
}

export const queryParOrg = (partyId: number) => {
  const Org = partyRelatedOrg.filter((item) => item.party_id === partyId);
  return Org;
};
export const queryParOrgSn = (partyId: number) => {
  const Org = partyRelatedOrg.find((item) => item.id === parseInt(partyId));
  return Org?.bn_name;
};
export const queryDivlist = (zoneId: string) => {
  const div = divisions.filter((item) => item.main_id === zoneId);
  return div;
};
