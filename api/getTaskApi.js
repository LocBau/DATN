import { serverUrl } from './link';
import axios from 'axios';

const GetTaskApi = async (token) => {


      
      var config = {
        method: 'get',
        url: serverUrl + "/tasks/get",
        headers: { 
          Authorization: "Bearer " + token
        },

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

export default GetTaskApi;