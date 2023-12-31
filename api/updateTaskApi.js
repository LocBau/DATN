import { serverUrl } from './link';
import axios from 'axios';

const UpdateTaskApi = async (token, tasks) => {

    var data = JSON.stringify({tasks:tasks});
      
      var config = {
        method: 'post',
        url: serverUrl + "/task/update",
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

export default UpdateTaskApi;