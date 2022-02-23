import axios from 'axios'

// Works
// export default axios.create({
//   baseURL:
//     'http://api.weatherapi.com/v1/current.json?key=8d6c35aa31e04895957120548220601&q='
// })
export default axios.create({
  baseURL: `https://api.openweathermap.org/data/2.5/`
})
