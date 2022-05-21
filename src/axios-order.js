import axios from 'axios';

const urlBurger = 'https://burger-bogo-default-rtdb.firebaseio.com/';

const instance = axios.create({
  baseURL: urlBurger
});

export default instance;