import authentication from '../b2c';

const scopes = process.env.NODE_ENV === 'production' 
  ? ['https://udscustomersdirectory.onmicrosoft.com/webapi/user_impersonation']
  : ['https://udscustomersdirectory.onmicrosoft.com/api/user_impersonation'];

const clientId = process.env.NODE_ENV === 'production'
 ? '150fbaaa-2633-4d3a-8422-79a4421cf864'
 : 'a9b6734d-d7e4-42c1-b3ec-817e2f72d87d';

authentication.initialize({
  // optional, will default to this
  instance: 'https://udscustomersdirectory.b2clogin.com/tfp/',
  // your B2C tenant
  tenant: 'udscustomersdirectory.onmicrosoft.com',
  // the policy to use to sign in, can also be a sign up or sign in policy
  signInPolicy: 'B2C_1_signupsignin',
  // the the B2C application you want to authenticate with (that's just a random GUID - get yours from the portal)
  clientId,
  // where MSAL will store state - localStorage or sessionStorage
  cacheLocation: 'localStorage',
  // the scopes you want included in the access token
  scopes,
  // optional, the redirect URI - if not specified MSAL will pick up the location from window.href
  redirectUri: `${window.location.origin}`,
  postLogoutRedirectUri: `${window.location.origin}`
});
