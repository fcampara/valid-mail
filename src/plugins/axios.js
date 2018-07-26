import axios from 'axios'

export default ({ Vue }) => {
  const url = process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : 'http://valid-mail.herokuapp.com'
  axios.defaults.baseURL = url
  Vue.prototype.$axios = axios
}
