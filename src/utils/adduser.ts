import { Alert } from "react-native";
import { User } from "../../typings/structures";
import { SetUserInfo } from "../database/Database";
import { decryptPassword, encryptPassword } from "./encrypt";

export const AddUser = () => {
  let itemUser: User = {
    id: new Date().getTime(),
    name: "AdminUser",
    email: "adminuser@gmail.com",
    verify: "adminuser@gmail.com"+encryptPassword("123456"),
    password: encryptPassword("123456"),
    role: {
      is_active: 1,
      is_super: 0,
      is_admin:1,
      is_staff: 0,
    },
  };
 // Alert.alert(JSON.stringify(itemUser),decryptPassword(itemUser.password))
  SetUserInfo(itemUser)
    .then((res) => {
      Alert.alert("", "succesfully sumbittd");
    })
    .catch();
};
