import * as CryptoJS from "crypto-js";

const SECRET_KEY = "passwordUltrasecreto";
export const encrypt = (value: string) => {
  return CryptoJS.AES.encrypt(value, SECRET_KEY).toString();
};

export const decrypt = (value: string) => {
  const bytes = CryptoJS.AES.decrypt(value, SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
};
