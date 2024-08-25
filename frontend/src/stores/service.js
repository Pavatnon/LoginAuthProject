import { defineStore } from 'pinia'
import axios from 'axios'

const BASE_URL = 'http://localhost:8888'

export const useServiceStore = defineStore('service',{
  state:()=>({
    islogin:false
  }),
  actions:{
    async loginService(loginData){
      const bodyData = {
        username: loginData.username,
        password: loginData.password
      }
      try {
        const resonse = await axios.post(`${BASE_URL}/login`, bodyData)
        await alert(resonse.data.message)

        localStorage.setItem('token', resonse.data.token)
        this.islogin = true
      } catch (error) {
        if (error.response && error.response.data) {
          alert(error.response.data.error);
        } else {
            alert(error.message);
        }
        this.islogin = false;
      }
    },
    async registerService(registerData){  
      const bodyData = {
        username: registerData.username,
        password: registerData.password
      }
      try {
        const resonse = await axios.post(`${BASE_URL}/register`, bodyData)
        await alert(resonse.data.message)
      } catch (error) {
        if (error.response && error.response.data) {
          alert(error.response.data.error);
        } else {
            alert(error.message);
        }
      }
    }
  }

})
 
