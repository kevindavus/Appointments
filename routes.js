
const UrlPrettifier = require('next-url-prettifier').default

const routes = [
  {
    page: 'index',
    prettyUrl: '/home'
  },
  {
    page: 'appointment',
    prettyUrl: ({type = '', start = '', end = ''}) =>
      (type === 'swedish' ? `/swedish/$start}/${end}` : type === 'shiatsu' ? `/shiatsu/${start}/${end}` : `/${type}/${start}/${end}`),
    prettyUrlPatterns: [
      {pattern: '/swedish/:start/:end', defaultParams: {type: 'swedish'}},
      {pattern: '/shiatsu/:start/:end', defaultParams: {type: 'shiatsu'}},
      {pattern: '/:type/:start/:end', defaultParams: {type: 'other'}}
    ]
  }
]

const urlPrettifier = new UrlPrettifier(routes)
exports.default = routes
exports.Router = urlPrettifier
