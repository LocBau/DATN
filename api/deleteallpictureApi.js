import { serverUrl } from './link';
import axios from 'axios';

const DeleteAllPictureApi = async (token) => {
    
      
      var config = {
        method: 'delete',
        url: serverUrl + "/users/picture/delete/all",
        headers: { 
          Authorization: "Bearer " + token
        },


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

export default DeleteAllPictureApi;