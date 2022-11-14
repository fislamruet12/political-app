import { Alert } from "react-native";

export const navigationScreen = (navigation:any ,Addmore:()=>void,message:string) => {
    Alert.alert(
        message,
        'Select option for next step',
        [
            {
                text: 'ADD MORE',
                onPress: () => {
                    Addmore()
                },
                style: "cancel"
            },
            {
                text: 'GO BACK',
                onPress: () => {
                   navigation.goBack()
                },
                style: "cancel"
            },
           
        ],
        {
            cancelable: true
        }
    );
};

export const complainNavigationScreen = (navigation:any ,edit:()=>void,message:string) => {
    Alert.alert(
        message,
        'Select option for next step',
        [
            {
                text: 'EDIT',
                onPress: () => {
                    edit()
                },
                style: "cancel"
            },
            {
                text: 'GO BACK',
                onPress: () => {
                   navigation.goBack()
                },
                style: "cancel"
            },
           
        ],
        {
            cancelable: true
        }
    );
};

export const ShareBeforeAlert = (share:()=>void) => {
    Alert.alert(
        '',
        'SHARE REPORT',
        [
            {
                text: 'SHARE',
                onPress: () => {
                    share()
                },
                style: "cancel"
            },
            {
                text: 'CANCEL',
                onPress: () => {
                  
                },
                style: "cancel"
            },
           
        ],
        {
            cancelable: true
        }
    );
};
