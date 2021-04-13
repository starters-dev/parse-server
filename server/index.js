var express = require('express');
var ParseServer = require('parse-server').ParseServer;
var ParseDashboard = require('parse-dashboard');
var path = require('path');

const {
  APP_DATABASE_URI,
  APP_NAME,
  APP_ID,
  APP_MASTER_KEY,
  APP_SERVER_URL,
  APP_CLOUD_CODE,

  IS_DEV,

  DASHBOARD_ADMIN_USERNAME,
  DASHBOARD_ADMIN_PASSWORD,
} = process.env;

const ParseServerEndpoint = '/parse';
const ParseDashboardEndpoint = '/dashboard';

const APP_PARSE_SERVER_URL = APP_SERVER_URL + ParseServerEndpoint;

var parse = new ParseServer({
  databaseURI: APP_DATABASE_URI || 'mongodb://db:27017/dev',
  cloud: APP_CLOUD_CODE || __dirname + '/cloud/main.js',
  appId: APP_ID || 'myAppId',
  masterKey: APP_MASTER_KEY || 'myMasterKey',
  appName: APP_NAME || 'MyApp',
  serverURL: 'http://localhost:6969/parse',  // Don't forget to change to https if needed, https doesn't work on ssl remote server. I don't remember where I have read it
  publicServerURL: APP_PARSE_SERVER_URL || 'http://localhost:6969/parse',
});

// TODO: change this and understand why i did it
var options = { allowInsecureHTTP: IS_DEV };
var dashboard = new ParseDashboard({
  dev: IS_DEV,
	apps: [
    {
      appId: APP_ID,
      masterKey: APP_MASTER_KEY,
      appName: APP_NAME,
      serverURL: APP_PARSE_SERVER_URL,
    }
  ],
  users: [
    {
      user: DASHBOARD_ADMIN_USERNAME,
      pass: DASHBOARD_ADMIN_PASSWORD,
    }
  ],
}, options);

var app = express();

// Serve static assets from the /public folder
app.use('/public', express.static(path.join(__dirname, '/public')));

// Serve the Parse API on the /parse URL prefix
app.use(ParseServerEndpoint, parse);
app.use(ParseDashboardEndpoint, dashboard);

app.listen(6969);