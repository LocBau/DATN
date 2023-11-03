import { serverUrl } from './link';
import axios from 'axios';

const LoginApi = async (email, password, device) => {

    var data = JSON.stringify({
        email: email,
        device: device,
        password: password
      });
      
      var config = {
        method: 'post',
        url: serverUrl + "/users/login",
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

export default LoginApi;