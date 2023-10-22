import { serverUrl } from './link';
import axios from 'axios';

const UpdateSetingApi = async (token, settings, device) => {

    var data = JSON.stringify({
      settings: settings,
      device: device
      });
      
      var config = {
        method: 'post',
        url: serverUrl + "/users/settings",
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

export default UpdateSetingApi;