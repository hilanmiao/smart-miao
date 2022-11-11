const serverURL = process.env.NODE_ENV === 'production' ?
    // 'https://services.smartmiao.com' : 'http://localhost:7001'
    'https://services.smartmiao.com' : 'http://192.168.0.67:7001'

export {
  serverURL
}
