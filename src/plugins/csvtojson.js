const csv = require('csvtojson')

export default ({ app, router, Vue }) => {
  Vue.use(csv)
}
