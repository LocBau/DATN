import { serverUrl } from './link';
import axios from 'axios';

const ForgetPasswordApi = async (email) => {

    var data = JSON.stringify({
        email: email,
      
      });
      
      var config = {
        method: 'post',
        url: serverUrl + "/users/resetpassword",
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

export default ForgetPasswordApi;