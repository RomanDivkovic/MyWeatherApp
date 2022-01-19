import axios from 'axios'

// Works
// export default axios.create({
//   baseURL:
//     'http://api.weatherapi.com/v1/current.json?key=8d6c35aa31e04895957120548220601&q='
// })

export default axios.create({
  baseURL: `https://api.openweathermap.org/data/2.5/`
  // baseURL: 'https://api.openweathermap.org/data/2.5/forecast?q='

  //Works
  // baseURL:
  //   'https://api.openweathermap.org/data/2.5/weather?q=partille&units=metric&appid=5bebe6d96b3514437fe2e800ed5c86ca'
})
