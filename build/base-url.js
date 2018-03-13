const setupBaseUrl = () => {
  switch (process.env.NODE_ENV) {
    case 'production':
      return "'https://example.com'";
    case 'development':
    default:
      return "'http://localhost:8080'";
  }
};

module.exports = setupBaseUrl();
