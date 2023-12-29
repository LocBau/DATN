
import axios from 'axios';

const GetImgUrlApi = async (url) => {


      
      var config = {
        method: 'get',
        url: url,

      };
      
      try {
        const res = await axios(config)
        // console.log(res)
        return res.request.responseURL;
      } catch (e) {
          console.log(e)
          return
      }

}

export default GetImgUrlApi;