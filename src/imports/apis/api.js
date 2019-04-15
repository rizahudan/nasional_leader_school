import axios from 'axios';

const API = {
  post: async (operation, data) => {
    const option = {
      baseURL: 'http://localhost:8081',
    };
    let result = false;
    try {
      const response = await axios.post(`/${operation}`, data, option);
      if (typeof response.status !== 'undefined' && String(response.status) === '200') {
        result = response.data;
      }
    } catch (error) {
      console.log('err', error.message);
    }
    return result;
  },
  get: async (operation) => {
    const option = {
      baseURL: 'http://localhost:8081',
    };
    let result = false;
    try {
      const response = await axios.get(`/${operation}`, option);
      if (typeof response.status !== 'undefined' && String(response.status) === '200') {
        result = response.data;
      }
    } catch (error) {
      console.log('err', error.message);
    }
    return result;
  },
  put: async (operation, data) => {
    const option = {
      baseURL: 'http://localhost:8081',
    };
    let result = false;
    try {
      const response = await axios.put(`/${operation}`, data, option);
      if (typeof response.status !== 'undefined' && String(response.status) === '200') {
        result = response.data;
      }
    } catch (error) {
      console.log('err', error.message);
    }
    return result;
  },
  del: async (operation) => {
    const option = {
      baseURL: 'http://localhost:8081',
    };
    let result = false;
    try {
      const response = await axios.delete(`${operation}`, option);
      if (typeof response.status !== 'undefined' && String(response.status) === '200') {
        result = response.data;
      }
    } catch (error) {
      console.log('err', error.message);
    }
    return result;
  },
};

export default API;
