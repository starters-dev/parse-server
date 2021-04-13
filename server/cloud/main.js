const Parse = require('parse/node');

Parse.Cloud.define('hello', async req => {
  return 'hello';
});

Parse.Cloud.define('hello2', async req => {
  return 'hello2';
});

Parse.Cloud.define('hello3', async req => {
  return 'hello3';
});