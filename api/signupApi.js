import { serverUrl } from './link';
import axios from 'axios';

const SignUpApi = async ( email, password) => {

    var data = JSON.stringify({
        email: email,
        password: password
      });
      
      var config = {
        method: 'post',
        url: serverUrl + "/users/create",
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
      };
      
      try {
        const res = await axios(config)
        console.log(res)
        return res;
      } catch (e) {
          console.log(e)
          return e
      }

}

export default SignUpApi;