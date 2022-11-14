import { Base64 } from 'js-base64';

export const encryptPassword = (password: string) => {
    var encode = Base64.encode(password);
    return encode
}

export const decryptPassword = (password: string) => {
    var decode = Base64.decode(password);
    return decode
}