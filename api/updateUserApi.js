import { serverUrl } from './link';
import axios from 'axios';

const UpdateUserApi = async (token, name, phone_number) => {

    var data = JSON.stringify({
      name: name,
      phone_number: phone_number
      });
      
      var config = {
        method: 'post',
        url: serverUrl + "/users/update",
        headers: { 
          Authorization: "Bearer " + token,
          'Content-Type': 'application/json'
        },
        data : data
      };
      console.log(config);
      try {
        const res = await axios(config)
        console.log(res.data)
        return res;
      } catch (e) {
          console.log(e)
          return e
      }

}

export default UpdateUserApi;