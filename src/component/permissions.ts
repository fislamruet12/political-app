import { Platform } from 'react-native';
import {check,PERMISSIONS, request, RESULTS} from 'react-native-permissions';

const PLATFORM_MIC_PER={
    ios:PERMISSIONS.IOS.MICROPHONE,
    android:PERMISSIONS.ANDROID.RECORD_AUDIO
}
const REQUEST_PERMISSION_TYPE={
 microphone:PLATFORM_MIC_PER
}

const PERMISSION_TYPE={
    microphone:'microphone'
}

class AppPermission{

    checkPermission=async (type:any):Promise<boolean> => {
        const permissions=REQUEST_PERMISSION_TYPE[type][Platform.OS]
        if(!permissions)
        return true

        try {
            const result=await check(permissions)
            if(result===RESULTS.GRANTED)
            return true
            return this.requestPermission(permissions)
        } catch (error) {
            return false
        }

    }
    requestPermission=async (permissions:any):Promise<boolean> => {
        try {
            const result =await request(permissions)
            return result===RESULTS.GRANTED
        } catch (error) {
            return false
        }
    }
}
const Permission=new AppPermission
export {Permission,PERMISSION_TYPE}