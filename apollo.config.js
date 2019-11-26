const url = 'http://sipholpt:3081/';
module.exports = {
  client: {
    service: {
      name: 'local',
      url: url,
      skipSSLValidation: true
    }
  }
};
