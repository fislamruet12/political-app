import { Dimensions } from 'react-native'
import { icons } from '../assets/icons'

export const width = Dimensions.get('screen').width
export const height = Dimensions.get('screen').height
export const SPACING_FOR_CARD = width * .8
export const TEXT_COLOR = "white"

export const outOpacity = { width: 130, height: 130, borderRadius: 5 }
export const opacity = { ...outOpacity, opacity: .09, borderWidth: 3, borderColor: 'red' }

export const ImgStyle = (gender: string) => {
    if (gender === 'Male')
        return outOpacity
    else
        return opacity;

}

export const outOpacityH = { width: 120, height: 120, borderRadius: 5 }
export const opacityH = { ...outOpacityH, opacity: .09, borderWidth: 3, borderColor: 'red' }

export const ImgStyleH = (gender: string) => {
    if (gender === 'Male')
        return outOpacityH
    else
        return opacityH;

}

export const userImage=(gender:string,image:string)=>{
    if(gender==="Male"){
     return {uri:image}
    }else if(gender==="Female"){
         return icons.women
    }else{
         return icons.dual
    }
}
export const scTM=60000
export const problemTypeData=['Replace','Repair','Network Problem','Printer Problem','']
export const roomInfoType=['SB Main Building','Rason Store Building','CTSB','School of Intelligence']
export const sectionName=['Admin','ICT']
export const RankData=['ASP','AdSP','SP']
export const DeviceNameData=['Desktop Computer','Laptop Computer','KeyBoard','Mouce']
export const IssueName=['Printer','Font Problem','Network Problem']