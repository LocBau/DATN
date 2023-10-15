import { serverUrl } from './link';
import axios from 'axios';
import CryptoJS from "rn-crypto-js";


const ResetPasswordApi = async (email, password) => {
  console.log(email);
const secret = CryptoJS.AES.encrypt(email, 'TRVNG').toString();

    var data = JSON.stringify({
        email: email,
        newPassword:password,
        secret:secret
      });
      
      var config = {  
        method: 'post',
        url: serverUrl + "/users/newpassword",
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
      };
      
      try {
        const res = await axios(config)
        console.log(res.data)
        return res;
      } catch (e) {
          console.log(e)
          return e
      }

}

export default ResetPasswordApi;