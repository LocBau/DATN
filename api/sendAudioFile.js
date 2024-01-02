// import { serverUrl } from './link';
import axios from 'axios';

const serverUrl = "https://4185-210-245-36-201.ngrok-free.app";

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
        return res;
      } catch (e) {
          console.log(e)
          return e
      }

}

export default SendAudioFile;