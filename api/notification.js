import axios from 'axios';



const NotificationApi = async (expo_token, title, sub, body) => {


    var data = JSON.stringify({
      to: expo_token,
      title: title,
      subtitle: sub,
      body: body
  });
      [

    ]
      var config = {  
        method: 'post',
        url: "https://api.expo.dev/v2/push/send",
        headers: {
          "accept": "application/json",
          "accept-language": "en-US,en;q=0.9,vi-VN;q=0.8,vi;q=0.7,fr-FR;q=0.6,fr;q=0.5",
          "content-type": "application/json",
          "sec-ch-ua": "\"Chromium\";v=\"118\", \"Google Chrome\";v=\"118\", \"Not=A?Brand\";v=\"99\"",
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": "\"Windows\"",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-site",
          "Referer": "https://expo.dev/",
          "Referrer-Policy": "origin"
        },
        data:data
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

export default NotificationApi;
