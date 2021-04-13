const Parse = require('parse/node');

Parse.Cloud.define('hello', async req => {
  return 'hello';
});