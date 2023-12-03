import axios, { AxiosInstance } from "axios";

class Http {
   instance;
   constructor() {
      this.instance = axios.create({
         baseURL: 'https://nursing-app-api.vercel.app/api/v1',
         withCredentials: true,
         timeout: 10000
      })
   }
}
const http = new Http().instance
export default http;