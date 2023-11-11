import AsyncStorage from '@react-native-async-storage/async-storage';
import { serverUrl } from './link';
import axios from 'axios';

const GetUserProfileApi = async () => {

    let token = await AsyncStorage.getItem('token');
      
      var config = {
        method: 'get',
        url: serverUrl + "/users/get",
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

export default GetUserProfileApi;