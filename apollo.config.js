const url = 'http://localhost:3081/graphql';
module.exports = {
  client: {
    service: {
      name: 'local',
      url: url,
      skipSSLValidation: true
    }
  }
};
