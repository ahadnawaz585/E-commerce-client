import axios from "axios";

export class BaseService {
  [x: string]: any;
  loading: boolean;
  
  constructor() {
    this.loading = false;
    this.client = axios.create();
    axios.interceptors.request.use((config) => {
      this.loading = true;
      return config;
    });

    axios.interceptors.response.use(
      (response) => {
        this.loading = false;
        return response;
      },
      (error) => {
        if (error.response.status === 401) {
       
        }
        this.loading = false;
        return Promise.reject(error);
      }
    );
  }
}
