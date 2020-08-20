import axios from "axios";
class Service {
  constructor() {
    console.log("Service is constructed");
  }

  getRestClient() {
    if (!this.serviceInstance) {
      this.serviceInstance = axios.create({
        baseURL: "http://127.0.0.1:5000/search",
        timeout: 50000,
        headers: {
          "Content-Type": "text/plain",
        }
      });
    }
    return this.serviceInstance;
  }
}

export default new Service();
