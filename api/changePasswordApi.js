import { serverUrl } from './link';
import axios from 'axios';


const ChangePasswordApi = async (token,current, password) => {



    var data = JSON.stringify({
 
        newPassword:password,
        currentPassword:current
      });
      
      var config = {  
        method: 'post',
        url: serverUrl + "/users/changepassword",
        headers: { 
          Authorization: "Bearer " + token,
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

export default ChangePasswordApi;