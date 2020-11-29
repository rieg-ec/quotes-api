const config = {
  default: {
    username: process.env.DB_USERNAME || 'mongo',
    password: process.env.DB_PASSWORD || 'mongo',
    uri: process.env.MONGO_URI || 'localhost:27017'
  },
  development: {
    extend: 'default',
    database: process.env.DB_NAME || 'dev'
  },
  production: {}
}

Object.keys(config).forEach((configKey) => {
  const configValue = config[configKey];
  if (configValue.extend) {
    config[configKey] = { ...config[configValue.extend], ...configValue };
  }
});

module.exports = config;
