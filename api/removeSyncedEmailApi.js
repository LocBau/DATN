import AsyncStorage from '@react-native-async-storage/async-storage';
import { serverUrl } from './link';
import axios from 'axios';

const RemoveSyncedEmailApi = async (remove_email) => {

  let token = await AsyncStorage.getItem('token');
  let data = {
    email: remove_email
  }
      
      var config = {
        method: 'post',
        url: serverUrl + "/sync/remove",
        headers: { 
          Authorization: "Bearer " + token,
          'Content-Type': 'application/json'
        },
        data : data
      };
      console.log(config);
      try {
        const res = await axios(config);
        console.log(res.data)
        return res;
      } catch (e) {
          console.log(e)
          return e
      }

}

export default RemoveSyncedEmailApi;