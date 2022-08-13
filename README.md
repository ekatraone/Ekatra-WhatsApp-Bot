
<h1 align="center">ekatra.one</h1>

🏠[Homepage](https://github.com/vruksheco/ekatraone)


• [**Ekatra**](https://www.ekatra.one/) is the first low data / no data learning platform. 

• Ekatra helps institutions create, deploy, and assess text message-based micro-courses that dramatically improve learning and training. 

• Our learning platform helps such organizations focused on career readiness for underserved high schoolers to teach them important job and life skills

• Learn more about Ekatra here: https://www.ekatra.one/  

---
<h1 align="center">Welcome to Ekatra WhatsApp Bot 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0-blue.svg?cacheSeconds=2592000" />
  <a href="https://github.com/ekatraone/Ekatra-WhatsApp-Bot/blob/main/README.md" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://github.com/ekatraone/Ekatra-WhatsApp-Bot/blob/main/LICENSE" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
  <a href="https://twitter.com/ramshaa_shaikh" target="_blank">
    <img alt="Twitter: @ramshaa_shaikh" src="https://img.shields.io/twitter/follow/ramshaa_shaikh.svg?style=social" />
  </a>
    <a href="https://twitter.com/ekatraone" target="_blank">
    <img alt="Twitter: @ekatraone" src="https://img.shields.io/twitter/follow/ekatraone.svg?style=social" />
  </a>
</p>

> The Ekatra WhatsApp bot is a Node.js-powered interactive chatbot that assists you in deploying courses on WhatsApp.
>
> Every day, the Chatbot give access to new course modules by sending a reminder template message to students.
>
> This Chatbot offers an excellent learning experience on our preferred platform WhatsApp and allows students to learn at their own speed.

---

## Demo 🎥

https://user-images.githubusercontent.com/32320502/183700116-80d7ad9b-afbe-4a35-abd5-0cd6a63dacbf.mp4

### **Try WomenWill Program Bot:**

<p align="center"><a href="https://wa.me/918080341150?text=Tell%20me%20about%20Sheroes%20WomenWill%20Program"><img src="https://user-images.githubusercontent.com/51878265/146324578-08b40adb-d813-46be-a852-8b680d0636c6.png" height="100"></a>
</p>

---

## Tech Stack
1. [**WhatsApp Business API**](https://www.wati.io/blog/discovering-whatsapp-business-api/#:~:text=WhatsApp%20Business%20API%20enables%20businesses,works%20best%20for%20their%20customers.): 
WhatsApp API was launched to help medium to large companies that wanted to use WhatsApp to communicate with multiple customers at scale. WhatsApp Business API enables businesses to automate communications with automated replies, WhatsApp chatbots & interactive messages.
  
2. [**Airtable**](https://support.airtable.com/hc/en-us) :  Airtable is an easy-to-use online platform for creating and sharing relational databases.
It is a spreadsheet-database hybrid which lets you create powerful databases that can be used to power custom applications.
Airtable has two APIs:
    * [REST API](https://support.airtable.com/hc/en-us/sections/360009623014-API)
    * [Metadata API](https://airtable.com/api/meta)
    

3. [**Railway**](https://railway.app/) : Railway is a platform for deployment where you can set up infrastructure, work with it locally, and then deploy to the cloud.
----
## Prerequisites
1. [WATI Account](https://app.wati.io/register)
2. [Airtable Account](https://airtable.com/signup)
3. [Railway Account](https://railway.app/) [or any other cloud platform of your choice]
---
## Initial Steps : Obtain required API Keys and Access Tokens  🔑


A. _WATI Access Token_
1. Login to your WATI account > Go to API Docs.
2. On this page you will find the Access Token, API Endpoint and the available API URLs.
3. Securely store the access token and API Endpoint in .env file


B. *Airtable REST API* 

1. Go to your [account page](https://airtable.com/account)
2. Under API heading in Account Overview page, click **Generate API key button**.
3. Securely save them in your .env file.
---
## Let's discuss about our backend - Airtable.
#### Head over to [Airtable Documentation](./docs/Airtable.md) to understand tables schema, field description.
---
## Understand how to configure WATI.
* Before we configure WATI, Did you know?
 As per WhatsApp Guidelines, the chat session expires after **24 hours** of your customer's last message sent time. 
After the 24 hours expiry, you can only send 'Template Messages'
* So, how do we approach this challenge?🤔 
No need to worry, We've got this covered.😊

* Refer [Schedule Template Message](https://github.com/ekatraone/schedule-template-messages) repository and implement the cron job that sends schedule template message everyday at a specific time and the session is restarted as soon as the user replies to the template message 

* Now, Follow [WATI Documentation](./docs/WATI.md) step-by-step to understand how to setup Webhook for our project both locally and remotely.
---
## Phew! After all the configuration and setup, it is time to see the Chatbot in action! 🤖 

### **Test the bot locally**
Before running, you need to setup the webhook described in [WATI Documentation](./docs/WATI.md) 


1. Git clone or download this repository
  ```sh
  git clone https://github.com/ekatraone/Ekatra-WhatsApp-Bot.git

  cd Ekatra-WhatsApp-Bot
  ```
2. Install all dependencies
```sh
npm install
```

3. Rename .env_example file to .env and set 
 <ol type="i">
      <li> <i>API</i> - WATI access token</li>
      <li> <i> apiKey</i>  - Airtable api key</li>
      <li> <i>base</i> - Airtable base API key</li>
      <li> <i>URL</i> - WATI server URL</li>
  </ol>

4. Run 

```sh
npm start
```
---
### **Deploy the bot on Railway**

1. Create a github repository for the bot.
2. Sign up or login to your [railway.app](https://railway.app/) account
3. Create a new project and select *Deploy from GitHub repo* > *Configure Github app* and link your bot github repository.
4. Click on **Deploy Now**
5. Once the project starts deploying, go to *variables* and add the environment variables.

---

## Note: 
* Following the bot's testing and thorough review of the program functions. For better understanding of the code , refer to this [flowchart](./docs/Output/WhatsApp%20bot%20Flow.jpg).
---

## Author

👤 **Ramsha Shaikh**

* Twitter: [@ramshaa_shaikh](https://twitter.com/ramshaa_shaikh)
* Github: [@ramshashaikh](https://github.com/ramshashaikh)
* LinkedIn: [@ramsha-shaikh](https://www.linkedin.com/in/ramsha-shaikh/)

🏢 **Ekatra Learning, Inc.**
* Website: https://www.ekatra.one/
* Twitter: [@ekatraone](https://twitter.com/ekatraone)
* Github: [@ekatraone](https://github.com/ekatraone)


## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />
If you have any suggestion on how to improve the code create a [PR request](https://github.com/ekatraone/Ekatra-WhatsApp-Bot/pulls) or faced any issues feel free to [contact me](https://github.com/ekatraone/Ekatra-WhatsApp-Bot/issues). 


## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

This project is [MIT](https://github.com/ekatraone/Ekatra-WhatsApp-Bot/blob/main/LICENSE) licensed.

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
