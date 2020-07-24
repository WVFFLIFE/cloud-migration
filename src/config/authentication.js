import authentication from '../b2c';

authentication.initialize({
  // optional, will default to this
  instance:
    'https://udscustomersdirectory.b2clogin.com/tfp/',
  // your B2C tenant
  tenant: 'udscustomersdirectory.onmicrosoft.com',
  // the policy to use to sign in, can also be a sign up or sign in policy
  signInPolicy: 'B2C_1_signupsignin',
  // the the B2C application you want to authenticate with (that's just a random GUID - get yours from the portal)
  clientId: '150fbaaa-2633-4d3a-8422-79a4421cf864',
  // where MSAL will store state - localStorage or sessionStorage
  cacheLocation: 'localStorage',
  // the scopes you want included in the access token
  scopes: ['https://udscustomersdirectory.onmicrosoft.com/webapi/user_impersonation'],
  // optional, the redirect URI - if not specified MSAL will pick up the location from window.href
  redirectUri: process.env.REACT_APP_REDIRECT_URI,
  postLogoutRedirectUri: process.env.REACT_APP_REDIRECT_URI
})