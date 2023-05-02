import axios from 'axios';

const Http = axios.create({
  baseURL: '/api', // Certifique-se de que a baseURL corresponde ao namespace do MirageJS
});

export default Http;
