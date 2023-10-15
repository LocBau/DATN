import { serverUrl } from './link';
import axios from 'axios';

const CreateTaskApi = async (token, title, description, start_time, end_time, frequency=undefined) => {

    var data = JSON.stringify({
      title: title,
      description: description,
      frequency: frequency,
      start_time: start_time,
      end_time: end_time
      });
      
      var config = {
        method: 'post',
        url: serverUrl + "/task/create",
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

export default CreateTaskApi;