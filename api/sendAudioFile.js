import { serverUrl } from './link';
import axios from 'axios';



const SendAudioFile = async (audio) => {




      
      var config = {  
        method: 'post',
        url: serverUrl + "/audio",
        headers: { 
          'Content-Type': 'application/json'
        },
        data : {audio:audio}
      };
      // console.log(config);
      try {
        const res = await axios(config)
        console.log(res.data)
        return res.data;
      } catch (e) {
          console.log(e)
          return e
      }

}

export default SendAudioFile;