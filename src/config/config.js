export const httpConfig = {
  host: 'localhost',
  port: 8200,
  baseUrl: ''
}

export const client = {
  clientId: 'admin',
  clientSecret: 'adminpass',
  grantType: 'password',
  scope: 'all',
  redirectUri: `http://${httpConfig.host}:8080`
}

export const constVar = {
  tokenInfoKey: 'tokenInfo'
}

export const uploads = {
  userInfoUrl: `http://${httpConfig.host}:${httpConfig.port}/api/user/v1/upmsUser/batchImport`
}
