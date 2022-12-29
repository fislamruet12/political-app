import { MemberType } from "../../../../typings/form-data"
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


export const partyObjToArr = (info: any) => {
  let arr = []
  for (let i in info) {
    arr.push(info[i])
  }
  arr.sort((a, b) => {
    return a.podobi - b.podobi
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

export const querysingleDistrict = (districtId: string) => {
  const Org = districts.find((item) => item.id === districtId);
  return Org?.bn_name;
};


export const ParMemRefresh = (mainArr: MemberType[], tempArr: MemberType) => {
  if (tempArr === null)
    return mainArr
  let Arr = []
  for (let i in mainArr) {
    if (mainArr[i].parlament_seat === tempArr.parlament_seat) {
      mainArr[i] = tempArr
      break
    }
  }
 
  return mainArr
}