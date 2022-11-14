import { Platform } from "react-native";
import Share from "react-native-share";
export const Shared = (imageUri:string,setshare:any,setimageUri:any) => {
    let title = "Daily Task";
    var options = Platform.select({
      default: {
        title,
        subject: "Share",
        failOnCancel: false,
        url: imageUri,
      },
    });
    Share.open(options)
      .then((res) => {
        console.log(res);
        setshare(false)
        setimageUri("")
      })
      .catch((err) => {
        err && console.log('er', err);
        setshare(false)
        setimageUri("")
      });
  };