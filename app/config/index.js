const serverURL = process.env.NODE_ENV === 'production' ?
    'https://services.smartmiao.com' : 'http://localhost:7001'

export {
  serverURL
}
